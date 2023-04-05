class User{
    constructor(name){
        this.name=name
    }
    uppercaseName(){
        this.name=this.name.toUpperCase();
        return this.name;
    }
}

const user=new User("FuzzySid")
user.uppercaseName();