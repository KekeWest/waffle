import { Injectable } from '@angular/core';
import { Emitter, Payload } from "app/base";

@Injectable()
export class SpreadSheetDispatcherService extends Emitter<Payload> {
}
