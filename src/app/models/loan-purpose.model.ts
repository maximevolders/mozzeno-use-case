export interface LoanPurposeModel {
    id: string;
    purpose: string;
    minimum_amount: number;
    purpose_split_threshold_amount?: number;
    maximum_amount: number;
    average_amount?: number;
    average_amount_currency?: string;
    average_duration?: number;
    type: number;
    details?: string;
    links: Array<string>;
}