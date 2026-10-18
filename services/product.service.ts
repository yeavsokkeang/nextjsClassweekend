import axios from "axios"

export interface IProductRequest {
  name: string
  description?: string
  color?: string
  price?: number
  qty?: number
  // image_url: string
}

export const getAllProduct = async () => {
  const res = axios.get("http://localhost:3001/api/products")
  return res
}

export const createProduct = async (request: IProductRequest) => {
  const res = axios.post("http://localhost:3001/api/products", request)
  return res
}
