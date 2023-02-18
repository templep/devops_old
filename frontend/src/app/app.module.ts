import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsersInfosComponent } from './users-infos/users-infos.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { AssociationsMembersComponent } from './associations-members/associations-members.component';
import { AssociationsMinutesComponent } from './associations-minutes/associations-minutes.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    UsersInfosComponent,
    AssociationsListComponent,
    AssociationsMembersComponent,
    AssociationsMinutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule
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
