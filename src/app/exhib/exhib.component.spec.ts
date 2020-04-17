import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibComponent } from './exhib.component';

describe('ExhibComponent', () => {
  let component: ExhibComponent;
  let fixture: ComponentFixture<ExhibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
