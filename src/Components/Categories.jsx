import Loading from "./Loding"
import { Link } from "react-router-dom";
import useGetAllData from "./../Hooks/useGetData";
import getAllData from "../APIs/getAllData.api";
import { Helmet } from 'react-helmet-async';

const Categories = () => {

  const {data, isLoading} = useGetAllData('categories', () => getAllData('categories'));
  
  if (isLoading) {
    return <>
    <Loading/> 
    <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
    </> 
  }
  
  return (
    <>
        <Helmet>
          <title> Fresh Cart | Categories </title>
        </Helmet>
      <section className="py-16 px-10">
        <div className="row flex flex-wrap gap-y-5">
          {data?.data.data?.map((cat, index) => 
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg overflow-hidden">
                  <Link to={`${cat?.name}/${cat?._id}`}>
                      <div className="category px-3 hover:scale-[0.95] transition-all duration-500 cursor-pointer">
                        <img src={cat?.image} className="w-full h-[300px] rounded-t-lg" alt={cat?.name} />
                        <h2 className="py-3 text-2xl text-gray-600 text-center">{cat?.name}</h2>
                      </div>
                  </Link>
          </div>
        )}
        </div>
      </section>
    </>
  )
}

export default Categories;