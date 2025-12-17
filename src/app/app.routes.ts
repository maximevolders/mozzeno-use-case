import { Routes } from '@angular/router';
import { LoanPreview } from './components/loan-preview/loan-preview.component';

export const routes: Routes = [
    {
        path: 'borrowing',
        component: LoanPreview
    }
];
