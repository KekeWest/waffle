import { Injectable } from '@angular/core';
import { WaffleDispatcherService, UserAction } from "app/common/services";

@Injectable()
export class UserActionService {

  static EVENT_PREFIX: string = "UserActionService.";
  static LOGIN_EVENT: string = UserActionService.EVENT_PREFIX + "login";

  constructor(
    private waffleDispatcherService: WaffleDispatcherService
  ) { }

  login(userName: string, password: string) {
    var action: UserAction.Login = {
      userName: userName,
      password: password
    };

    this.waffleDispatcherService.emit({
      eventType: UserActionService.LOGIN_EVENT,
      data: action
    });
  }

}
