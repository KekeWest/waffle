import { Injectable } from '@angular/core';
import { WaffleDispatcherService, FilesActionService, FilesAction } from "app/common/services";
import { Payload, Emitter } from "app/common/base";
import { ActivatedRoute, Params } from "@angular/router";

@Injectable()
export class FilesStoreService extends Emitter<Payload> {

  private _areas: string[] = [];

  private _activeArea: string;

  private _currentNodes: FilesAction.Node[];

  static EVENT_PREFIX: string = "FilesStoreService.";
  static GET_ALL_AREAS_EVENT: string = FilesStoreService.EVENT_PREFIX + "get-all-areas";
  static ON_UNSPECIFIED_PATH_EVENT: string = FilesStoreService.EVENT_PREFIX + "on-unspecified-path";
  static LS_EVENT: string = FilesStoreService.EVENT_PREFIX + "ls";

  constructor(
    private route: ActivatedRoute,
    private waffleDispatcherService: WaffleDispatcherService
  ) {
    super();
    this.waffleDispatcherService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesActionService.GET_ALL_AREAS_EVENT:
            this.setAreas(<FilesAction.GetAllAreas>payload.data);
            break;
          case FilesActionService.ON_UNSPECIFIED_PATH_EVENT:
            this.onUnspecifiedPath();
            break;
          case FilesActionService.LS_EVENT:
            this.setCurrentNodes(<FilesAction.LsResult>payload.data);
            break;
        }
      }
    );
  }

  get areas(): string[] {
    return this._areas;
  }

  get activeArea(): string {
    return this._activeArea;
  }

  get currentNodes(): FilesAction.Node[] {
    return this._currentNodes;
  }

  private setAreas(action: FilesAction.GetAllAreas) {
    this._areas = action.areas;
    this.emit({ eventType: FilesStoreService.GET_ALL_AREAS_EVENT });
  }

  private onUnspecifiedPath() {
    this._currentNodes = [];
    this._activeArea = null;
    this.emit({ eventType: FilesStoreService.ON_UNSPECIFIED_PATH_EVENT });
  }

  private setCurrentNodes(action: FilesAction.LsResult) {
    this._currentNodes = action.nodes;
    this.route.queryParams.subscribe((params: Params) => {
      this._activeArea = params["areaName"];
      this.emit({ eventType: FilesStoreService.LS_EVENT });
    });
  }

}
