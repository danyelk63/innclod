import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask, UUID } from '@models';
import { EndpointService } from 'app/services/endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private data = {
    url: "todos",
  }
  constructor(private httpClient: HttpClient, private endpointService: EndpointService) {}

  get(projectId: string) {
    let url = this.endpointService.getEndpointUrl(this.data.url);
    if(projectId) {
      url += `?userId=${projectId}`;
    }
    return this.httpClient.get<ITask[]>(url);
  }

  getOne(id: string) {
    let url = this.endpointService.getEndpointUrl(this.data.url);
    if(id) {
      url += `/${id}`;
    }
    return this.httpClient.get<ITask>(url);
  }

  post(data: ITask) {
    return this.httpClient.post<ITask>(this.endpointService.getEndpointUrl(this.data.url), data);
  }

  put(data: ITask) {
    return this.httpClient.put<ITask>(this.endpointService.getEndpointUrl(this.data.url) + `/${data.id}`, data);
  }

  delete(id: UUID) {
    return this.httpClient.delete<ITask>(this.endpointService.getEndpointUrl(this.data.url) + `/${id}`);
  }
}
