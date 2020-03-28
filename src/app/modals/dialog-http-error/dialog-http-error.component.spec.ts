import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHttpErrorComponent } from './dialog-http-error.component';

describe('DialogHttpErrorComponent', () => {
  let component: DialogHttpErrorComponent;
  let fixture: ComponentFixture<DialogHttpErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHttpErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
