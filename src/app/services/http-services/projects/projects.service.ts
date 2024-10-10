import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject, UUID } from '@models';
import { EndpointService } from 'app/services/endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private data = {
    url: "users",
  }
  constructor(private httpClient: HttpClient, private endpointService: EndpointService) {}

  get(id?: string) {
    let url = this.endpointService.getEndpointUrl(this.data.url);
    if(id) {
      url += `/${id}`;
    }
    return this.httpClient.get<IProject[]>(url);
  }

  post(data: IProject) {
    return this.httpClient.post<IProject>(this.endpointService.getEndpointUrl(this.data.url), data);
  }

  put(data: IProject) {
    return this.httpClient.put<IProject>(this.endpointService.getEndpointUrl(this.data.url) + `/${data.id}`, data);
  }

  delete(id: UUID) {
    return this.httpClient.delete<IProject>(this.endpointService.getEndpointUrl(this.data.url) + `/${id}`);
  }
}
