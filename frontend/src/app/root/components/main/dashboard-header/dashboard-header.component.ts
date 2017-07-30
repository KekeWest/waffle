import { Component, OnInit } from '@angular/core';
import { MeStoreService, MeActionService } from "app/common/services";
import { Payload } from "app/common/base";
import { Router } from "@angular/router";

@Component({
  selector: 'wf-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private meActionService: MeActionService,
    private meStoreService: MeStoreService
  ) { }

  ngOnInit() {
    this.meStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case MeStoreService.LOGOUT_EVENT:
            this.afterLogout();
            break;
        }
      }
    );
  }

  isActive(): boolean {
    return this.meStoreService.active;
  }

  onLogout() {
    this.meActionService.logout();
  }

  private afterLogout() {
    this.router.navigate(['/login']);
  }

}
