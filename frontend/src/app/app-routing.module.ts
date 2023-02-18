import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersInfosComponent } from './users-infos/users-infos.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationsMembersComponent } from './associations-members/associations-members.component';
import { AssociationsMinutesComponent } from './associations-minutes/associations-minutes.component';
const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  {path: 'users/:id', component: UsersInfosComponent, canActivate: [AuthGuard]},
  {path: 'associations/:id/members', component: AssociationsMembersComponent, canActivate: [AuthGuard]},
  {path: 'associations/:id/minutes', component: AssociationsMinutesComponent, canActivate: [AuthGuard]},
  {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  { path: 'associations', component: AssociationsListComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
