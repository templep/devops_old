import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActualUser } from '../services/actual-user.service';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private actualUser: ActualUser,
    private router: Router
  ){}

  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({endpoint: 'auth/login', data: {username, password}})
      .then(response => {
        this.tokenStorageService.save(response.access_token)
        this.router.navigateByUrl('/')
        this.actualUser.setUser(+username)
      })
      .catch(error => alert("Erreur d'authentification"));
  }

  createProfile(): void {
    this.router.navigateByUrl('/create-user')
  }

}
