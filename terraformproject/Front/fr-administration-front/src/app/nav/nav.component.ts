import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActualUser } from '../services/actual-user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLogged : boolean;

  constructor(
    private service: TokenStorageService,
    private actualUser: ActualUser,
    private route: Router
  ) { 
    this.isLogged = this.service.isLogged();
  }

  logout() {
    this.service.clear();
    this.actualUser.deleteUser();
    this.route.navigate(['/login']);
  }

  goListUsers(){
    this.route.navigate(['/users']);
  }

  goListAssociations(){
    this.route.navigate(['/associations']);
  }

  goEditProfil(){
    this.route.navigate(['/edit-profil']);
  }

}