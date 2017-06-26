import { Component, OnInit } from '@angular/core';
import { MeStoreService } from "app/common/services";

@Component({
  selector: 'wf-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
  }

}
