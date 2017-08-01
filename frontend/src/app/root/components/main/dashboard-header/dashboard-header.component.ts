import { Component, OnInit } from '@angular/core';
import { MeStoreService, MeActionService, WaffleDispatcherService } from "app/common/services";
import { Payload } from "app/common/base";
import { Router } from "@angular/router";
import { LoadingMaskComponent } from "app/common/components/loading-mask/loading-mask.component";

@Component({
  selector: 'wf-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private waffleDispatcherService: WaffleDispatcherService,
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
    this.waffleDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "main", show: true }
    });
    this.meActionService.logout();
  }

  private afterLogout() {
    this.router.navigate(['/login']);
    this.waffleDispatcherService.emit({ 
      eventType: LoadingMaskComponent.UPDATE_STATUS_EVENT,
      data: { name: "main", show: false }
    });
  }

}
