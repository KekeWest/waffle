import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FilesActionService, FilesStoreService } from "app/common/services";
import { Payload } from "app/common/base";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'wf-files-areas',
  templateUrl: './files-areas.component.html',
  styleUrls: ['./files-areas.component.scss']
})
export class FilesAreasComponent implements OnInit, AfterViewInit {

  areas: string[] = [];

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
    this.router.navigate(['/files'], { queryParams: { areaName: areaName, path: "" } });
  }

}