from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny, BasePermission, SAFE_METHODS
from rest_framework.authentication import TokenAuthentication
from .models import Service, Appointment, OpeningHour, BlockPeriod, Break
from .serializers import ServiceSerializer, AppointmentSerializer, OpeningHourSerializer, BlockPeriodSerializer, BreakSerializer
from datetime import datetime, timedelta, time
from django.utils import timezone
from django.db.models import Sum, Q
import pytz

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class AppointmentPermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return request.user and request.user.is_staff

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('id')
    serializer_class = ServiceSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('start')
    serializer_class = AppointmentSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [AppointmentPermission]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        service = serializer.validated_data.get('service')
        start_time = serializer.validated_data.get('start')
        end_time = start_time + timedelta(minutes=service.duration)

        overlapping_appointments = Appointment.objects.filter(
            start__lt=end_time,
            end__gt=start_time
        )

        if overlapping_appointments.exists():
            return Response(
                {"error": "Ce créneau n'est plus disponible. Veuillez en choisir un autre."},
                status=status.HTTP_409_CONFLICT
            )

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class OpeningHourViewSet(viewsets.ModelViewSet):
    queryset = OpeningHour.objects.all()
    serializer_class = OpeningHourSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    @action(detail=False, methods=['post'])
    def bulk_update(self, request):
        if not request.user.is_staff:
            return Response(status=status.HTTP_403_FORBIDDEN)
            
        hours_data = request.data
        for data in hours_data:
            day_of_week = data.get('day_of_week')
            OpeningHour.objects.update_or_create(
                day_of_week=day_of_week,
                defaults={
                    'start_time': data.get('start_time'),
                    'end_time': data.get('end_time')
                }
            )
        return Response(status=status.HTTP_200_OK)

class BlockPeriodViewSet(viewsets.ModelViewSet):
    queryset = BlockPeriod.objects.all().order_by('-start_date')
    serializer_class = BlockPeriodSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

class BreakViewSet(viewsets.ModelViewSet):
    queryset = Break.objects.all()
    serializer_class = BreakSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def list(self, request, *args, **kwargs):
        instance, _ = Break.objects.get_or_create(id=1)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        instance, _ = Break.objects.get_or_create(id=1)
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DashboardKPIViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        today = timezone.now().date()
        start_of_today = timezone.make_aware(datetime.combine(today, time.min))
        
        appointments_today = Appointment.objects.filter(start__gte=start_of_today, start__lt=start_of_today + timedelta(days=1))
        
        daily_count = appointments_today.count()
        daily_revenue = appointments_today.aggregate(total=Sum('service__price'))['total'] or 0

        start_of_week = start_of_today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=7)
        weekly_count = Appointment.objects.filter(
            start__gte=start_of_week,
            start__lt=end_of_week
        ).count()

        return Response({
            "daily_appointments": daily_count,
            "daily_revenue": daily_revenue,
            "weekly_appointments": weekly_count
        })

class TimeSlotViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def available_slots(self, request):
        date_str = request.query_params.get('date')
        service_id = request.query_params.get('serviceId')

        if not date_str or not service_id:
            return Response({"error": "Date and serviceId are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            service = Service.objects.get(pk=service_id)
        except (ValueError, Service.DoesNotExist):
            return Response({"error": "Invalid date or serviceId."}, status=status.HTTP_400_BAD_REQUEST)

        paris_tz = pytz.timezone('Europe/Paris')
        today = timezone.now().astimezone(paris_tz).date()

        if target_date <= today:
            return Response({"slots": []})

        if BlockPeriod.objects.filter(start_date__lte=target_date, end_date__gte=target_date).exists():
            return Response({"slots": []})
        
        day_of_week = target_date.isoweekday()
        try:
            opening_hours = OpeningHour.objects.get(day_of_week=day_of_week)
            if not opening_hours.start_time or not opening_hours.end_time:
                return Response({"slots": []})
        except OpeningHour.DoesNotExist:
            return Response({"slots": []})

        day_start_paris = paris_tz.localize(datetime.combine(target_date, opening_hours.start_time))
        day_end_paris = paris_tz.localize(datetime.combine(target_date, opening_hours.end_time))

        day_start_utc = day_start_paris.astimezone(pytz.utc)
        day_end_utc = day_end_paris.astimezone(pytz.utc)
        
        appointments = Appointment.objects.filter(
            Q(start__lt=day_end_utc) & Q(end__gt=day_start_utc)
        )

        busy_intervals_utc = [(app.start, app.end) for app in appointments]

        lunch_break = Break.objects.first()
        if lunch_break and lunch_break.start_time and lunch_break.end_time:
            break_start_paris = paris_tz.localize(datetime.combine(target_date, lunch_break.start_time))
            break_end_paris = paris_tz.localize(datetime.combine(target_date, lunch_break.end_time))
            busy_intervals_utc.append((break_start_paris.astimezone(pytz.utc), break_end_paris.astimezone(pytz.utc)))
        
        available_slots = []
        slot_duration = timedelta(minutes=service.duration)
        step_duration = timedelta(minutes=45)
        current_time_paris = day_start_paris

        while current_time_paris + slot_duration <= day_end_paris:
            slot_start_utc = current_time_paris.astimezone(pytz.utc)
            slot_end_utc = (current_time_paris + slot_duration).astimezone(pytz.utc)
            
            is_available = True
            for start_busy, end_busy in busy_intervals_utc:
                if (slot_start_utc < end_busy) and (slot_end_utc > start_busy):
                    is_available = False
                    break
            
            if is_available:
                available_slots.append({"start": slot_start_utc.isoformat()})
            
            current_time_paris += step_duration
        
        return Response({"slots": available_slots})

class CurrentUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})