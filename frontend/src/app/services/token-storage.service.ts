import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const IS_LOGGED_IN = 'isLoggedIn';
const IS_LOGGED = 'true';
var ID_USER =-1;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  idUser !: number

  public clear(): void {
    localStorage.clear();
  }
  public save(token: string, id : string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(IS_LOGGED_IN);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, id);
    localStorage.setItem(IS_LOGGED_IN, IS_LOGGED);
  }

  public setIdUser(user : number){
    ID_USER = user;
  }

  public getIdUser(){
    return localStorage.getItem(USERNAME_KEY);
  }

  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    return token === null ? '' : token;
  }

  public isLogged(): boolean {
    return (Boolean)(localStorage.getItem(IS_LOGGED_IN));
  }

  public isLoggedObservable() {
    return of((Boolean)(localStorage.getItem(IS_LOGGED_IN)));
  }

}
