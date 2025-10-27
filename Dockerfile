# Root Dockerfile for Backend Deployment
FROM openjdk:17-jdk-slim AS builder

WORKDIR /app

# Copy Gradle wrapper and config files
COPY "backend Anrsi/gradlew" "backend Anrsi/" 
COPY "backend Anrsi/gradle/" "backend Anrsi/gradle/"

# Grant execute permission
RUN chmod +x "backend Anrsi/gradlew"

# Copy build configuration
COPY "backend Anrsi/build.gradle" "backend Anrsi/"
COPY "backend Anrsi/settings.gradle" "backend Anrsi/"

# Copy source code
COPY "backend Anrsi/src" "backend Anrsi/src"

# Build the application
WORKDIR /app/backend Anrsi
RUN ./gradlew build -x test

# Runtime stage
FROM openjdk:17-jre-slim

WORKDIR /app

# Copy the built JAR
COPY --from=builder "/app/backend Anrsi/build/libs/*.jar" app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

