import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewD3Component } from './new-d3.component';

describe('NewD3Component', () => {
  let component: NewD3Component;
  let fixture: ComponentFixture<NewD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
