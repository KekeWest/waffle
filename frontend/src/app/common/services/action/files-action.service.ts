import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ApiService, WaffleDispatcherService, FilesAction, ErrorActionService } from "app/common/services";

@Injectable()
export class FilesActionService {

  static EVENT_PREFIX: string = "FilesActionService.";
  static GET_ALL_AREAS_EVENT: string = FilesActionService.EVENT_PREFIX + "get-all-areas";

  constructor(
    private apiService: ApiService,
    private waffleDispatcherService: WaffleDispatcherService,
    private errorActionService: ErrorActionService
  ) { }

  getAllAreas() {
    this.apiService.get("files/all-areas").subscribe(
      (res: Response) => {
        var json: FilesAction.GetAllAreas = res.json();
        this.waffleDispatcherService.emit({
          eventType: FilesActionService.GET_ALL_AREAS_EVENT,
          data: json
        });
      },
      (error: Response) => {
        this.errorActionService.serverSystemError(error);
      }
    );
  }

}
