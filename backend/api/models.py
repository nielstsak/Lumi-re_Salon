from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100)
    duration = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.title

class Appointment(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.title} - {self.service.title} at {self.start.strftime('%Y-%m-%d %H:%M')}"

class OpeningHour(models.Model):
    class DayOfWeek(models.IntegerChoices):
        MONDAY = 1, 'Lundi'
        TUESDAY = 2, 'Mardi'
        WEDNESDAY = 3, 'Mercredi'
        THURSDAY = 4, 'Jeudi'
        FRIDAY = 5, 'Vendredi'
        SATURDAY = 6, 'Samedi'
        SUNDAY = 7, 'Dimanche'

    day_of_week = models.IntegerField(choices=DayOfWeek.choices, unique=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.get_day_of_week_display()

class BlockPeriod(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Blocked: {self.start_date.strftime('%Y-%m-%d')} to {self.end_date.strftime('%Y-%m-%d')}"

class Break(models.Model):
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Pause de {self.start_time.strftime('%H:%M')} à {self.end_time.strftime('%H:%M')}"