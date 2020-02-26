FROM continuumio/miniconda3

WORKDIR /src

COPY pyart_env.yml .

RUN conda env create -f pyart_env.yml

SHELL ["conda", "run", "-n", "pyart_env", "/bin/bash", "-c"]

COPY /src/DataRetrival.py .

ENTRYPOINT ["conda", "run", "-n", "pyart_env", "python", "DataRetrival.py"]