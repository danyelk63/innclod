import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '@models';
import { EndpointService } from '@services';

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
}
