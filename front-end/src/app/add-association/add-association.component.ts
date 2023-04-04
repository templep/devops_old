import {Component} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {User} from "../mock-data";

@Component({
  selector: 'app-add-association',
  templateUrl: './add-association.component.html',
  styleUrls: ['./add-association.component.css']
})
export class AddAssociationComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private api: ApiHelperService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MatDialog>,
  ) {
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  /**
   * Add new association in database
   */
  add() {
    // get association name and input users
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const users: string = (document.getElementById("users") as HTMLInputElement).value;

    // if both fields are not empty
    if (name && users) {
      // get all users
      this.api.get({
        endpoint: 'users'
      }).then((response) => {
        // if user entry is valid (if all entry are in user list
        if (this.isValid(users, response)) {
          // post new association
          this.api.post({
            endpoint: 'associations',
            data: {name, users}
          }).then(response => {
            // navigate to dashboard and close dialog
            this.router.navigateByUrl('dashboard');
            this.dialogRef.close([])
          })
        }
        // otherwise open error dialog
        else {
          this.dialog.open(ErrorDialogComponent, {
            data: {message: 'Wrong information, please retry'}
          });
        }
      });

    }
    // otherwise => open error dialog
    else {
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'Wrong information, please retry', redirect: 'home'}
      });
    }
  }

  /**
   * Verify if user inputs are in database
   * @param users, the users input
   * @param usersTab, the userTab database
   */
  isValid(users: string, usersTab: User[]): boolean {
    // split inputs in string tab
    const usersSplit = users.split(',');

    // run through inputs
    for (let i = 0; i < usersSplit.length; i++) {
      // set locator to false
      let found = false;
      // run trought users
      for (let j = 0; j < usersTab.length; j++) {
        // if id match, set locator to true
        if (usersTab[j].id == +usersSplit[i]) {
          found = true;
        }
      }
      // if no coresponding users found, return false
      if (!found) {
        return false;
      }
    }
    // otherwise return true
    return true;
  }
}
