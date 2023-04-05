# Third-party dependencies fetched by Bazel
# Unlike WORKSPACE, the content of this file is unordered.
# We keep them separate to make the WORKSPACE file more maintainable.

# Install the nodejs "bootstrap" package
# This provides the basic tools for running and packaging nodejs programs in Bazel
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
def fetch_dependencies():
    http_archive(
        name = "build_bazel_rules_nodejs",
        sha256 = "f02557f31d4110595ca6e93660018bcd7fdfdbe7d0086089308f1b3af3a7a7ee",
        urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.1/rules_nodejs-5.8.1.tar.gz"],
    )
