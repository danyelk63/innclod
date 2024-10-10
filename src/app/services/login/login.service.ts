import { Injectable } from '@angular/core';
import { IUser } from '@models';
import { StorageService } from '@services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus;
  loginStatus$;

  private userData;
  userData$;

  constructor(private storageService: StorageService) {
    this.loginStatus = new BehaviorSubject<boolean>(this.hasToken());
    this.loginStatus$ = this.loginStatus.asObservable();
    
    this.userData = new BehaviorSubject<IUser | null>(null);
    this.userData$ = this.userData.asObservable();
  }

  private hasToken(): boolean {
    if (this.storageService) {
      return !!this.storageService.get("token");
    } else {
      return false;
    }
  }

  setLoginStatus(value: boolean) {
    this.loginStatus.next(value);
  }

  setUserData(value: IUser) {
    this.userData.next(value);
  }

  logout() {
    this.storageService.remove("token");
    this.storageService.remove("user");
    this.loginStatus.next(false);
  }
}
