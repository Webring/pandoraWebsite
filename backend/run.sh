touch /app/db/db.sqlite3

python3 manage.py migrate
python3 manage.py create_admin
python3 manage.py collectstatic --noinput

gunicorn --certfile=/etc/letsencrypt/live/test.pandoradance.ru/fullchain.pem --keyfile=/etc/letsencrypt/live/test.pandoradance.ru/privkey.pem backend.wsgi:application --bind 0.0.0.0:8000

