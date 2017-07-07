import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FilesActionService, FilesStoreService, FilesAction } from "app/common/services";
import { Payload } from "app/common/base";
import { _, moment } from "app";

@Component({
  selector: 'wf-files-ls',
  templateUrl: './files-ls.component.html',
  styleUrls: ['./files-ls.component.scss']
})
export class FilesLsComponent implements OnInit, AfterViewInit {

  showFileList: boolean = false;

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
            this.hideFileList();
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

  private hideFileList() {
    this.showFileList = false;
    this.currentNodes = this.filesStoreService.currentNodes;
  }

  private setCurrentNodes() {
    this.currentNodes = this.filesStoreService.currentNodes;
    if (this.currentNodes.length > 0) {
      this.showFileList = true;
    }
  }

  isFile(node: FilesAction.Node): boolean {
    if (node.type === "file") {
      return true;
    } else {
      return false;
    }
  }

  isDirectory(node: FilesAction.Node): boolean {
    if (node.type === "directory") {
      return true;
    } else {
      return false;
    }
  }

  getNextDirParam(node: FilesAction.Node): {areaName: string, path: string} {
    var path: string;
    if (this.filesStoreService.currentPath === "/") {
      path = "/" + node.name;
    } else {
      path = this.filesStoreService.currentPath + "/" + node.name
    }

    return {
      areaName: this.filesStoreService.currentArea,
      path: path
    };
  }

}
