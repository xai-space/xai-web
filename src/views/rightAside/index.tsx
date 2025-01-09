import SearchBar from '@/components/search-bar'
import FeatureFollow from '../feed/components/feature-follow'
import NewLanches from '../feed/components/new-Lanches'

const RightAside = () => {
  return (
    <div className="sticky top-[5px]">
      <SearchBar></SearchBar>
      <NewLanches></NewLanches>
      <FeatureFollow></FeatureFollow>
    </div>
  )
}
export default RightAside
