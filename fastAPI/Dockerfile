FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10
WORKDIR /src

COPY ./requirements.txt /src/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /src/requirements.txt

RUN pip setuptools wheel 
RUN pip install --no-use-pep517 lightfm

COPY ./src /src

CMD ["uvicorn", "app.app:app", "--host", "0.0.0.0", "--port", "8000"]
