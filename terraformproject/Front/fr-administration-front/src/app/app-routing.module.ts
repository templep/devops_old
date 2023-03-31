import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateAssociationsComponent } from './create-associations/create-associations.component';

const routes: Routes = [
  { path: 'users', component: UsersListComponent,
    canActivate: [AuthGuard] 
  },

  { path: 'associations', component: AssociationsListComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'create-user', component: CreateUserComponent
  },

  {
    path: 'create-association', component: CreateAssociationsComponent,
    canActivate: [AuthGuard]
  },

  { path: '', component: MainpageComponent,
    canActivate: [AuthGuard] 
  },

  { path: 'edit-profil', component: EditProfilComponent,
    canActivate: [AuthGuard]
  },

  { path: 'login', component: LoginComponent },

  { path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
