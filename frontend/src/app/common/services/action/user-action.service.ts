import { Injectable } from '@angular/core';
import { WaffleDispatcherService, UserAction } from "app/common/services";

@Injectable()
export class UserActionService {

  constructor(
    private waffleDispatcherService: WaffleDispatcherService
  ) { }

  login(userName: string, password: string) {
    var action: UserAction.Login = {
      userName: userName,
      password: password
    };

    this.waffleDispatcherService.emit({
      eventType: UserAction.LOGIN_EVENT,
      data: action
    });
  }

}
