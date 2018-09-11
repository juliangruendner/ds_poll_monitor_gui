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
  getByTimestamp: (timestamp : string) => environment.serverUrl + `/logging?timestamp=${timestamp}`,
  downloadLogs: (timeFrom: string, timeTo: string) => environment.serverUrl + `/logging?timestamp=${timeFrom}&timestampEnd=${timeTo}&download=True`
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

  downloadLogs(timeFrom: string, timeTo: string): void {
    document.location.href = routes.downloadLogs(timeFrom, timeTo);
  }

}
