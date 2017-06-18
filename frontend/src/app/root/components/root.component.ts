import { Component, OnInit } from '@angular/core';
import { WaffleDispatcherService, UserActionService, UserStoreService } from "app/common/services";

@Component({
  selector: 'wf-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  providers: [
    WaffleDispatcherService,
    UserActionService,
    UserStoreService
  ]
})
export class RootComponent implements OnInit {

  constructor(
    private waffleDispatcherService: WaffleDispatcherService,
    private userActionService: UserActionService,
    private userStoreService: UserStoreService
  ) { }

  ngOnInit() {
  }

}
