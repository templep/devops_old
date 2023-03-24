import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ApiHelperService} from "../services/api-helper.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MatDialog>) {
  }


  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  /**
   * Add new user to database
   */
  register() {
    // get input fields values
    const firstname: string = (document.getElementById("firstname") as HTMLInputElement).value;
    const lastname: string = (document.getElementById("lastname") as HTMLInputElement).value;
    const age: number = +(document.getElementById("age") as HTMLInputElement).value;
    const password: string = (document.getElementById("password") as HTMLInputElement).value;

    // if all fields are not empty
    if (firstname && lastname && age && password) {
      // if age is a number
      if (typeof (age) == 'number') {
        // send post request
        this.api.post({endpoint: '/users', data: {firstname, lastname, age, password}})
        .then(response => {
          // open dialog to inform user
          this.dialog.open(ErrorDialogComponent, {
            data: {
              message: "Sucsessfuly add user, please login",
              redirect: 'home'
            }
          });
          this.dialogRef.close([]);
        })
      }
    }
    // if there is an empty field
    else {
      // show error dialog
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'Wrong informations, please retry', redirect: 'home'}
      });
    }
  }
}
