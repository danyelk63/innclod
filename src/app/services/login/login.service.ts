import { Injectable } from '@angular/core';
import { StorageService } from '@services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus = new BehaviorSubject<boolean>(this.hasToken());
  loginStatus$ = this.loginStatus.asObservable(); 

  constructor(private storageService: StorageService) { }

  private hasToken(): boolean {
    if(this.storageService){
      return !!this.storageService.get("token");
    } else {
      return false;
    }
  }

  setLoginStatus(value: boolean) {
    this.loginStatus.next(value);
  }

  logout() {
    this.storageService.remove("token");
    this.storageService.remove("user");
    this.loginStatus.next(false);
  }
}
