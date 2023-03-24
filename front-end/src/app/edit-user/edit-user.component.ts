import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {User} from "../mock-data";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiHelperService} from "../services/api-helper.service";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { backend_url } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  /************************************************************************************************/
  /*                                          Attributes                                          */
  /************************************************************************************************/
  public user!: User;

  private default_user: User = new User(
    0,
    "default",
    "default",
    0,
    "default"
  );

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MatDialog>,
    private http: HttpClient,
  ) {
    // set user to default to counter async delay
    this.user = this.default_user;
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // set user
    this.user = this.getUser()
  }

  /**
   * Get user from local storage information
   */
  getUser(): User | any {
    // get user from local storage id
    const resquest: Observable<any> = this.http.get('' +
      backend_url+'users/' + localStorage.getItem('user'),
      {observe: 'response'});
    lastValueFrom(resquest).then(response => {
      // create new user with response feilds
      const user: User = new User(
        +response.body.id,
        response.body.firstname,
        response.body.lastname,
        response.body.age,
        response.body.password
      );
      // set user
      this.user = user;
    });
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  /**
   * Update user
   */
  updateUser() {
    // get input fields values
    let firstname = (document.getElementById("firstname") as HTMLInputElement).value;
    let lastname = (document.getElementById("lastname") as HTMLInputElement).value;
    let age = +(document.getElementById("age") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;

    // if there is at least one field not empty
    if (firstname || lastname || age || password) {
      // fill empty fields with user information
      if (!firstname) {
        firstname = this.user.firstname;
      }
      if (!lastname) {
        lastname = this.user.lastname;
      }
      if (!age) {
        age = this.user.age;
      }
      if (!password) {
        password = this.user.password;
      }

      // assert age is a number to avoid non-numeric age
      if (typeof (age) == 'number') {
        // send update request
        this.api.put({
          endpoint: '/users/' + localStorage.getItem('user'),
          data: {firstname, lastname, age, password}
        })
        .then(response => {
          // return to dashboard
          this.router.navigateByUrl('dashboard');
          // close dialog
          this.dialogRef.close([])
        })
      }
    }
    // if all inputs are empty
    else {
      // open error dialog
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'No information send, please retry', redirect: 'home'}
      });
    }
  }
}

