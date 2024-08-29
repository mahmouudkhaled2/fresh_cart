/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import Loading from "./Loding";
import useGetAllData from "../Hooks/useGetData";
import getAllData from "../APIs/getAllData.api";
import Item from "./Item";
import CategoriesBar from "./CategoriesBar";
import { Helmet } from 'react-helmet-async';

export default function ProInCategory() {

  const {name ,id} = useParams();

  const {data, isLoading } = useGetAllData(name, () => getAllData(`products?category=${id}`));
  
  if (isLoading) {
    return <>
      <Loading/> 
    <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
    </> 
  }
  
  return <>

        <Helmet>
          <title> Fresh Cart | Products In {name} </title>
        </Helmet>

      <section className="py-16 px-5">
      <CategoriesBar/>
        {data?.data.data.length > 0 ? <div className={`border-t-2 border-gray-300 py-16 px-7`}>
        <div className="row flex flex-wrap gap-y-6">
          {data?.data.data.map((product, index) => <Item key={index} product={product}/>)}
        </div> 
      </div> 
      : 
      <div className="pt-24 h-[435px] text-center text-gray-500 border-t-2 border-gray-300">
        <p className="text-5xl w-14 h-14 flex justify-center items-center rounded-full mx-auto mb-6 border border-gray-300">!</p>
        <p className="text-2xl">There are no products in this category yet.</p>
      </div>}
      </section>
      
  </>
}
