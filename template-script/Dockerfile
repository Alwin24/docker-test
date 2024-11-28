# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Install dependencies
RUN bun install

# Command to run the application
CMD ["bun", "run", "modified-index.ts"]
