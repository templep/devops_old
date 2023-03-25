load("@npm//@nestjs/bazel:nestjs.bzl", "nestjs_deps")

nestjs_deps()

# Define the Node.js binary that will run the application
nodejs_binary(
    name = "backend",
    entry_point = "//src/main.ts",
    data = [
        "//package.json",
    ],
    args = ["--config=production"],
    env = {
        "NODE_ENV": "production",
    },
)

# Define the TypeScript configuration for the application
ts_config(
    name = "tsconfig",
    src = "src",
    compiler_options = {
        "target": "es2017",
        "module": "commonjs",
        "declaration": True,
        "outDir": "dist",
        "sourceMap": True,
        "esModuleInterop": True,
        "moduleResolution": "node",
        "strict": True,
        "experimentalDecorators": True,
        "emitDecoratorMetadata": True,
        "skipLibCheck": True,
    },
    deps = [
        "@npm//@types/node",
        "@npm//@nestjs/common",
        "@npm//@nestjs/core",
        "@npm//reflect-metadata",
    ],
)

# Define the Bazel targets for building the application
ts_library(
    name = "src",
    srcs = (["src/**/*.ts"]),
    deps = [
        "@npm//@nestjs/common",
        "@npm//@nestjs/core",
    ],
    tsconfig = ":tsconfig",
)

# Define a Bazel target to copy static assets (e.g. public folder) to the build directory
filegroup(
    name = "public",
    srcs = (["public/**"]),
)

# Define a Bazel target for building the application
# This depends on the `node_modules` directory and the TypeScript compilation target
# The `public` filegroup is also included to copy the static assets to the build directory
nodejs_binary(
    name = "nest_backend",
    entry_point = "//src/main.ts",
    data = [
        "//package.json",
        "//yarn.lock",
        ":public",
    ],
    args = ["--config=production"],
    env = {
        "NODE_ENV": "production",
    },
    deps = [
        "//:src",
        "@npm//typescript",
    ],
)
