FROM eclipse-temurin:21-jre-alpine

# Non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the actual JAR name that Maven just created
COPY target/facGest-0.0.1-SNAPSHOT.jar app.jar

# Your app listens on port 9999
EXPOSE 9999

# Run it
ENTRYPOINT ["java", "-jar", "/app.jar"]
