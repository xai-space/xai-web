import SearchBar from '@/components/search-bar'
import FeatureFollow from '../feed/components/feature-follow'
import NewLanches from '../feed/components/new-Lanches'
import { useRouter, NextRouter } from 'next/router'

const RightAside = () => {
  const { query, pathname, asPath } = useRouter()
  console.log('query&&:', query)
  console.log('pathname&&:', pathname)
  console.log('asPath&&:', asPath)

  return (
    <div className="sticky top-[5px]">
      <SearchBar></SearchBar>
      <NewLanches></NewLanches>
      <FeatureFollow></FeatureFollow>
    </div>
  )
}
export default RightAside
