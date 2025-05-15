export interface ProductDTO {
    id: number;
    name?: string;
    price: number;
    caskPrice?: number;
    deliveryFee?: number;
    categoryId: number;
    brandId: number;
    status: number;
}