import { API_URL } from "../constants"
import getCategory from "./getCategory"

export default async function getProducts() {
    let { data } = await fetch(`${API_URL}/items/products?fields=*.*`).then(r => r.json())
    data = await Promise.all(data.map(async product => ({ 
        ...product, 
        image:`${API_URL}/assets/${product.image.id}`, 
        thumbnail: `${API_URL}/assets/${product.image.id}?width=400&height=400&fit=inside`,
        secondary_images: product.secondary_images.map(image => `${API_URL}/assets/${image.directus_files_id}?width=400&height=400&fit=inside`),
        categories: (await Promise.all(product.categories.map(category => getCategory(category.categories_id)))).map((category: any) => category.name)
    })))

    return data
}

// get all products who has includes categories_id = 4
// http://localhost:8055/items/products?filter[categories][categories_id][_in]=4