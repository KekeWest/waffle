import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Emitter, Payload } from "app/common/base";
import { WaffleDispatcherService, MeActionService, MeAction } from "app/common/services";

@Injectable()
export class MeStoreService extends Emitter<Payload>{

  static EVENT_PREFIX: string = "MeStoreService.";
  static LOGIN_SUCCESS_EVENT: string = MeStoreService.EVENT_PREFIX + "login.success";
  static LOGIN_FAILED_EVENT: string = MeStoreService.EVENT_PREFIX + "login.failed";

  private _active: boolean = false;
  private _authorities: string[] = [];

  constructor(
    private waffleDispatcherService: WaffleDispatcherService
  ) {
    super();
    this.waffleDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeActionService.LOGIN_SUCCESS_EVENT:
          case MeActionService.LOGIN_FAILED_EVENT:
            this.login(<MeAction.LoggedIn>payload.data);
            break;
        }
      }
    );
  }

  get active(): boolean {
    return this._active;
  }

  get authorities(): string[] {
    return this._authorities;
  }

  login(action: MeAction.LoggedIn) {
    this._active = action.active;
    this._authorities = action.authorities;
    if (this._active) {
      this.emit({ eventType: MeStoreService.LOGIN_SUCCESS_EVENT })
    } else {
      this.emit({ eventType: MeStoreService.LOGIN_FAILED_EVENT })
    }
  }

}
