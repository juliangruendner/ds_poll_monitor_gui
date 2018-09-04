import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Process } from '../models/process.model';
import {PollStatus} from '../models/pollStatus.model';

const routes = {
  getAll: () => environment.serverUrl + `/control`,
  getPollActive: environment.serverUrl + '/control?pollStatus=True' ,
  singleById: (id : number) => environment.serverUrl + `/environments/${id}`,
  base: environment.serverUrl + '/control'
};

@Injectable()
export class ControlService {

  //constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Process[]> {
    return this.httpClient.get<Process[]>(routes.getAll());
  }

  getPollActive(): Observable<PollStatus> {
    return this.httpClient.get<PollStatus>(routes.getPollActive);
  }

  startPoll(): Observable<PollStatus>{
    return this.httpClient.post<PollStatus>(routes.base,"");
  }

  stopPoll(): Observable<PollStatus>{
    return this.httpClient.delete<PollStatus>(routes.base);
  }


/*
  getSingleById(id: number): Observable<Environment> {
    return this.httpClient.get<Environment>(routes.singleById(id));
  }

  putSingle(id: number, env: Environment): Observable<Environment> {
    return this.httpClient.put<Environment>(routes.singleById(id), env);
  }

  post(env: Environment): Observable<Environment> {
    return this.httpClient.post<Environment>(routes.base, env);
  }

  delete(id: number): Observable<ID> {
    return this.httpClient.delete<ID>(routes.singleById(id));
  }
*/
}
