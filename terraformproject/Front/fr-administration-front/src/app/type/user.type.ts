export class User {

    id! : number;
    lastname! : string;
    firstname! : string;
    age! : number;
    email! : string;
    password! : string;

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getLastname(): string {
        return this.lastname;
    }

    setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    getFirstname(): string {
        return this.firstname;
    }

    setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    getAge(): number {
        return this.age;
    }

    setAge(age: number): void {
        this.age = age;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    toString(): string {
        return this.id + " " + this.lastname + " " + this.firstname + " " + this.age + " ";
    }

}