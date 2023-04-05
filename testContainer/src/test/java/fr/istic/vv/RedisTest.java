package fr.istic.vv;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import redis.clients.jedis.Jedis;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Testcontainers
public class RedisTest {

    @Container
    private static final GenericContainer redis = new GenericContainer("redis:5.0.7").withExposedPorts(6379);

    @Test
    public void testRedis() {
        redis.start();
        int mappedPort = redis.getMappedPort(6379);
        // Your test code goes here
    }

    /*@AfterAll
    public static void stopRedis() {
        RedisContainer.redis.stop();
    }*/

    static private Jedis jedis;

    @BeforeAll
    public static void setUp() {
        int redisPort = redis.getMappedPort(6379);
        jedis = new Jedis("localhost", redisPort);
    }

    @Test
    public void testSetAndGet() {
        jedis.set("key", "value");
        String value = jedis.get("key");
        assertEquals("value", value);
    }

    @Test
    public void testIncr() {
        jedis.set("counter", "0");
        Long result = jedis.incr("counter");
        assertEquals(1L, result.longValue());
    }

    @AfterAll
    public static void tearDown() {
        jedis.close();
    }
}