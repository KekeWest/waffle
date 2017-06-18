import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Emitter, Payload } from "app/common/base";
import { WaffleDispatcherService, UserActionService, UserAction } from "app/common/services";
import { environment } from "environments/environment";
import { Consts } from "app/common/base/consts";

@Injectable()
export class UserStoreService extends Emitter<Payload>{

  static EVENT_PREFIX: string = "UserStoreService.";
  static LOGIN_EVENT: string = UserStoreService.EVENT_PREFIX + "login";

  constructor(
    private http: Http,
    private waffleDispatcherService: WaffleDispatcherService
  ) {
    super();
    this.waffleDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case UserActionService.LOGIN_EVENT:
            this.login(<UserAction.Login>payload.data);
            break;
        }
      }
    );
  }

  login(action: UserAction.Login) {
    this.http.post(
      environment.apiUrlRoot + "api/login",
      JSON.stringify({
        userName: action.userName,
        password: action.password
      }),
      {
        headers: Consts.API_HTTP_HEADERS,
        withCredentials: true
      }
    ).subscribe((res: Response) => {
      if (res.ok) {
        this.emit({ eventType: UserStoreService.LOGIN_EVENT });
      }
    });
  }

}