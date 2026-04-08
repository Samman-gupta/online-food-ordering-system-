import React, { useContext } from 'react'
import { MdFastfood } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { dataContext } from '../context/UserContext';
import { useSelector } from 'react-redux';
function Nav() {
    let {input,setInput,setShowCart,setShowAuthModal,setAuthMode,currentUser,logout,setShowOrders}=useContext(dataContext)
    let items=useSelector(state=>state.cart)
    
  return (
    <div className='w-full min-h-[100px] flex flex-wrap justify-between items-center gap-4 px-5 py-4 md:px-8'>
      <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl'>
      <MdFastfood className='w-[30px] h-[30px] text-green-500'/>
      </div>
      <form className='h-[60px] min-w-[220px] flex-1 bg-white flex items-center px-5 gap-5 rounded-md shadow-md' onSubmit={(e)=>e.preventDefault()}>
      <IoSearch  className='text-green-500 w-[20px] h-[20px] '/>
      <input type="text" placeholder='Search Items...'  className='w-[100%] outline-none text-[16px] md:text-[20px]'  onChange={(e)=>setInput(e.target.value)} value={input}/>
      </form>
      <div className='flex items-center gap-3'>
        {currentUser ? (
          <>
            <button className='rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-md hover:bg-slate-50' onClick={() => setShowOrders(true)}>
              My Orders
            </button>
            <div className='rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-md'>
              {currentUser.name}
            </div>
            <button className='rounded-lg bg-white px-4 py-3 text-sm font-semibold text-red-500 shadow-md hover:bg-red-50' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className='rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-md hover:bg-slate-50' onClick={() => {
              setAuthMode('login')
              setShowAuthModal(true)
            }}>
              Login
            </button>
            <button className='rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-400' onClick={() => {
              setAuthMode('register')
              setShowAuthModal(true)
            }}>
              Register
            </button>
          </>
        )}
        <div className='w-[60px] h-[60px] bg-white flex justify-center items-center rounded-md shadow-xl relative cursor-pointer' onClick={()=>{
          setShowCart(true)
        }}>
          <span className='absolute top-0 right-2 text-green-500 font-bold text-[18px]'>{items.length}</span>
          <LuShoppingBag className='w-[30px] h-[30px] text-green-500 '/>
        </div>
      </div>
    </div>
  )
}

export default Nav
