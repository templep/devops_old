import {Component} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {UserStorageService} from "../services/user-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<MatDialog>,
    private userStorageService: UserStorageService
  ) {
  }


  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  login(): void {
    this.tokenStorageService.clear();
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: 'auth/login', data: {username, password}})
    .then(response => {
      // save acsess token
      this.tokenStorageService.save(response.access_token);
      this.userStorageService.save(username);
      // reset background
      document.body.style.background = "linear-gradient(125deg, rgba(43,31,70,1) 0%, rgba(104,42,110,1) 100%)";
      document.body.style.backgroundImage = "100%";
      // redirect user
      this.router.navigateByUrl('/dashboard');
      this.dialogRef.close([])
    })
    .catch((error) => {
      // If backend send 401 error
      if (error.statusText == 'Unauthorized') {
        // open error dialog
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: 'Wrong login or password',
            redirect: 'home'
          }
        })
      }
    })
  }
}
