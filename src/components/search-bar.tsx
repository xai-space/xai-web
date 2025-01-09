import { cn } from '@/lib/utils'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn("relative mb-[16px] h-[40px] flex items-center w-full")}>

      <FiSearch className={cn("text-gray-500 mr-2 absolute left-4", isFocused ? 'text-blue-400' : '')} />
      <input
        type="text"
        placeholder="Search"
        className={cn(
          'bg-[#eff3f4] rounded-full w-full pl-12 py-2',
          ' focus:border border-blue-400 focus:bg-white'
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}

export default SearchBar

