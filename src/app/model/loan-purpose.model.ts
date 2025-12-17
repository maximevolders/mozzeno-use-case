export interface LoanPurposeModel {
    id: string;
    purpose: string;
    minimumAmount: number;
    purposeSplitThresholdAmount?: number;
    maximumAmount: number;
    averageAmount?: number;
    averageAmountCurrency?: string;
    averageDuration?: number;
    type: number;
    details?: string;
    links: Array<string>;
}