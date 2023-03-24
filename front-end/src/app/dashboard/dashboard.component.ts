import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {Association, User} from "../mock-data";
import {UserStorageService} from "../services/user-storage";
import {TokenStorageService} from "../services/token-storage.service";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {EditAssociationComponent} from "../edit-association/edit-association.component";
import {AssociationAddUserComponent} from "../association-add-user/association-add-user.component";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {
  AssociationListItemExpandComponent
} from "../association-list-item-expand/association-list-item-expand.component";
import {AddAssociationComponent} from "../add-association/add-association.component";
import { backend_url } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  associations: Association[] = []

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private tokenStorageService: TokenStorageService,
    private userStorageService: UserStorageService,
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {
    // ser user to default to counter async call delay
    this.user = this.default_user;
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // change background
    document.body.style.background =
      "linear-gradient(125deg, rgba(43,31,70,1) 0%, rgba(104,42,110,1) 100%)";
    document.body.style.backgroundSize = "100%";

    // set user
    this.user = this.getUser();

    // get all associations
    const resquest: Observable<any> = this.http.get(backend_url+'associations',
      {observe: 'response'})
    lastValueFrom(resquest).then(response => {
      // if user is in the association, push association in array
      for (let i = 0; i < response.body.length; i++) {
        if (this.belongsTo(response.body[i])) {
          this.associations.push(response.body[i]);
        }
      }
    });
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

  /**
   * Assert user is in association
   * @param association
   * @private
   */
  private belongsTo(association: Association): boolean {
    // run through association users
    for (let i = 0; i < association.users.length; i++) {
      // if user is found return true
      if (association.users[i].id == this.user.id) {
        return true;
      }
    }
    // otherwise return false
    return false;
  }

  /************************************************************************************************/
  /*                                        User functions                                        */
  /************************************************************************************************/
  /**
   * Delete logged user
   */
  deleteUser() {
    // get user from stored id
    const resquest: Observable<any> = this.http.delete(
      backend_url+'users/' + localStorage.getItem("user"),
      {observe: 'response'}
    );
    lastValueFrom(resquest).then(response => {
      // clear local storage
      this.tokenStorageService.clear();
      this.userStorageService.clear();
      // return to home
      this.router.navigateByUrl('');
    });
  }

  /**
   * Edit logged user
   */
  editUser() {
    // open user update dialog
    this.dialog.open(EditUserComponent)
    // after updating
    .afterClosed().subscribe((result) => {
      // if update is sucessful
      if (result) {
        // update user fields
        this.user = this.getUser();
        // show message to inform user
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: "Sucsessfuly edit user",
            redirect: 'dashborad'
          }
        })
        // after message
        .afterClosed().subscribe((result) => {
          // refresh page to show the new fields
          location.reload();
        })
      }
    });
  }

  /************************************************************************************************/
  /*                                    Associations functions                                    */
  /************************************************************************************************/
  /**
   * Add new assocaition
   */
  addAssociation() {
    // open association post dialog
    this.dialog.open(AddAssociationComponent).afterClosed().subscribe((result) => {
      // if new association successfully added
      if (result) {
        // show message to inform user
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: "Sucsessfuly added association",
            redirect: 'dashborad'
          }
        })
      }
    });
  }

  /**
   * Delete association
   * @param id association id to delete
   */
  deleteAssociation(id: number) {
    try {
      // send delete request
      const resquest: Observable<any> = this.http.delete(
        backend_url+'associations/' + id,
        {observe: 'response'}
      );
      lastValueFrom(resquest).then(response => { console.log(response)});
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Edit association fields
   * @param id association id to update
   */
  editAssociation(id: number) {
    // open association update dialog
    this.dialog.open(EditAssociationComponent, {data: id})
    .afterClosed().subscribe((result) => {
      // if update was successful
      if (result) {
        // show message to inform user
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: "Sucsessfuly edit association",
            redirect: 'dashborad'
          }
        })
      }
    });
  }

  /**
   * Add users in association
   * @param id association id
   */
  addUsersInAssociation(id: number) {
    // open dialog
    this.dialog.open(AssociationAddUserComponent, {data: id})
    .afterClosed().subscribe((result) => {
      // if users are successfully added
      if (result) {
        // show message to inform user
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: "Sucsessfuly added user(s)",
            redirect: 'dashborad'
          }
        })
      }
    });
  }

  /**
   * Show association information
   * @param associationId
   */
  expandAssociationInformation(associationId: number) {
    // open expand dialog
    this.dialog.open(AssociationListItemExpandComponent, {data: associationId})
  }


}

