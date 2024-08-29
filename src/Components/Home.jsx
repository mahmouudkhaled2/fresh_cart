import { Helmet } from 'react-helmet-async';
import CategorySlider from './CategorySlider';
import MainSlider from './MainSlider';
import RecentProducts from './RecentProducts';
const Home = () => {

  return (
    <>
          <Helmet>
            <title> Fresh Cart | Home Page </title>
          </Helmet>
      <MainSlider/>
      <CategorySlider/>
      <RecentProducts home={true}/>
    </>
  )
}

export default Home
