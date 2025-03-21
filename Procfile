# web: gunicorn team_4.wsgi:application
# This string is required to force Heroku to use Daphne to run the app.
# gunicorn can't handle async messaging.

web: daphne -b 0.0.0.0 -p $PORT team_4.asgi:application
