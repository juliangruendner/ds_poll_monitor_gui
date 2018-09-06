import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { AuthenticationService } from '../core/authentication/authentication.service';
import { environment } from '../../environments/environment';
import { Request } from '../models/request.model';


const routes = {
  getAll: () => environment.serverUrl + `/logging`,
  base: environment.serverUrl + '/logging',
  getByTimestamp: (timestamp : string) => environment.serverUrl + `/logging?timestamp=${timestamp}`
};

@Injectable()
export class RequestsService {

  //constructor(private httpClient: HttpClient, private authService : AuthenticationService) { }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Request[]> {
    return this.httpClient.get<Request[]>(routes.getAll());
  }

  getByTimestamp(timestamp: string): Observable<Request[]> {
    return this.httpClient.get<Request[]>(routes.getByTimestamp(timestamp));
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
