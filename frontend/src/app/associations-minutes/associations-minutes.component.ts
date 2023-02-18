import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';

@Component({
  selector: 'app-associations-minutes',
  templateUrl: './associations-minutes.component.html',
  styleUrls: ['./associations-minutes.component.css']
})
export class AssociationsMinutesComponent {

  displayedColumns: string[] = ['content', 'date','action'];
  dataSource = [];
  idAssos!:number
  name!:string
  errorMessage: string | undefined;

  //Boolean value
  add=false
  mod=false

  //Creation de Minutes
  content!:string
  date!:string

  minuteForm = new FormGroup({
    content: new FormControl(),
    date: new FormControl()
  });
  //Modification Minutes
  idMin!:number

  newContent!:string
  contentForm=new FormGroup({
    newContent:new FormControl()
  })

  constructor(
    private http: HttpClient,
    private route:ActivatedRoute,
    private router:Router
  ) { }
  
  ngOnInit(){
    this.mod=false
    this.add=false
    this.route.paramMap.subscribe( (params: ParamMap) => { 
      console.log(Number(params.get('id')));
      let id = params.get('id');
      this.idAssos=(Number)(id)

    })

    this.minuteForm.get('content')?.valueChanges.subscribe(res => {
      this.content = res.toString();
    })
    this.minuteForm.get('date')?.valueChanges.subscribe(res => {
      this.date = res.toString();
    })

    this.contentForm.get('newContent')?.valueChanges.subscribe(res => {
      this.newContent = res.toString();
    })

    this.http.get<any>('http://localhost:3000/associations/'+this.idAssos).subscribe(res => {
      this.name = res.name;
  });
      
    this.http.get<any>('http://localhost:3000/associations/'+this.idAssos+'/minutes').subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource)
  });

  }
  addF(){
    this.add=true
  }

  ajouter(){
   const postRequest = {content:this.content, date:this.date,idAssociation:this.idAssos};
    this.http.post('http://localhost:3000/minutes/',postRequest).subscribe(
      res => {
        this.ngOnInit();
      });

}

modF(id:number){
  this.mod=true
  this.idMin=id
  console.log(this.mod)
}

modifier(){
  const data={content:this.newContent, idAssociation:this.idAssos, idMin:this.idMin}
  this.http.put(`http://localhost:3000/minutes/${this.idMin}`,data).subscribe(
    response => {
      console.log(response);});
      this.ngOnInit()
   this.router.navigateByUrl('/associations/'+this.idAssos+'/minutes')
   .catch((error:HttpErrorResponse) => {
     this.errorMessage="error"
   })

}

  supprimer(idmin:number){
    this.http.delete(`http://localhost:3000/minutes/${idmin}`).subscribe(
        response => {
          console.log(response);});
       this.router.navigateByUrl('/associations/'+this.idAssos+'/minutes')
       .catch((error:HttpErrorResponse) => {
         this.errorMessage="error"
       })
       alert("you have delete the user with the Id: "+idmin+"")
       window.location.reload()

  }

}
