"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

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

const columnHelper = createColumnHelper<DataTableFeatures, Product>()

export const columns = columnHelper.columns([
  columnHelper.accessor("image_url", {
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image_url") as string | null | undefined

      // only render <img> for real URLs (http... or /...)
      const isValid =
        !!imageUrl && (imageUrl.startsWith("http") || imageUrl.startsWith("/"))

      return isValid ? (
        <img
          src={imageUrl}
          alt="product"
          className="h-10 w-10 rounded-md object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-md bg-muted" />
      )
    },
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
