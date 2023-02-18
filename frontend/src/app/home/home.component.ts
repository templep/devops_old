import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: TokenStorageService,
    private route: Router
    ) { }

  ngOnInit(): void {
  }

  goToGetUsers(){
    this.route.navigateByUrl("/users");
  }
  
  goToAssociations(){
    this.route.navigateByUrl("/associations");
  }

}
