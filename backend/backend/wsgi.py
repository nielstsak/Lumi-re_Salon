import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Importez WhiteNoise ici
from whitenoise import WhiteNoise
application = get_wsgi_application()
application = WhiteNoise(application, root=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'staticfiles'))