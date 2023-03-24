import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenHttpInterceptor} from "./interceptors/token.interceptor";
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationsListItemComponent } from './associations-list-item/associations-list-item.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditAssociationComponent } from './edit-association/edit-association.component';
import { AssociationAddUserComponent } from './association-add-user/association-add-user.component';
import { AssociationListItemExpandComponent } from './association-list-item-expand/association-list-item-expand.component';
import { AddAssociationComponent } from './add-association/add-association.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    ErrorDialogComponent,
    AssociationsListComponent,
    AssociationsListItemComponent,
    UserListItemComponent,
    EditUserComponent,
    EditAssociationComponent,
    AssociationAddUserComponent,
    AssociationListItemExpandComponent,
    AddAssociationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true,
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
