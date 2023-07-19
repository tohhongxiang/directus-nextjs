import { serialize } from ".";
import { API_URL } from "../constants";
import { Category } from "../types";

/**
 * Get all available categories
 */
export default async function getCategories<T extends { [key: string]: any }>(query = {} as T): Promise<{ data: Category[], meta: { filter_count: number } }> {
    const allParams = {
        meta: 'filter_count',
        ...query
    }
    let { data, meta } = await fetch(`${API_URL}/items/categories?${serialize(allParams)}`).then(r => r.json())

    if (!data) {
        data = []
    }

    if (!meta) {
        meta = { filter_count: 0 }
    }

    return { data, meta }
}