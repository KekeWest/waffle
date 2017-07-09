import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { WaffleDispatcherService, MeAction, ApiService, ErrorActionService } from "app/common/services";

@Injectable()
export class MeActionService {

  static EVENT_PREFIX: string = "MeActionService.";
  static LOGIN_SUCCESS_EVENT: string = MeActionService.EVENT_PREFIX + "login-success";
  static LOGIN_FAILED_EVENT: string = MeActionService.EVENT_PREFIX + "login-failed";
  static LOGOUT_EVENT: string = MeActionService.EVENT_PREFIX + "logout";
  static SYNC_STATUS_EVENT: string = MeActionService.EVENT_PREFIX + "sync-status";

  constructor(
    private apiService: ApiService,
    private waffleDispatcherService: WaffleDispatcherService,
    private errorActionService: ErrorActionService
  ) { }

  login(userName: string, password: string) {
    this.apiService.post("login", {
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

  logout() {
    this.apiService.get("logout").subscribe(
      (res: Response) => {
        this.waffleDispatcherService.emit({
          eventType: MeActionService.LOGOUT_EVENT,
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

  syncStatus() {
    this.apiService.get("me/status").subscribe(
      (res: Response) => {
        var json: MeAction.LoggedIn = res.json();
        this.waffleDispatcherService.emit({
          eventType: MeActionService.SYNC_STATUS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        var json: MeAction.LoggedIn = { active: false, authorities: [] };
        this.waffleDispatcherService.emit({
          eventType: MeActionService.SYNC_STATUS_EVENT,
          data: json
        });
      }
    );
  }

}
