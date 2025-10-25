from rest_framework import serializers
from .models import Service, Appointment, OpeningHour, BlockPeriod, Break
from datetime import timedelta

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'duration', 'price']

class AppointmentSerializer(serializers.ModelSerializer):
    service_title = serializers.CharField(source='service.title', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'service', 'start', 'end', 'title', 'phone', 'service_title']
        read_only_fields = ('end',)

    def create(self, validated_data):
        service = validated_data.get('service')
        start_time = validated_data.get('start')
        duration = service.duration
        end_time = start_time + timedelta(minutes=duration)
        validated_data['end'] = end_time
        return super().create(validated_data)

class OpeningHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpeningHour
        fields = ['id', 'day_of_week', 'start_time', 'end_time']

class BlockPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockPeriod
        fields = ['id', 'start_date', 'end_date', 'reason']

class BreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Break
        fields = ['id', 'start_time', 'end_time']