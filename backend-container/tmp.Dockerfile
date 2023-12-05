FROM python:3.9.18
WORKDIR /ssweb

# System dependencies
RUN apt-get update && \
    apt-get install -y gnupg wget iputils-ping curl openssl gcc build-essential \
    libxml2-dev libxslt-dev libssl-dev zlib1g-dev python3-dev libnss3-tools && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY . .
RUN pip install --upgrade pip && pip install wheel && pip install -r requirements.txt


# Environment variables
ARG FLASK_ENV=development
ENV FLASK_ENV=development

# Exposing port 5000 for Flask app
EXPOSE 5000

# Running the application
CMD ["python", "src/run.py"]
