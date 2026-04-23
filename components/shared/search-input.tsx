"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { SearchInputProps } from "@/interfaces/interface"


export function SearchInput({
  placeholder = "Search…",
  paramKey = "q",
}: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(paramKey, value)
      } else {
        params.delete(paramKey)
      }
      params.set("page", "1")
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams, paramKey]
  )

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder={placeholder}
        defaultValue={searchParams.get(paramKey) ?? ""}
        onChange={handleChange}
      />
    </div>
  )
}
