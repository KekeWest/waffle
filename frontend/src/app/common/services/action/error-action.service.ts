import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ApiService, WaffleDispatcherService } from "app/common/services";

@Injectable()
export class ErrorActionService {

  static EVENT_PREFIX: string = "ErrorActionService.";
  static SERVER_SYSTEM_ERROR_EVENT: string = ErrorActionService.EVENT_PREFIX + "server-system-error";

  constructor(
    private waffleDispatcherService: WaffleDispatcherService
  ) { }

  serverSystemError(res: Response) {
    console.log("server system error.");
    console.log(res);
  }

}
