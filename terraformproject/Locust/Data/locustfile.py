from locust import HttpUser, task, between

class HelloWorldUser(HttpUser):

    # Wait time between requests
    wait_time = between(1, 5)

    # Test default backend endpoint : back:3000/
    @task
    def defaultTest(self):
        with self.client.get("/") as response:
            if response.status_code != 200:
                response.failure("Response was incorrect")