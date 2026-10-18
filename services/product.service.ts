import axios from "axios"

export interface IProductRequest {
  name: string
  description?: string
  color?: string
  price?: number
  qty?: number
  // image_url: string
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Backend", backendUrl)
export const getAllProduct = async () => {
  const res = axios.get(`${backendUrl}/api/products`)
  return res
}

export const createProduct = async (request: IProductRequest) => {
  const res = axios.post(`${backendUrl}/api/products`, request)
  return res
}
