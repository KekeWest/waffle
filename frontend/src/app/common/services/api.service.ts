import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  post(
    url: string, 
    jsonObject: any, 
    params?: string | URLSearchParams | {[key: string]: any | any[];} | null
    ): Observable<Response> {
    return this.http.post(
      environment.apiUrlRoot + url,
      JSON.stringify(jsonObject),
      {
        params: params,
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: true
      }
    );
  }

  get(
    url: string,
    params?: string | URLSearchParams | {[key: string]: any | any[];} | null
    ): Observable<Response> {
    return this.http.get(
      environment.apiUrlRoot + url,
      {
        params: params,
        headers: new Headers({
          'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: true
      }
    );
  }

}
