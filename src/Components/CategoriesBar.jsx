import { Bars } from "react-loader-spinner";
import getAllData from "../APIs/getAllData.api";
import useGetAllData from "../Hooks/useGetData";
import { Link } from "react-router-dom";

export default function CategoriesBar() {

    
  const {data, isLoading} = useGetAllData('categories', () => getAllData('categories'));

    const handleCategoriesList = (e) => {
        if (e.currentTarget.nextSibling.classList.contains('h-0'))
          e.currentTarget.nextSibling.classList.replace('h-0', 'h-[600px]');
        else 
          e.currentTarget.nextSibling.classList.replace('h-[600px]', 'h-0');
      }


  return (
    <div>
          <button onClick={handleCategoriesList} className='w-full lg:hidden py-3 mb-6 font-semibold text-gray-100 bg-green-600 rounded-md'>
              <span>All Categories</span> <i className="fa-solid fa-caret-down"></i> 
          </button>

          <ul className='flex flex-col lg:flex-wrap lg:flex-row lg:gap-4 lg:justify-center h-0 lg:h-auto overflow-hidden transition-all duration-500 text-center'>
          <Link to={'/products'}>
            <li  className='py-3 hover:text-green-600 text-lg lg:text-[15px] transition-all duration-500'>
              <span className='lg:bg-green-600 lg:rounded lg:py-2 lg:px-4 lg:text-white font-normal'>All</span>
            </li> 
          </Link>

            {isLoading ? 
            <div className="pt-3">
              <Bars height="30" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>
            </div> 
            : 
            data?.data.data.map((cat, idx) => 
            <Link key={idx} to={`/products/${cat?.name}/${cat?._id}`}>
              <li  className='py-3 hover:text-green-600 text-lg lg:text-[15px] transition-all duration-500'>
                <span className='lg:bg-green-600 lg:rounded lg:py-2 lg:px-4 lg:text-white lg:font-normal'>{cat?.name}</span>
              </li>   
            </Link>)}
          </ul>

        </div> 
  )
}
