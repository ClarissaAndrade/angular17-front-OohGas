export interface CategoryDTO {
    id: number;
    name: string;
    idFather?: number | null;
}