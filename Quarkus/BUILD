load("@io_bazel_rules_docker//docker:docker.bzl", "docker_build")

docker_build(
    name = "docker",
    context = ".",
    dockerfile = "Dockerfile",
    base = "@io_bazel_rules_docker//images:alpine",
)
