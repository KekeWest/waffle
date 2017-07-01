import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAreasColComponent } from './files-areas-col.component';

describe('FilesAreasColComponent', () => {
  let component: FilesAreasColComponent;
  let fixture: ComponentFixture<FilesAreasColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesAreasColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAreasColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
