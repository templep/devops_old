package fr.istic.vv;

import org.testcontainers.containers.GenericContainer;

public class RedisContainer {
    public static GenericContainer redis = new GenericContainer("redis:6.0.8").withExposedPorts(6379);
    static {
        redis.start();
    }
}