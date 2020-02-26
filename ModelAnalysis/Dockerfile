FROM python:latest

COPY ./src

WORKDIR /src

RUN \
    sudo apt-get -y install pip \
    pip install conda \
    conda env create -f pyart_env.yml \
    conda activate pyart_env \
    cd src

CMD python ModelAnalysis.py