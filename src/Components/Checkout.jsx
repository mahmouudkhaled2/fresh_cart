import { Helmet } from 'react-helmet-async';
import PaymentModal from './PaymentModal';


export default function Checkout() {
  return (
    <>
        <Helmet>
          <title> Fresh Cart | Checkout </title>
        </Helmet>
      <section className="py-16 px-5 h-svh flex flex-col justify-center items-center">
          <h2 className="mb-5 text-gray-700 text-2xl">Choose The Payment Method !</h2>
          <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">

                  <PaymentModal btnTitle={'Cash Payment'} inputId={{details:'detailCash', phone:'phoneCash', city:'cityCash'}} paymentType={'cash'} modalId={'cash-payment-modal'}/>

                  <PaymentModal btnTitle={'Online Payment'} inputId={{details:'detailOnline', phone:'phoneOnline', city:'cityOnline'}} paymentType={'online'} modalId={'online-payment-modal'}/>
          </div>
      </section>
    </>
  )
}
