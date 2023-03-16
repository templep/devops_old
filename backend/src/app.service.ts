import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
    constructor(@Inject('GREETING_SERVICE') private client: ClientProxy){}
    async publishEvent() {
      this.client.emit('mail', {'topic': 'Invitation', 'message': 'Vous êtes convié à la cérémonie de Bievenue', 'destinator': 'alioubary20@gmail.com,alvinsmook00@gmail.com,guyaboic@gmail.com'});
    }
  

}
