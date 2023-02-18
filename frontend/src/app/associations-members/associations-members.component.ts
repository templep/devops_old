import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, forwardRef, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';

@Component({
  selector: 'app-associations-members',
  templateUrl: './associations-members.component.html',
  styleUrls: ['./associations-members.component.css']
})
export class AssociationsMembersComponent {
 

  constructor(
  private http: HttpClient,
  private route: ActivatedRoute,
  private router:Router
  ) {}

  displayedColumns: string[] = ['lastname', 'firstname', 'age','role','action'];
  dataSource = [];
  name!:string
  idassos!:number
  idUser!:number[]
  
  suppF:boolean= false;
  roleF:boolean=false;
  newRole!:string
  userId!:number

  errorMessage: string | undefined;
//Modify Role
  modifRoleForm= new FormGroup({
    roleControl:new FormControl()
  })
  mod:boolean=false

  //Add Member
  addF!: boolean
  idMember!:number
  roleName!:string
  addMemberForm= new FormGroup({
    idControl:new FormControl(),
    rolControl:new FormControl()
  })

  ngOnInit(){
    this.addF=false
    this.mod=false
    this.route.paramMap.subscribe( (params: ParamMap) => { 
      console.log(Number(params.get('id')));
      let id = params.get('id');
      this.idassos=(Number)(id)

    })
    this.http.get<any>('http://localhost:3000/associations/'+this.idassos).subscribe(res => {
      this.name = res.name;
  });
    this.http.get<any>('http://localhost:3000/associations/'+this.idassos+'/IdMembers').subscribe(res => { 
    this.idUser = res;
    console.log(this.idUser)
  });
      
    this.http.get<any>('http://localhost:3000/associations/'+this.idassos+'/members').subscribe(res => {
      this.dataSource = res;
  });

  this.modifRoleForm.get('roleControl')?.valueChanges.subscribe(res => {
    this.newRole= res.toString();
  });

  this.addMemberForm.get('idControl')?.valueChanges.subscribe(res => {
    this.idMember= res.toString();
  });

  this.addMemberForm.get('rolControl')?.valueChanges.subscribe(res => {
    this.roleName= res.toString();
  });

  }

  add() : void {
    this.addF=true;
  }

  modify(id:number){
    this.mod=true
    this.userId=this.idUser[id]
  }

  modifier(){
      let data={name:this.newRole}
      this.http.put('http://localhost:3000/roles/'+this.userId+'/'+this.idassos, data).subscribe(res =>{
        console.log(res);
        this.ngOnInit();
      });

  }

  ajouter(){
    const postRequest={idUser:this.idMember,idAssociation:this.idassos,name:this.roleName}
    this.http.post('http://localhost:3000/roles/',postRequest).subscribe(res =>{
      });
    this.idUser.push(this.idMember)
    const newdata={name:this.name, idUsers:this.idUser}
    this.http.put('http://localhost:3000/associations/'+this.idassos,newdata).subscribe(res =>{
        console.log(res);
        this.ngOnInit();
      });
  }

  deleteMember(id:number){
    this.idMember=this.idUser[id]
    this.http.delete('http://localhost:3000/roles/'+this.idMember+'/'+this.idassos).subscribe(res =>{
    });
    let index = this.idUser.indexOf(id)
    this.idUser.splice(index,1)
    const newdata={name:this.name, idUsers:this.idUser}
    this.http.put('http://localhost:3000/associations/'+this.idassos,newdata).subscribe(res =>{
        console.log(res);
        this.ngOnInit();
      });

  }

}
