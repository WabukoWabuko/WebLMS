from celery import Celery
app = Celery('lms_backend', broker='redis://localhost:6379/0')
