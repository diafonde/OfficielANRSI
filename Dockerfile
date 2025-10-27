# Root Dockerfile for Backend Deployment
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy the entire backend directory
COPY ["backend Anrsi", "backend Anrsi/"]

# Grant execute permission
RUN chmod +x "backend Anrsi/gradlew"

# Build the application
WORKDIR /app/"backend Anrsi"
RUN ./gradlew build -x test

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR
COPY --from=builder ["/app/backend Anrsi/build/libs", "/app/"]

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

