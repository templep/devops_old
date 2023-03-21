load("@npm//:npm.bzl", "npm_install")

# Install Node.js dependencies using npm
npm_install(
    name = "install",
    package_json = "/backend/package.json",
    yarn_lock = "/backend/yarn.lock",
)

# Run the backend server
nodejs_binary(
    name = "server",
    entry_point = "/backend/src/main.ts",
    data = [
        "/backend/src/**/*.json",
        "/backend/src/**/*.yml",
    ],
    deps = [
        ":install",
    ],
)
