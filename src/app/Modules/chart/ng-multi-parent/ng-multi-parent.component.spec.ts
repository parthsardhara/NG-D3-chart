import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMultiParentComponent } from './ng-multi-parent.component';

describe('NgMultiParentComponent', () => {
  let component: NgMultiParentComponent;
  let fixture: ComponentFixture<NgMultiParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMultiParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMultiParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
