import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  public save(userId: string) {
    // remove old user item
    localStorage.removeItem('user');
    // set new user item
    localStorage.setItem('user', userId);
  }

  public clear() {
    // remove user item
    localStorage.removeItem('user');
  }
}
