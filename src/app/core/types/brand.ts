import { Product } from "./product";

export interface Brand {
    id: number;
    nickName: string;
    legalName: string;
    cnpj: string;
    city: string;
    distance: number;
    products?: Product[];
}
