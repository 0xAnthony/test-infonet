# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=testPassword
ENV MYSQL_DATABASE=mydb
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=testPassword

# Expose the default MySQL port
EXPOSE 3306
