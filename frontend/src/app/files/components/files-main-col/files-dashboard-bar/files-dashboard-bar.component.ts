import { Component, OnInit, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { FilesStoreService } from "app/common/services";
import { Payload } from "app/common/base";
import { ModalDirective } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { _ } from "app";
import { FilenameValidator } from "app/common/validators";

@Component({
  selector: 'wf-files-dashboard-bar',
  templateUrl: './files-dashboard-bar.component.html',
  styleUrls: ['./files-dashboard-bar.component.scss']
})
export class FilesDashboardBarComponent implements OnInit {

  @HostBinding("style.display")
  display: string = "none";

  @ViewChild('newModal')
  newModal: ModalDirective;

  @ViewChild('nameInput')
  nameInput: ElementRef;

  newModalType: string;

  createName: string = "";

  newModalForm: FormGroup;

  newModalFormErrorState: any = {
    "name": {}
  };

  constructor(
    private formBuilder: FormBuilder,
    private filesStoreService: FilesStoreService,
    private filenameValidator: FilenameValidator
  ) { }

  ngOnInit() {
    this.filesStoreService.register(
      (payload: Payload) => {
        switch (payload.eventType) {
          case FilesStoreService.ON_UNSPECIFIED_PATH_EVENT:
            this.hide();
            break;
          case FilesStoreService.LS_EVENT:
            this.show();
            break;
        }
      }
    );

    this.buildForm();
  }

  private buildForm() {
    this.newModalForm = this.formBuilder.group({
      "name": [this.createName,
        [
          this.filenameValidator.filename()
        ]
      ]
    });

    this.newModalForm.valueChanges.subscribe((data: any) => this.onNewModalFormChanged(data));
    this.onNewModalFormChanged();
  }

  private hide() {
    this.display = "none";
  }

  private show() {
    this.display = "block";
  }

  showNewModal(type: string) {
    this.newModalType = type;
    this.newModal.show();    
  }

  onShownNewModal() {
    this.nameInput.nativeElement.focus();
  }

  hideNewModal() {
    this.newModal.hide();
  }

  onHiddenNewModal() {
    this.newModalForm.reset();
  }

  onNewModalFormChanged(data?: any) {
    if (!this.newModalForm) {
      return;
    }

    for (var field in this.newModalFormErrorState) {
      this.newModalFormErrorState[field] = {};
      var control: AbstractControl = this.newModalForm.get(field);

      if (control && control.dirty && !control.valid) {
        for (var key in control.errors) {
          this.newModalFormErrorState[field][key] = true;
        }
      }
    }
  }

  onNewModalSubmit(event: Event) {
    event.preventDefault();
    this.hideNewModal();

    switch (this.newModalType) {
      case "folder":
        this.createFolder();
        break;
      case "spread-sheet":
        this.createSpreadSheet();
        break;
    }
  }

  createSpreadSheet() {

  }

  createFolder() {

  }

}
