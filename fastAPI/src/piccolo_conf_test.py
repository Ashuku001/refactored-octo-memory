from piccolo_conf import *  # noqa


DB = PostgresEngine(
    config={
        "database": "crm",
        "user": "postgres",
        "password": "admin",
        "host": "localhost",
        "port": 5432,
    }
)
