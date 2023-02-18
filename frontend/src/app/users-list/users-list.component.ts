import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import{ApiHelperService } from '../services/api-helper.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age','action'];
  dataSource = [];
  errorMessage:string=''
  addF: boolean = false;
  lastname !: String;
  firstname !: String;
  age !: number;
  password!:string

  profileForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    age: new FormControl(),
    password:new FormControl()
  });

  constructor(
    private http: HttpClient,
    private service: ApiHelperService ,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.addF = false;
    this.http.get<any>('http://localhost:3000/users').subscribe(res => {
        this.dataSource = res;
    });
    this.profileForm.get('firstname')?.valueChanges.subscribe(res => {
      this.firstname = res.toString();
    })
    this.profileForm.get('lastname')?.valueChanges.subscribe(res => {
      this.lastname = res.toString();
    })
    this.profileForm.get('age')?.valueChanges.subscribe(res => {
      this.age = Number(res);
    })
    this.profileForm.get('password')?.valueChanges.subscribe(res => {
      this.password = res;
    })
  }

  add() : void {
    this.addF=true;
  }
  deleteUser(id:number){
    // Suppression User
    if(this.http.delete(`http://localhost:3000/users/${id}`)){
      this.http.delete(`http://localhost:3000/users/${id}`).subscribe(
        response => {
          console.log(response);});
       this.route.navigateByUrl('/users')
       .catch((error:HttpErrorResponse) => {
         this.errorMessage="error"
       })
      alert("you have delete the user with the Id: "+id+"")
      window.location.reload()
     }

  }

  goToProfil(id:number){
    this.route.navigateByUrl("/users/"+id);
  }

  submit(): void{
    if(this.addF){
      const postRequest = {firstname : this.firstname, lastname : this.lastname, age : this.age,password:this.password};
      this.http.post('http://localhost:3000/users/',postRequest).subscribe(
        res => {
          this.ngOnInit();
        }
      );
    } 
  }

}
