import { Helmet } from 'react-helmet-async';
import errorImage from './../assets/images/error.svg'

const NotFound = () => {
  return (
    <>
      <Helmet>
          <title> Fresh Cart | Page Not Found </title>
      </Helmet>

      <section className='py-24 flex justify-center'>
        <img src={errorImage} alt="not found image" />
      </section>
    </>
  )
}

export default NotFound