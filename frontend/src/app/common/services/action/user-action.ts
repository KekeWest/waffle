export module UserAction {

  const EVENT_PREFIX: string = "UserAction.";
  export const LOGIN_EVENT: string = EVENT_PREFIX + "login";

  export interface Login {
    userName: string;
    password: string;
  }

}