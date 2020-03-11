

FROM python:3.7

WORKDIR /src

COPY . /src

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install arm-pyart

COPY /src/ModelAnalysis.py .

CMD python ModelAnalysis.py