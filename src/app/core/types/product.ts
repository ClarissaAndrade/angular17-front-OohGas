import { Brand } from "./brand";
import { Category } from "./category";

export interface Product {
    id: number;
    name?: string;
    price: number;
    caskPrice?: number;
    deliveryFee?: number;
    categoryId: number;
    category: Category;
    brandId: number;
    brand: Brand;
    status: string;
}