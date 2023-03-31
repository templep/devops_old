import { Injectable } from "@angular/core";
import { User } from "../type/user.type";
import { ApiHelperService } from "./api-helper.service";

@Injectable({
    providedIn: 'root',
})
export class ActualUser{

    user : User = new User();
    defined : boolean = false;

    constructor(
        private api: ApiHelperService
    ){}

    getUser(): User {
        return this.user;
    }

    setUser(id : number): void {

        this.api.get({endpoint: 'users/' + id})
            .then(response => {

                this.user.setId(+response.id);
                this.user.setLastname(response.lastname);
                this.user.setFirstname(response.firstname);
                this.user.setAge(+response.age);
                this.user.setEmail(response.email);

                this.defined = true;

            })
            .catch(error => void(0));
    }

    exportUser(): void {
        
        this.api.put({endpoint: 'users/' + this.user.getId(), data: this.user})
            .then(response => {
                alert("Profil modifié avec succès");
            })
            .catch(error => {console.log(error), alert("Erreur lors de la modification du profil")});

    }

    deleteUser(): void {
        this.user = new User();
        this.defined = false;
    }

}