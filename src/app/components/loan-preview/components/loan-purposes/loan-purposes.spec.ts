import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPurposes } from './loan-purposes';

describe('LoanPurposes', () => {
  let component: LoanPurposes;
  let fixture: ComponentFixture<LoanPurposes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanPurposes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPurposes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
