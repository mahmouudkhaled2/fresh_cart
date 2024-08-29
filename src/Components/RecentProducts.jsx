/* eslint-disable react/prop-types */
import getAllData from "../APIs/getAllData.api";
import useGetAllData from "../Hooks/useGetData";
import Item from "./Item"
import Loading from "./Loding";


export default function RecentProducts({home}) {

    const {data, isLoading} = useGetAllData('products', () => getAllData('products?limit=50'));

    if (isLoading) {
      return <>
      <Loading/> 
      <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
      </> 
    }
    
  return (
    <section className={`${home? 'py-5' : 'py-10'} px-7`}>
      {home && <h2 className="text-3xl font-light text-gray-700 px-3 pb-5">Recent Products</h2>}
        <div className="row flex flex-wrap gap-y-6">
          {data?.data.data.map(product => {
            return <Item key={product.id} product={product}/>
          })}
        </div> 
      </section>
  )
}
