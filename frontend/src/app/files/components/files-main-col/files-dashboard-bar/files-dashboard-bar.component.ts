import { Component, OnInit, HostBinding } from '@angular/core';
import { FilesStoreService } from "app/common/services";
import { Payload } from "app/common/base";

@Component({
  selector: 'wf-files-dashboard-bar',
  templateUrl: './files-dashboard-bar.component.html',
  styleUrls: ['./files-dashboard-bar.component.scss']
})
export class FilesDashboardBarComponent implements OnInit {

  @HostBinding("style.display")
  display: string = "none";

  constructor(
    private filesStoreService: FilesStoreService
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.ON_UNSPECIFIED_PATH_EVENT:
            this.hide();
            break;
          case FilesStoreService.LS_EVENT:
            this.show();
            break;
        }
      }
    );
  }

  private hide() {
    this.display = "none";
  }

  private show() {
    this.display = "block";
  }

}
