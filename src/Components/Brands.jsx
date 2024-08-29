import Loading from "./Loding";
import useGetAllData from "../Hooks/useGetData";
import getAllData from "../APIs/getAllData.api";
import { Helmet } from 'react-helmet-async';


const Brands = () => {

  const {data, isLoading} = useGetAllData('brands', () => getAllData('brands'));

  if (isLoading) {
    return <>
    <Loading/> 
    <section className='h-svh bg-slate-100 flex items-center justify-center'></section>
    </> 
  }

  return (
    <>
        <Helmet>
          <title> Fresh Cart | Brands </title>
        </Helmet>
      <section className="py-16 px-10">
        <div className="row flex flex-wrap gap-y-5">
          {data?.data.data.map((brand, index) => 
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <div className="brand px-3 hover:scale-[0.95] transition-all duration-500 cursor-pointer ">
                <div className="flex justify-center w-[180px] h-[180px] mx-auto rounded-full overflow-hidden">
                  <img src={brand?.image} className="w-full" alt={brand?.name} />
                </div>
                <h2 className="py-3 text-2xl text-gray-600 text-center">{brand?.name}</h2>
              </div>
            </div>
        )}
        </div>
      </section>
    </>
  )
}

export default Brands