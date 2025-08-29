FROM ubuntu:latest
LABEL authors="andrewpeterson"

# Stage 1: Build
FROM gradle:jdk24-corretto AS build
WORKDIR /app
COPY . .
RUN gradle clean build -x test

# Stage 2: Run
FROM eclipse-temurin:24-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]