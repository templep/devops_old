import { AssociationDTO } from "./association.dto"

export class Member{
    public lastname:string
    public firstname: string
    public age:number
    public role:string
    public email:string

    constructor (lastname:string, firstname:string, age:number, role:string,email:string){
        this.lastname =lastname
        this.firstname=firstname
        this.age=age
        this.role=role
        this.email=email
    }
}