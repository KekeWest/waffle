import { Injectable } from '@angular/core';
import { Client, over, Message } from "stompjs";
import { ActivatedRoute, Params } from "@angular/router";
import { _ } from "app";
import { SpreadSheetActionService } from "app/spread-sheet/services";
import { SpreadSheet } from "app/spread-sheet";

@Injectable()
export class SharedEditApiService {

  static WEBSOCKET_ROOT: string = "/ws";
  static TOPIC: string = "/topic/shared-edit/";
  static USER_TOPIC: string = "/user" + SharedEditApiService.TOPIC;
  static CONTROL_TOPIC: string = "/topic/shared-edit/control/";
  static USER_CONTROL_TOPIC: string = "/user" + SharedEditApiService.CONTROL_TOPIC;
  static API_ROOT: string = "/api/shared-edit/";

  private nodeId: string;

  private spreadSheetLoaded: boolean = false;

  private socket: WebSocket;

  private stompClient: Client;

  private controlMethodHandler: { [methodName: string]: (message: Message) => void };

  constructor(
    private route: ActivatedRoute,
    private spreadSheetActionService: SpreadSheetActionService
  ) {
    this.controlMethodHandler = {
      setEditUsers: this.setEditUsers,
      getSpreadSheet: this.getSpreadSheet
    };
  }

  start() {
    this.route.queryParams.subscribe((params: Params) => {
      this.nodeId = params["id"];
      if (_.isEmpty(this.nodeId)) {
        return;
      }

      this.socket = new WebSocket("ws://localhost:8080" + SharedEditApiService.WEBSOCKET_ROOT);
      this.stompClient = over(this.socket);
      this.stompClient.connect(null, null, () => {
        this.join();
      });
    });
  }

  close() {
    this.stompClient.disconnect(() => {
      this.socket.close();
    });
  }

  private join() {
    this.stompClient.subscribe(SharedEditApiService.CONTROL_TOPIC + this.nodeId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["method"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(SharedEditApiService.USER_CONTROL_TOPIC + this.nodeId, (message: Message) => {
      var method: (message: Message) => void = this.controlMethodHandler[message.headers["method"]];
      if (method) {
        method.call(this, message);
      }
    });
    this.stompClient.subscribe(SharedEditApiService.TOPIC + this.nodeId, (message: Message) => {
      console.log(message.body);
    });

    this.stompClient.send(SharedEditApiService.API_ROOT + "join/" + this.nodeId);
  }

  private setEditUsers(message: Message) {
    if (!this.spreadSheetLoaded) {
      this.requestSpreadSheet();
      this.spreadSheetLoaded = true;
    }
  }

  private requestSpreadSheet() {
    this.stompClient.send(SharedEditApiService.API_ROOT + "/get-spreadsheet/" + this.nodeId);
  }

  private getSpreadSheet(message: Message) {
    var spreadSheet: SpreadSheet = new SpreadSheet().fromJSON(JSON.parse(message.body));
    this.spreadSheetActionService.setSpreadSheet(spreadSheet);
  }

}
