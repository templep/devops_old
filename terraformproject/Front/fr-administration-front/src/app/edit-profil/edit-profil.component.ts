import { Component, OnInit } from '@angular/core';
import { ActualUser } from '../services/actual-user.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit{

  firstName: string = '';
  lastName: string = '';
  age: number = 0;
  email: string = '';
  password: string = '';

  checkedPassword: boolean = false;

  constructor(
    private actualUser: ActualUser
  ) {}

  ngOnInit(): void {
    this.firstName = this.actualUser.getUser().getFirstname();
    this.lastName = this.actualUser.getUser().getLastname();
    this.age = this.actualUser.getUser().getAge();
    this.email = this.actualUser.getUser().getEmail();
  }

  editProfil(): void {
    this.actualUser.getUser().setFirstname(this.firstName);
    this.actualUser.getUser().setLastname(this.lastName);
    this.actualUser.getUser().setAge(this.age);
    this.actualUser.getUser().setEmail(this.email);

    if(this.checkedPassword){
      this.actualUser.getUser().setPassword(this.password);
    }
    
    this.actualUser.exportUser();
  }

}
