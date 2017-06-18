import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {

  private httpHeaders: Headers = new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  });

  constructor(
    private http: Http
  ) { }

  post(url: string, jsonObject: any): Observable<Response> {
    return this.http.post(
      environment.apiUrlRoot + url,
      JSON.stringify(jsonObject),
      {
        headers: this.httpHeaders,
        withCredentials: true
      }
    );
  }

}
