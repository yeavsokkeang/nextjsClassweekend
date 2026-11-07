import axios from "axios"

export interface IProductRequest {
  name: string
  description?: string
  color?: string
  price?: number
  qty?: number
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getAllProduct = async () => {
  return axios.get(`${backendUrl}/products`) // ← not /api/products
}

export const createProduct = async (request: IProductRequest) => {
  return axios.post(`${backendUrl}/products`, request) // ← not /api/products
}
