import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { User } from '../type/user.type';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  firstName: string = '';
  lastName: string = '';
  age: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private api: ApiHelperService
  ) { }

  goBack() {
    this.router.navigate(['/users']);
  }

  createUser() {

    let isnum = /^\d+$/.test(this.age);

    if(!isnum){

      alert('Age must be a number');

    }else{

      let user = new User();
      user.setFirstname(this.firstName);
      user.setLastname(this.lastName);
      user.setAge(+this.age);
      user.setEmail(this.email);
      user.setPassword(this.password);
      
      this.api.post({endpoint: 'users/', data: user})
        .then(res => {
          alert("Votre Id de connexion est : " + res.id);
          this.goBack();
        })
        .catch(err => {
          console.error(err);
        });

    } 

  }

}
