import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { EventEmitterBase } from '../../utils/event-emitter-base';

@Injectable()
export class SpreadSheetDispatcherService extends EventEmitterBase {
}
