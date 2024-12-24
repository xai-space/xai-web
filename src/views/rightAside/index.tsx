import FeatureFollow from '../feed/components/feature-follow'
import NewLanches from '../feed/components/new-Lanches'

const RightAside = () => {
  return (
    <div className="sticky top-14 shrink-0">
      <NewLanches></NewLanches>
      <FeatureFollow></FeatureFollow>
    </div>
  )
}
export default RightAside
