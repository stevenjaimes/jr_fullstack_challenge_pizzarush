
import { DeliverySection } from './DeliverySection'
import { Hero } from './Hero'
import { LocationSection } from './LocationSection'
import { PizzaList } from './PizzaList'

const Home = () => {
  return (
    <div>
      <Hero />
      <PizzaList />
      <DeliverySection />
      <LocationSection />
    </div>
  )
}

export default Home
