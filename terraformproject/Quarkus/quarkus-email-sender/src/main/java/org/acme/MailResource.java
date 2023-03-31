package org.acme;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.reactive.messaging.Incoming;

@ApplicationScoped
public class MailResource {
    
    // Mailer object
    @Inject
    ReactiveMailer reactiveMailer;

    // Lisener of RabbitMQ queue
    @Incoming("mail")
    public Uni<Void> sendEmailUsingReactiveMailer(JsonObject email) {
        
        // Get data from queue
        String data = email.getString("data");

        // Parse data
        data = data.replaceAll("[\\[\\]\"]","");

        // Split data
        String[] mailArray = data.split(",");
        String mail = mailArray[0];
        String subject = mailArray[1];
        String body = mailArray[2];
        
        // Send email
        return reactiveMailer.send(
                Mail.withText(mail,
                    subject,
                    body
                )
        );
    }

}