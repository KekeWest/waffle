import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FilesActionService, FilesStoreService, FilesAction } from "app/common/services";
import { Payload } from "app/common/base";
import { _ } from "app";

@Component({
  selector: 'wf-files-ls',
  templateUrl: './files-ls.component.html',
  styleUrls: ['./files-ls.component.scss']
})
export class FilesLsComponent implements OnInit, AfterViewInit {

  currentNodes: FilesAction.Node[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filesActionService: FilesActionService,
    private filesStoreService: FilesStoreService
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.ON_UNSPECIFIED_PATH_EVENT:
          case FilesStoreService.LS_EVENT:
            this.setCurrentNodes();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params: Params) => {
      var areaName: string = params["areaName"];
      if (_.isEmpty(areaName)) {
        this.filesActionService.onUnspecifiedPath();
        return;
      }
      var path: string = params["path"];
      if (_.isEmpty(path) ) {
        path = "";
      }
      this.filesActionService.ls(areaName, path);
    });
  }

  private setCurrentNodes() {
    this.currentNodes = this.filesStoreService.currentNodes;
  }

}
