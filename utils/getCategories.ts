import { API_URL } from "../constants";
import { Category } from "../types";

/**
 * Get all available categories
 */
export default async function getCategories(): Promise<{ data: Category[] }> {
    const { data } = await fetch(`${API_URL}/items/categories`).then(r => r.json())
    return { data }
}