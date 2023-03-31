import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtConstants } from '../global/variable.global';
import { ApiHelperService } from '../services/api-helper.service';
import { Association } from '../type/association.type';

@Component({
  selector: 'app-create-associations',
  templateUrl: './create-associations.component.html',
  styleUrls: ['./create-associations.component.scss']
})
export class CreateAssociationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource = [];

  name: string = '';

  listUserIds: string[] = [];

  selected: boolean[] = [];

  constructor(
    private router: Router,
    private api: ApiHelperService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    const resquest: Observable<any> = this.http.get(jwtConstants.urlBackend+'users', { observe: 'response' });
    resquest.subscribe({next: (response) => {this.dataSource = response.body}, error: (error) => void(0)});
    
    this.selected.forEach((value) => value = false);

  }

  isSelect(user : any) : boolean {
    return this.selected[user.id];
  }

  goBack() {
    this.router.navigate(['/associations']);
  }

  createAssociation() {

    var idsUsers : number[] = [];
    this.listUserIds.forEach((id) => idsUsers.push(parseInt(id)));

    let association = new Association(idsUsers, this.name);

    this.api.post({endpoint: 'associations/', data: association})
    .then(res =>{
      this.goBack();
    })
    .catch(err =>{
      alert("Erreur lors de la création de l'association");
    });
    
  }

  clickRow(user : any){

    if(this.listUserIds.includes(user.id))
      this.selected[user.id] = false;
    else
      this.selected[user.id] = true;

    if(this.listUserIds.includes(user.id))
      this.listUserIds = this.listUserIds.filter((id) => id != user.id);
    else
      this.listUserIds.push(user.id);
      
  }

}
