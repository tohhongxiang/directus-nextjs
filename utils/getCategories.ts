import { API_URL } from "../constants";

export default async function getCategories() {
    const { data } = await fetch(`${API_URL}/items/categories`).then(r => r.json())
    return data
}