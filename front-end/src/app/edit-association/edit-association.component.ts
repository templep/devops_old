import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiHelperService} from "../services/api-helper.service";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-association',
  templateUrl: './edit-association.component.html',
  styleUrls: ['./edit-association.component.css']
})
export class EditAssociationComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    @Inject(MAT_DIALOG_DATA) public assoId: number,
    private api: ApiHelperService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MatDialog>,
  ) {
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  updateAssociation() {
    // get name input
    let name: string = (document.getElementById("name") as HTMLInputElement).value;

    // if there is an entry
    if (name) {
      // send put request
      this.api.put({
        endpoint: 'associations/' + this.assoId,
        data: {name}
      })
      .then(response => {
        // inform user with dialog
        this.dialogRef.close([])
      }).catch((error) => console.log(error));
    }
    // if there is no entry
    else {
      // show error to user
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'No information send, please retry', redirect: 'home'}
      });
    }
  }
}

