import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  getEndpointUrl(path: string) {
    var url = environment.baseEndpoint + path;
    return url;
  }
}
