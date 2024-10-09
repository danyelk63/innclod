import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserLogin, User } from '@models';
import { EndpointService } from '@services';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {
  private data = {
    url: "login",
  }
  constructor(private httpClient: HttpClient, private endpointService: EndpointService) {}

  post(userLogin: IUserLogin) {
    return this.httpClient.post<any>(this.endpointService.getEndpointUrl(this.data.url), userLogin)
  }

  /*post(userLogin: IUserLogin) {
    return this.httpClient.post<{token: string; user:IUser}>(this.endpointService.getEndpointUrl(this.data.url), userLogin).pipe(map((response: {token: string; user:IUser}) => ({token: response.token, user: new User(response.user)})))
  }*/
}
