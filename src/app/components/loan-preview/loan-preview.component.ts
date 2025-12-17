import { Component } from '@angular/core';
import { LoanPurposes } from './components/loan-purposes/loan-purposes';


@Component({
  selector: 'app-loan-preview',
  imports: [LoanPurposes],
  templateUrl: './loan-preview.component.html',
  styleUrl: './loan-preview.component.scss'
})
export class LoanPreview {}
