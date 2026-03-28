FROM python:3.10-slim

# Prevent python buffering
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system deps (optional but safe)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy project
COPY . .

# Install python deps
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run with gunicorn (production)
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]