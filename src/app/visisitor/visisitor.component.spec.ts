import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisisitorComponent } from './visisitor.component';

describe('VisisitorComponent', () => {
  let component: VisisitorComponent;
  let fixture: ComponentFixture<VisisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
