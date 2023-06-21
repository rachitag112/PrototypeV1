import React from 'react'

export default function ComingSoon() {
  return (
    <div className='p-8 flex items-center justify-center text-white w-full relative border-t'>
      <div className='rounded-lg shadow-md'>
        <div className='text-white '>
          <div className='flex flex-col items-center justify-center'>
            <div className='absolute -top-4 text-center bg-[#0F0E13]'><p className='text-2xl text-[#0ea5e9]'>Coming Soon</p></div>
            <div className='flex justify-around'>
              <div className='m-4 flex flex-col items-center'> 
               
                <p className='text-center'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli</p>
              </div>
              <div className='m-4 flex flex-col items-center'>
                
                <p className='text-center'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli</p>
              </div>
              <div className='m-4 flex flex-col items-center'>
              
                <p className='text-center'>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli</p>
              </div>
            </div>
            <div className='text-center w-[80%] mt-4'>
              <input className='w-full rounded-md bg-gray-900 border border-black text-center m-4 h-10' type='text' placeholder='Type Your NFT URL Here' />
              <button className='text-[#0ea5e9] bg-gray-800 items-center px-3 py-2 text-lg font-medium text-center  hover:bg-[#0ea5e9] hover:text-gray-800'
              disabled="true"
              >
                Buy Now Pay Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
