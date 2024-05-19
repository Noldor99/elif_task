"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export type TRadioItem = {
  value: string
  label: string
}

interface FormRadioGroupProps {
  name: string
  radioItems: TRadioItem[]
  grid?: boolean
}

export function FormRadioGroup({
  name,
  radioItems,
  grid,
}: FormRadioGroupProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(grid ? "space-y-3" : "")}>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex", grid ? "flex-col space-y-1" : "space-x-2")}
            >
              {radioItems.map((item) => (
                <FormItem
                  key={item.value}
                  className={cn(
                    "flex items-center ",
                    grid ? "space-x-3" : "space-x-1 justify-center"
                  )}
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="text-black font-normal p-0">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
