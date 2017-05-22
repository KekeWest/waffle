import { Injectable } from '@angular/core';
import { Emitter, Payload } from '../../base/index';

@Injectable()
export class SheetViewDispatcherService extends Emitter<Payload> {
}
