import { Member } from "./association.member"

export class AssociationDTO{
    public name:string
    
    public members:Member[]
    constructor (name:string, members:Member[]){
        this.name =name
        this.members=members
        
    }
}