import { Category } from "./Category";

export interface Product {
    id: number;
    date_created: string;
    date_updated: string;
    price: number;
    description: string;
    name: string;
    image: string;
    secondary_images: string[];
    categories: Category[];
    thumbnail: string;
    options: { [key:string]: string }
}
