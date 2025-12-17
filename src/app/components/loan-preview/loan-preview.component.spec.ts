import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPreview } from './loan-preview.component';

describe('LoanPreview', () => {
  let component: LoanPreview;
  let fixture: ComponentFixture<LoanPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
