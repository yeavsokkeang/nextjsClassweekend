"use client"

import React, { useState } from "react"
import { DataTable } from "./data-table"
import { columns, Product } from "./columns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProduct, getAllProduct } from "@/services/product.service"
import { toast } from "sonner"

const productSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  description: z.string().optional(),
  color: z.string().optional(),
  price: z.number().optional(),
  qty: z.number().optional(),
})

const ProductWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  })

  const products = data?.data?.data ?? []
  // const products = data?.data?.data ? data?.data?.data : []

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "",
      price: 0,
      qty: 1,
    },
  })

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast("Product created successfully")
    },
  })

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    console.log("Product:", data)

    mutation.mutate(data)

    setIsOpen(false)
    form.reset()
  }

  return (
    <div className="container mx-auto space-y-2 px-2 py-1">
      <div className="flex justify-end">
        <Button onClick={() => setIsOpen(true)}>Create</Button>
      </div>
      <DataTable columns={columns} data={products} />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>Enter product information.</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Product Name */}
            <Controller
              name="name"
              control={form.control}
              rules={{
                required: "Product name is required",
              }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter product name"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter product description"
                  />

                  <FieldDescription>
                    Provide a short description of the product.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Color */}
            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Color</FieldLabel>

                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={field.value}
                      onChange={field.onChange}
                      className="h-10 w-14 cursor-pointer p-1"
                    />

                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="#000000"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <Controller
                name="price"
                control={form.control}
                rules={{
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price cannot be negative",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>

                    <Input
                      id={field.name}
                      type="number"
                      step="0.01"
                      min={0}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(
                          event.target.value === ""
                            ? 0
                            : Number(event.target.value)
                        )
                      }
                      aria-invalid={fieldState.invalid}
                      placeholder="0.00"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Quantity */}
              <Controller
                name="qty"
                control={form.control}
                rules={{
                  required: "Quantity is required",
                  min: {
                    value: 0,
                    message: "Quantity cannot be negative",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>

                    <Input
                      id={field.name}
                      type="number"
                      min={0}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(
                          event.target.value === ""
                            ? 0
                            : Number(event.target.value)
                        )
                      }
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                Save Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductWrapper
