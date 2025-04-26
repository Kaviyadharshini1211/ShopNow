# Use the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root to install packages
USER root

# Install Docker CLI and Docker Engine dependencies
RUN apt-get update && \
    apt-get install -y \
      ca-certificates \
      curl \
      gnupg \
      lsb-release \
      git && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg \
      | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/debian \
      $(lsb_release -cs) stable" \
      > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce-cli docker-ce && \
    rm -rf /var/lib/apt/lists/*

# Install Docker Compose v2 (the plugin-style)
RUN mkdir -p /usr/libexec/docker/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-linux-$(uname -m) \
      -o /usr/libexec/docker/cli-plugins/docker-compose && \
    chmod +x /usr/libexec/docker/cli-plugins/docker-compose

# Give the 'jenkins' user permissions to run Docker
RUN usermod -aG docker jenkins

# Switch back to the Jenkins user
USER jenkins

# Expose Jenkins port
EXPOSE 8080

# (Optional) Preinstall commonly used plugins on first startup
# COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
# RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Default entrypoint is the one provided by the base image
