import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Association} from "../mock-data";
import { backend_url } from 'src/environments/environment';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.css']
})
export class AssociationsListComponent implements OnInit {
  /************************************************************************************************/
  /*                                          Attributes                                          */
  /************************************************************************************************/
  dataSource: Association[] = [];

  /************************************************************************************************/
  /*                                         Constructor                                          */
  /************************************************************************************************/
  constructor(private http: HttpClient) {
  }

  /************************************************************************************************/
  /*                                        Initialization                                        */
  /************************************************************************************************/
  ngOnInit() {
    // change background
    document.body.style.background =
      "linear-gradient(125deg, rgba(43,31,70,1) 0%, rgba(104,42,110,1) 100%)";
    document.body.style.backgroundImage = "100%";

    // get all associations and push in datasource array
    const resquest: Observable<any> = this.http.get(backend_url+'associations', { observe: 'response' });
    lastValueFrom(resquest).then(response => this.dataSource = response.body);
  }

}

