import { Input } from '@/components/ui/input'
import { CgSearch } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
const SearchBar = () => {
  return (
    <div className="mb-10">
      <Input
        placeholder="Search"
        startIcon={
          <FiSearch size={24} className="ml-5" color={'#536471'}></FiSearch>
        }
        className="rounded-full h-[50px] text-[18px]"
      />
    </div>
  )
}

export default SearchBar
