import { Headers } from "@angular/http";

export class Consts {

  static API_HTTP_HEADERS = new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  });

}