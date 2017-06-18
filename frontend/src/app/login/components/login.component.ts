import { Component, OnInit } from '@angular/core';
import { UserActionService } from "app/common/services";

@Component({
  selector: 'wf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: { userName: string, password: string } = {
    userName: "",
    password: ""
  };

  submitDisabled: boolean = false;

  constructor(
    private userActionService: UserActionService
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // this.submitDisabled = true;
    this.userActionService.login(this.form.userName, this.form.password);
  }

}
