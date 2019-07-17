import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateOperatorsComponent } from './intermediate-operators.component';

describe('IntermediateOperatorsComponent', () => {
  let component: IntermediateOperatorsComponent;
  let fixture: ComponentFixture<IntermediateOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
