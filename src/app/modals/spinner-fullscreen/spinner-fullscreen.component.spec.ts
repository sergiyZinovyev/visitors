import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerFullscreenComponent } from './spinner-fullscreen.component';

describe('SpinnerFullscreenComponent', () => {
  let component: SpinnerFullscreenComponent;
  let fixture: ComponentFixture<SpinnerFullscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerFullscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
