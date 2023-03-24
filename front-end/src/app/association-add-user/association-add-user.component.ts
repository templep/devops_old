import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ApiHelperService} from "../services/api-helper.service";
import {Router} from "@angular/router";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {User} from "../mock-data";

@Component({
  selector: 'app-association-add-user',
  templateUrl: './association-add-user.component.html',
  styleUrls: ['./association-add-user.component.css']
})
export class AssociationAddUserComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    @Inject(MAT_DIALOG_DATA) public associationId: number,
    private api: ApiHelperService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  /**
   * Add a new user in association
   */
  addUser() {
    // get users entry string
    const users: string = (document.getElementById("users") as HTMLInputElement).value;
    // convert in number array
    let user_tab: number[] = this.getUsers(users);
    // if there is an entry
    if (!isNaN(user_tab[0])) {
      // get association with corresponding id
      this.api.get({endpoint: 'associations/' + this.associationId})
      .then(response => {
        // construct new users array
        const users: number[] = this.addUsers(response.users, user_tab);
        // get name
        const name = response.name;
        // update association
        this.api.put({
          endpoint: 'associations/' + this.associationId,
          data: {name, users}
        })
        .then(response => {
          // Open dialog to show success to the user
          this.dialog.open(ErrorDialogComponent, {
            data: {message: 'Association updated successfully', redirect: 'dashboard'}
          });
        })
        .catch((error) => console.log(error))
      }).catch((error) => console.log(error))
    }
  }

  /**
   * Get users id from string
   * @param users, string to parse
   */
  getUsers(users: string): number[] {
    // create emtpy array
    let ret = [];
    // split users inputs
    const split = users.split(',');
    // cast to number and push in array
    for (let i = 0; i < split.length; i++) {
      ret.push(+split[i])
    }

    // check for invalid entries
    for (let i = 0; i < ret.length; i++) {
      if ((typeof ret[i]) != "number") {
        return []
      }
    }

    // return array
    return ret
  }

  /**
   * Add users in tab
   * @param users, ancient users ids
   * @param newId, new users ids
   */
  addUsers(users: User[], newId: number[]): number[] {
    //create empty array
    let ret: number[] = [];

    // push users id in tab
    for (let i = 0; i < users.length; i++) {
      ret.push(users[i].id);
    }

    //push new id if they are not in association yet
    for (let i = 0; i < newId.length; i++) {
      if (!ret.includes(newId[i]))
        ret.push(newId[i]);
    }
    return ret
  }
}


