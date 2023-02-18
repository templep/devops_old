import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service'
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.isLogged()){
      this.route.navigateByUrl("/home");
    }
  }

  login(): void {
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    
    this.tokenStorageService.setIdUser((Number)(username));

    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    
    this.api.post({endpoint: '/auth/login', data: { username, password },})
    .catch(e => alert("utilisateurs ou mot de passe incorect"))
    .then(response => {
      this.tokenStorageService.save(response.access_token, username);
      window.location.reload(); // permet au  logout d'être directement pris en compte
      this.route.navigateByUrl("/home");
    });
  }


}
