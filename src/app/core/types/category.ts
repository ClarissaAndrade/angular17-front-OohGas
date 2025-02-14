import { Product } from "./product";

export interface Category {
    id: number;
    idFather?: number;
    parentCategory?: Category;
    name: string;
    subcategories: Category[];
    products?: Product[];
}
