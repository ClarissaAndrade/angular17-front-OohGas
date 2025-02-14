import { Category } from "./category";

export interface Product {
    id: number;
    name?: string;
    price: number;
    cost: number;
    caskPrice?: number;
    caskCost?: number;
    deliveryFee?: number;
    categoryId: number;
    category: Category;
}