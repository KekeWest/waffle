import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { UUID } from './uuid';

interface Payload {
  eventType: string;
  data: any;
}

export abstract class EventEmitterBase {

  protected _eventSubject: Subject<Payload> = new Subject<Payload>();

  protected _subscriptions: { [id: string]: Subscription } = {};

  constructor() { }

  register(callback: (eventType: string, data: any) => void): string {
    var subscription: Subscription = this._eventSubject.asObservable()
    .subscribe((payload: Payload) => {
      callback(payload.eventType, payload.data);
    });

    var id: string = this.createId();
    this._subscriptions[id] = subscription;

    return id;
  }

  unregister(id: string) {
    var subscription: Subscription = this._subscriptions[id];
    if (subscription) {
      subscription.unsubscribe();
      delete this._subscriptions[id];
    }
  }

  unregisterAll() {
    var subscription: Subscription;
    var ids: string[] = Object.keys(this._subscriptions);
    for (var id of ids) {
      subscription = this._subscriptions[id];
      if (subscription) {
        subscription.unsubscribe();
      }
    }
    this._subscriptions = {};
  }

  emit(eventType: string, data?: any) {
    this._eventSubject.next({eventType: eventType, data: data});
  }

  protected createId(): string {
    var id: string = UUID.v4();
    while(id in this._subscriptions) {
      id = UUID.v4();
    }
    return id;
  }

}
