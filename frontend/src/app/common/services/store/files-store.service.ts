import { Injectable } from '@angular/core';
import { WaffleDispatcherService, FilesActionService, FilesAction } from "app/common/services";
import { Payload, Emitter } from "app/common/base";

@Injectable()
export class FilesStoreService extends Emitter<Payload> {

  private _areas: string[] = [];

  static EVENT_PREFIX: string = "FilesStoreService.";
  static GET_ALL_AREAS_EVENT: string = FilesStoreService.EVENT_PREFIX + "get-all-areas";

  constructor(
    private waffleDispatcherService: WaffleDispatcherService
  ) {
    super();
    this.waffleDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesActionService.GET_ALL_AREAS_EVENT:
            this.setAreas(<FilesAction.GetAllAreas>payload.data);
            break;
        }
      }
    );
  }

  get areas(): string[] {
    return this._areas;
  }

  setAreas(action: FilesAction.GetAllAreas) {
    this._areas = action.areas;
    this.emit({ eventType: FilesStoreService.GET_ALL_AREAS_EVENT });
  }

}
