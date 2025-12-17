"use client"

import { SearchIcon, X } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useSearchParam } from "@/hooks/use-search-param"
import styles from "../../components/ui/SearchInput.module.css"

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam()
  const [value, setValue] = useState(search)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(value)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setValue("")
    setSearch("")
    inputRef.current?.blur()
  }

  // Handle Ctrl + K or Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className={styles.inputContainer}>
      <div className={styles.shadowInput} />

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button className={styles.inputButton} type="submit">
          <SearchIcon className="w-5 h-5 text-black" />
        </button>

        <input
          ref={inputRef}
          name="search"
          className={styles.inputSearch}
          placeholder={value ? value : "Search (Ctrl + K)"}
          value={value}
          onChange={handleChange}
        />

        {value && (
          <button
            type="button"
            className="[&_svg]:size-5"
            onClick={handleClear}
          >
            <X className="w-3 h-3 text-black [&_svg]:size-5" />
          </button>
        )}
      </form>
    </div>
  )
}
