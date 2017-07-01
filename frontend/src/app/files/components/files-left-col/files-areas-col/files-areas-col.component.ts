import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FilesActionService, FilesStoreService } from "app/common/services";
import { Payload } from "app/common/base";

@Component({
  selector: 'wf-files-areas-col',
  templateUrl: './files-areas-col.component.html',
  styleUrls: ['./files-areas-col.component.scss']
})
export class FilesAreasColComponent implements OnInit, AfterViewInit {

  areas: string[] = [];

  constructor(
    private filesActionService: FilesActionService,
    private filesStoreService: FilesStoreService
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.GET_ALL_AREAS_EVENT:
            this.updateAreas();
            break;
        }
      }
    );
  }

  ngAfterViewInit() {
    this.filesActionService.getAllAreas();
  }

  updateAreas() {
    this.areas = this.filesStoreService.areas;
  }

  onSelectArea(areaName: string) {
    console.log(areaName + " click!!");
  }

}
