# Collecting Docker Logs using Fluentd

This guide will walk you through the steps to collect Docker logs of your microservices app using Fluentd.

## Prerequisites

Before you get started, make sure you have the following installed on your system:

- Docker
- Docker Compose

## Setup

### Step 1: Create a Fluentd configuration file

Create a fluent.conf file with the following content:

```
<source>
  @type tail
  format json
  read_from_head true
  tag docker.logs
  path /fluentd/log/containers/*/*-json.log
  pos_file /tmp/container-logs.pos
</source>

<match docker.logs>
  @type file
  path /output/test.log
</match>
```
### Step 2: Create a Docker Compose file

```
version: "3"

services:
  fluentd:
    container_name: fluentd
    user: root
    image: fluent/fluentd:v1.11-debian
    volumes:
      - /var/lib/docker/containers:/fluentd/log/containers
      - ./fluent.conf:/fluentd/etc/fluent.conf
      - ./logs:/output/
    logging:
      driver: "local"
```

This Docker Compose file sets up a Fluentd service using the fluent/fluentd:v1.11-debian image, with the fluent.conf file mounted as a volume. It also mounts the container log files and a logs directory as volumes, and sets the logging driver to local.

## Usage

```
docker-compose up
```

This will start the Fluentd service and begin collecting Docker logs from the running containers. The logs will be stored in the logs directory in the current directory, in a file called test.log.

To stop collecting Docker logs, press Ctrl-C to stop the Docker Compose process.


## Conclusion

That's it! You now have a working setup for collecting Docker logs of your microservices app using Fluentd. You can customize the configuration file and Docker Compose file to suit your needs, and use the logs for monitoring, analysis, and debugging purposes.
