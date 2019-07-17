import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceOperatorsComponent } from './advance-operators.component';

describe('AdvanceOperatorsComponent', () => {
  let component: AdvanceOperatorsComponent;
  let fixture: ComponentFixture<AdvanceOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
