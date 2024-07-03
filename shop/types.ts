export interface BillboardType {
    id: string,
    label: string,
    imageUrl:string,
}

export type Categories = Category[]

export interface Category {
    id: number,
    name: string,
    billboard: BillboardType
}

export interface Product {
    id: number;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[]
}

export interface Image {
    id: number,
    url: string;
}

export interface Size {
    id: number;
    name:string;
    value: string;
}
export interface Color {
    id: number;
    name:string;
    value: string;
}