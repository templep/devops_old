import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtConstants } from '../global/variable.global';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age', "email"];
  dataSource = [];

  firstName : string = "";
  lastName : string = "";
  age : string = "";
  email : string = "";

  idSearched : string = "";

  actualUserId : string = "";

  constructor(private http: HttpClient, private router: Router, private api: ApiHelperService) {}

  ngOnInit(): void { 

    const resquest: Observable<any> = this.http.get(jwtConstants.urlBackend+'users', { observe: 'response' });
    resquest.subscribe({next: (response) => {this.dataSource = response.body}, error: (error) => void(0)});

  }

  clickRow(user : any){
    this.actualUserId = user.id;
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.age = user.age;
    this.email = user.email;
  }

  search(){
    this.api.get({endpoint: 'users/' + this.idSearched})
      .then((user) => {
        this.actualUserId = user.id;
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        this.age = user.age;
        this.email = user.email;
      })
      .catch((error) => {console.log(error)});
  }

  delete(){
    if(this.actualUserId != ""){
      this.api.delete({endpoint: 'users/' + this.actualUserId})
        .then((user) => {
          this.actualUserId = "";
          this.firstName = "";
          this.lastName = "";
          this.age = "";
          this.email = "";
          this.ngOnInit();
        })
        .catch((error) => {console.log(error)});
    }
  }

  add(){
    this.router.navigate(['/create-user']);
  }

}
