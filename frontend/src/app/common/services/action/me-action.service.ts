import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { WaffleDispatcherService, MeAction, ApiService } from "app/common/services";

@Injectable()
export class MeActionService {

  static EVENT_PREFIX: string = "MeActionService.";
  static LOGIN_SUCCESS_EVENT: string = MeActionService.EVENT_PREFIX + "login.success";
  static LOGIN_FAILED_EVENT: string = MeActionService.EVENT_PREFIX + "login.failed";

  constructor(
    private apiService: ApiService,
    private waffleDispatcherService: WaffleDispatcherService
  ) { }

  login(userName: string, password: string) {
    this.apiService.post("api/login", {
      userName: userName,
      password: password
    }).subscribe(
      (res: Response) => {
        var json: MeAction.LoggedIn = res.json();
        this.waffleDispatcherService.emit({
          eventType: MeActionService.LOGIN_SUCCESS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        var json: MeAction.LoggedIn = { active: false, authorities: [] };
        this.waffleDispatcherService.emit({
          eventType: MeActionService.LOGIN_FAILED_EVENT,
          data: json
        });
      }
      );
  }

}
