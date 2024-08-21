from piccolo_conf import *  # noqa


DB = PostgresEngine(
    config={
        "database": os.environ.get("PG_DB"),
        "user": os.environ.get("PG_USERNAME"),
        "password": os.environ.get("PG_PASSWORD"),
        "host": os.environ.get("PG_HOST"),
        "port": os.environ.get("PG_PORT"),
    }
)
