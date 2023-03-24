import {Component} from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";
import {UserStorageService} from "../services/user-storage";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(
    private tokenStorageService: TokenStorageService,
    private userStorageService: UserStorageService,
    private router: Router
  ) {
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  /**
   * navigate to dashboard
   */
  goToDashboard() {
    // change background
    this.changeBackground();
    // navigate to dashboard
    this.router.navigateByUrl('/dashboard')
  }

  /**
   * Logout user
   */
  logout(): void {
    // clear local storage
    this.tokenStorageService.clear();
    this.userStorageService.clear();
    // navigate to home
    this.router.navigateByUrl('');
  }

  goToUserList() {
    // change background
    this.changeBackground();
    // navigate to user list page
    this.router.navigateByUrl('/users')
  }

  goToAssociationList() {
    // change background
    this.changeBackground();
    // navigate to user list page
    this.router.navigateByUrl('/associations')
  }

  /**
   * Change document background
   * @private
   */
  private changeBackground() {
    document.body.style.background =
      "linear-gradient(125deg, rgba(43,31,70,1) 0%, rgba(104,42,110,1) 100%)";
    document.body.style.backgroundImage = "100%";
  }
}

