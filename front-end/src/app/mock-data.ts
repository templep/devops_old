export class User {
    constructor(
      public id: number,
      public firstname: string,
      public lastname: string,
      public age: number,
      public password: string,
    ) {
    }
  }
  
  export interface Association {
    id: number;
  
    name: string;
  
    users: User[];
  }
  
  