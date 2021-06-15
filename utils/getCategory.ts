import { API_URL } from "../constants"

export default async function getCategory(id: string) {
    const { data } = await fetch(`${API_URL}/items/categories/${id}`).then(r => r.json())
    return data    
}