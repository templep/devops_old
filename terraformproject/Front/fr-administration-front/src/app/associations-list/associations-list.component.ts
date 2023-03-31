import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtConstants } from '../global/variable.global';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})
export class AssociationsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];
  dataSource = [];

  name : String = '';
  MembersName : String = '';

  idSearched : string = "";

  actiualAssociationId : string = "";

  constructor(private http: HttpClient, private router: Router, private api: ApiHelperService ) {}

  ngOnInit(): void {
    
    const resquest: Observable<any> = this.http.get(jwtConstants.urlBackend+'associations', { observe: 'response' });
    resquest.subscribe({next: (response) => {this.dataSource = response.body}, error: (error) => void(0)});

  }

  clickRow(associations : any){
    this.name = associations.name;

    this.api.get({endpoint: 'associations/' + associations.id + '/members'})
      .then(response => {
        this.MembersName = '';
        for(let i = 0; i < response.length; i++){
          this.MembersName += response[i].firstname + ' ' + response[i].lastname + ', ';
        }
        this.MembersName = this.MembersName.slice(0, -2);
        this.actiualAssociationId = associations.id;
      })
      .catch(error => void(0));
  }

  search(){
    this.api.get({endpoint: 'associations/' + this.idSearched})
      .then((associations) => {
        this.name = associations.name;
        associations.users.forEach((member: any) => {
          this.MembersName += member.firstname + ' ' + member.lastname + ', ';
          this.actiualAssociationId = associations.id;
        });
        this.MembersName = this.MembersName.slice(0, -2);
      })
      .catch((error) => {console.log(error)});
  }

  delete(){

    if(this.actiualAssociationId != ""){
      this.api.delete({endpoint: 'associations/' + this.actiualAssociationId})
        .then((associations) => {
          this.actiualAssociationId = "";
          this.name = "";
          this.MembersName = "";
          this.ngOnInit();
        })
        .catch((error) => {console.log(error)});
    }

  }

  add(){
    this.router.navigate(['/create-association']);
  }

}
