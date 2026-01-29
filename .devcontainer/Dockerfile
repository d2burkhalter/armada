FROM mcr.microsoft.com/devcontainers/go:2-1.25

# Workaround for Yarn APT repo GPG key expiration issue.
# The base image includes Yarn apt sources which have an expired GPG key,
# causing apt-get update to fail during devcontainer feature installation.
# Since this project doesn't need Yarn, we remove the problematic sources.
# See: https://github.com/devcontainers/features/issues/1543
USER root
RUN rm -f /etc/apt/sources.list.d/yarn.list \
  && rm -f /usr/share/keyrings/yarn.gpg \
  && apt-get update

# Install protoc
RUN ARCH=$(uname -m | sed 's/aarch64/aarch_64/' | sed 's/x86_64/x86_64/') && \
  curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v25.1/protoc-25.1-linux-${ARCH}.zip && \
  unzip -o protoc-25.1-linux-*.zip -d /usr/local && \
  chmod +x /usr/local/bin/protoc && \
  rm protoc-25.1-linux-*.zip

# Install sqlc
RUN ARCH=$(uname -m | sed 's/aarch64/arm64/' | sed 's/x86_64/amd64/') && \
  curl -L https://downloads.sqlc.dev/sqlc_1.30.0_linux_${ARCH}.tar.gz -o sqlc.tar.gz && \
  tar -xzf sqlc.tar.gz -C /usr/local/bin && \
  chmod +x /usr/local/bin/sqlc && \
  rm sqlc.tar.gz



