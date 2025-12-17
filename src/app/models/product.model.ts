export interface ProductModel {
    id: string;
    duration: number;
    rate: number;
    rate_apr: number;
    rate_apr_reward: number;
    reward_rate: number;
    origination_fee: number;
    origination_fee_amount?: number;
    instalment_amount: number;
    links: Array<string>;
}