export default function MenuItem() {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md duration-300 hover:shadow-black/25">
            <div className='text-center'>
                <img src="/pizza.png" alt="pizza" className="max-h-auto max-h-24 block mx-auto" />
            </div>
            <h4 className='font-semibold my-3'>Pepperoni Pizza</h4>
            <p className='text-gray-500 text-sm'>helosdkjbckj FIUHIEWF EFFE FEFIUEFOEF QEFGE   QF     </p>
            <button className="bg-primary mt-4 rounded-full text-white px-8 py-2">Add to cart</button>
        </div>
    )
}