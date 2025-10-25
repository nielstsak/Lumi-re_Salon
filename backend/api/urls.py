from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet,
    AppointmentViewSet,
    OpeningHourViewSet,
    BlockPeriodViewSet,
    TimeSlotViewSet,
    DashboardKPIViewSet,
    BreakViewSet,
    CurrentUserView
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'opening-hours', OpeningHourViewSet)
router.register(r'block-periods', BlockPeriodViewSet)
router.register(r'timeslots', TimeSlotViewSet, basename='timeslot')
router.register(r'dashboard-kpis', DashboardKPIViewSet, basename='dashboard-kpis')
router.register(r'break', BreakViewSet, basename='break')

urlpatterns = [
    path('', include(router.urls)),
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
]