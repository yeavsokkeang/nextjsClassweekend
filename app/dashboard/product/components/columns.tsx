"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id?: number
  name?: string
  description?: string
  color?: string
  price?: number
  qty?: number
  createdAt?: string
  updatedAt?: string
  image_url?: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Product>()

export const columns = columnHelper.columns([
   columnHelper.accessor("image_url", {
    header: "Image",
    cell: ({row}) => {
      const imageUrl = row.getValue("image_url");
      return (<img src={imageUrl} alt="product" className="h-10 w-10 rounded-md object-cover" />)
    }
  }),
  columnHelper.accessor("id", {
    header: "Id",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("color", {
    header: "Color",
  }),
  columnHelper.accessor("price", {
    header: "Price",
  }),
  columnHelper.accessor("qty", {
    header: "Qty",
  }),
 
])