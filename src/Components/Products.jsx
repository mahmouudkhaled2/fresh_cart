import RecentProducts from './RecentProducts';
import CategoriesBar from './CategoriesBar';
import { Helmet } from 'react-helmet-async';


const Products = () => {
  return (
    <>
        <Helmet>
          <title> Fresh Cart | All Products </title>
        </Helmet>
      <section className="py-16 px-5 ">
        <CategoriesBar categoriesBar={true}/>
        <RecentProducts/>
      </section>
    </>
  )
}

export default Products