package org.acme;
import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.vertx.core.json.JsonObject;

@ApplicationScoped
public class Consome{
    private Mailer mailer;
    public Consome(Mailer mailer){
        this.mailer=mailer;
    }
    //methode principale de traitement du microservice
    @Incoming("mail_queue")
    public void consume(byte[] msg) throws InterruptedException {    
    
    //Extraction de donnée dans le flux recu par le canal
       String string_data = new String(msg, StandardCharsets.UTF_8);
       JsonObject jsonobject_data = new JsonObject(new String(string_data));
       JsonObject data = jsonobject_data.getJsonObject("data");

    //---------------------------------------------------------------------------------------
    Runnable ran = ()->{
        try {
        //
        String topic = data.getString("topic");
        String message = data.getString("message");
        String destinator = data.getString("destinator");
        String[]dest=destinator.split(",");
        for(int i=0;i<dest.length;i++){
            Mail mail= Mail.withText(dest[i], topic,message);
            mailer.send(mail);
         }
        } catch (Exception e) {
            System.out.println("echec d'envoie de mail au l'adresse email");
        }
    };
    Thread td = new Thread(ran);
    td.start();
     System.out.print("ok");
    }
    //------------------------------------------------------------------------------------------
}
