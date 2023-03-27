# Declares that this directory is the root of a Bazel workspace.
# See https://docs.bazel.build/versions/main/build-ref.html#workspace
workspace(
    # How this workspace would be referenced with absolute labels from another workspace
    name = "devvops",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "c29944ba9b0b430aadcaf3bf2570fece6fc5ebfb76df145c6cdad40d65c20811",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.7.0/rules_nodejs-5.7.0.tar.gz"],
)

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
)

### NodeJS Setup
load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")

build_bazel_rules_nodejs_dependencies()

# fetches nodejs, npm, and yarn
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories")

node_repositories()

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

### Docker Setup
load("@io_bazel_rules_docker//repositories:repositories.bzl", container_repositories = "repositories")

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

### Loading base docker images for different languages

load("@io_bazel_rules_docker//nodejs:image.bzl", _nodejs_image_repos = "repositories")

_nodejs_image_repos()