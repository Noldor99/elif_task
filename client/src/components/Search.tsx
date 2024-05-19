import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import { useDebounce } from "@/hook/useDebounce"
import { cn } from "@/lib/utils"

interface SearchProps {
  saveParam?: string[]
}

const Search = ({ saveParam }: SearchProps) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [text, setText] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce(text, 300)

  useEffect(() => {
    if (debouncedValue === undefined) return

    const params = new URLSearchParams()
    searchParams.forEach((value, key) => {
      if (saveParam && saveParam.includes(key)) {
        params.set(key, value)
      }
    })

    if (debouncedValue) {
      params.set("search", debouncedValue)
    } else {
      params.delete("search")
    }

    navigate(`${location.pathname}?${params.toString()}`, { replace: true })
  }, [debouncedValue])

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-start",
        "border border-black"
      )}
    >
      <IconSearch className="mx-2" />
      <input
        type="text"
        className={cn(
          "mt-0 w-full px-3 py-1",
          "border-none bg-transparent outline-none"
        )}
        placeholder="Search ..."
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Search
