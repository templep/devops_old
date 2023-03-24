import {Component, Inject, OnInit} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserStorageService} from "../services/user-storage";

@Component({
  selector: 'app-association-list-item-expand',
  templateUrl: './association-list-item-expand.component.html',
  styleUrls: ['./association-list-item-expand.component.css']
})
export class AssociationListItemExpandComponent implements OnInit {
  /************************************************************************************************/
  /*                                          Attributes                                          */
  /************************************************************************************************/
  name!: string;
  users: string[] = [];

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    @Inject(MAT_DIALOG_DATA) public associationId: number,
    private api: ApiHelperService,
  ) {
  }


  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit(): void {
    // get association with corresponding id
    this.api.get({endpoint: 'associations/' + this.associationId})
    .then(response => {
      // get association name
      this.name = response.name;
      // get association users firstname and lastname
      for (let i = 0; i < response.users.length; i++) {
        this.users.push(response.users[i].firstname + " " + response.users[i].lastname)
      }
    })
    .catch((error) => console.log(error))
  }
}

