import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../mock-data";
import { backend_url } from 'src/environments/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  /************************************************************************************************/
  /*                                          Attributes                                          */
  /************************************************************************************************/
  UsersData: User[] = [];

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(private http: HttpClient) {
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // set document background
    document.body.style.background =
      "linear-gradient(125deg, rgba(43,31,70,1) 0%, rgba(104,42,110,1) 100%)";
    document.body.style.backgroundImage = "100%";

    // send get request and store in array
    const resquest: Observable<any> = this.http.get(
      backend_url+'users',
      {observe: 'response'}
    );
    lastValueFrom(resquest).then(response => this.UsersData = response.body);
  }
}
