import {Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(private elementRef: ElementRef, private dialog: MatDialog) {
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // Change background
    document.body.style.backgroundImage = "url('../../assets/home_background.jpg')";
    document.body.style.backgroundSize = '100%';
  }

  ngOnDestroy() {
    // Reset background
    document.body.style.background = "url('../../assets/background.jpg')";
    document.body.style.backgroundImage = "100%";
  }

  /************************************************************************************************/
  /*                                          Functions                                           */
  /************************************************************************************************/
  openLogin() {
    // Open login dialog
    this.dialog.open(LoginComponent);
  }

  openRegister() {
    // Open register dialog
    this.dialog.open(RegisterComponent);
  }
}
