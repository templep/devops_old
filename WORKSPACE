load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Angular workspace
http_archive(
    name = "rules_nodejs",
    sha256 = "764a3b3757bb8c3c6a02ba3344731a3d71e558220adcb0cf7e43c9bba2c37ba8",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.2/rules_nodejs-core-5.8.2.tar.gz"],
)

load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")

# Add the nodejs toolchains
node_repositories()

# NestJS and Quarkus workspaces

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
)


load("@io_bazel_rules_docker//docker:docker.bzl", "docker_repositories")

docker_repositories()

load("@io_bazel_rules_docker//repositories:repositories.bzl", "docker")

docker(
    name = "docker",
    registry = "docker.io",
    repository = "your-repo",
    tag = "latest",
)

load("@io_bazel_rules_docker//repositories:repositories.bzl", "docker_pull")

docker_pull(
    name = "alpine",
    registry = "docker.io",
    repository = "alpine",
    tag = "latest",
)

load("@io_bazel_rules_docker//repositories:repositories.bzl", "docker_build")

docker_build(
    name = "backend",
    context = "//backend",
    dockerfile = "//backend:Dockerfile",
    base = "@alpine//image",
    args = {
        "NODE_VERSION": "16",
    },
    deps = [
        "//backend:node_modules",
    ],
)

docker_build(
    name = "quarkus",
    context = "//quarkus",
    dockerfile = "//quarkus:Dockerfile",
    base = "@alpine//image",
    deps = [
        "//quarkus:target",
    ],
)

