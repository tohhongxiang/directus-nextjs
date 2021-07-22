import { Category } from "./Category";

export interface Product {
    id: number;
    date_created: string;
    date_updated: string;
    price: number;
    sale_price: number | null;
    description: string;
    name: string;
    image: string;
    secondary_images: string[];
    categories: Category[];
    thumbnail: string;
    custom_fields: { name: string, options: string[] }[];
    seo: { [key: string]: string };
}
