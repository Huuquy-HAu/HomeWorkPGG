export interface IProduct {
    id: number,
    status: string,
    currency: string,
    fundingMethod: string,
    total: number,
    order: string,
    client: string | null,
    invoice: number | null,
    createdBy: number,
    createdAt: string,
    updatedAt: string
}