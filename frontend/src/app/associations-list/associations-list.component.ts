import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.css']
})
export class AssociationsListComponent {

  public idAssos!:string;
  displayedColumns: string[] = ['id','name','members'];
  dataSource : Object[] = [];

  wantToAddOrSuppr : boolean = false;
  addF: boolean = false;
  updateF : boolean = false;
  minutes : boolean = false;
  supprF: boolean = false;
  users !: String[]

  //paramètres d'entrée pour la création d'une associations
  name!:string
  idUsers!:number[]

  ajoutAssociation = new FormGroup({
    idControl: new FormControl(),
    nameControl: new FormControl()
  })
  errorMessage: string | undefined;

  constructor(
    private http: HttpClient,
    private route:Router
  ) { }

  /**
   * Permet de récupérer les données liées au lien passée en paramètre
   * @param link le lien sur lequel on veut appliquer la requête
   * @returns un observable sur cette requête
   */

  goToMembers(id:string){
    this.idAssos=id
    this.route.navigateByUrl('associations/'+id+'/members');
  }

  goToMinutes(id:string){
    this.idAssos=id
    this.route.navigateByUrl('associations/'+id+'/minutes');
  }

  sendGetRequest(link : string): Observable<any> {
    return this.http.get<any>(link);
  }

  sendPutRequest(link : string, data: any): Observable<any> {
    return this.http.put<any>(link, data);
  }

  sendDeletRequest(link : string, data: any): Observable<any> {
    return this.http.delete<any>(link, data);
  }



  ngOnInit():void{
  this.http.get<any>('http://localhost:3000/associations/ent').subscribe(res => {
        this.dataSource = res;
    });

    this.ajoutAssociation.get('idControl')?.valueChanges.subscribe(res => {
      this.idUsers = res.toString().split(',');
      for(let i=0;i<this.idUsers.length;i++){
        this.idUsers[i]=(Number)(this.idUsers[i])
      }
      console.log(this.idUsers)
    });
    this.ajoutAssociation.get('nameControl')?.valueChanges.subscribe(res => {
      this.name = res.toString();
    });
  }

  add() : void {
    this.addF=true;
    this.supprF=false;
  }

  supp(id:string):void{
    this.addF=false;
    this.supprF=true;
    if(this.http.delete('http://localhost:3000/associations/'+id)){
      this.http.delete('http://localhost:3000/associations/'+id).subscribe(
        response => {
          console.log(response);});
       this.route.navigateByUrl('/associations')
       .catch((error:HttpErrorResponse) => {
         this.errorMessage="error"
       })
      alert("you have delete the Association with the Id: "+id+"")
     }
    window.location.reload()
  }

  submit(){
    if(this.addF){
      let data = {name: this.name, idUsers:this.idUsers}
      this.http.post('http://localhost:3000/associations/', data).subscribe(res =>{
        console.log(res);
        this.ngOnInit();
      });
    }

  }



}
