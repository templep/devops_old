package org.acme;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;

@Path("/hello")
public class GreetingResource {

    @Inject Mailer mailer;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello from RESTEasy Reactive";
    }

    @GET
    @Path("/mail")
    @Produces(MediaType.TEXT_PLAIN)
    public String mail() {
            Mail mail= Mail.withText("kone.wolouho@gmail.com", "Mail Sent via quarkus", "Content");
            mailer.send(mail);
            return "mail sent";
}

}