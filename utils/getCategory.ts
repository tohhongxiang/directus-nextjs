import { API_URL } from "../constants"
import { Category } from "../types"

/**
 * Get category corresponding to `id`
 * @param id ID of category
 * @returns 
 */
export default async function getCategory(id: string): Promise<Category> {
    const { data } = await fetch(`${API_URL}/items/categories/${id}`).then(r => r.json())
    return data    
}