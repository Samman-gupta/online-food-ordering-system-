import React from 'react'

function OrderHistoryPanel({ isOpen, onClose, orders, isLoading, user }) {
  return (
    <div className={`fixed left-0 top-0 z-40 h-full w-full bg-white shadow-xl transition-all duration-500 md:w-[38vw] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className='flex h-full flex-col overflow-auto p-6'>
        <header className='mb-6 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>My Orders</h2>
            <p className='text-sm text-gray-500'>{user ? `Signed in as ${user.username}` : 'Login to see your orders'}</p>
          </div>
          <button className='text-sm font-semibold text-gray-500 hover:text-gray-700' onClick={onClose}>Close</button>
        </header>

        {isLoading ? <div className='text-lg font-semibold text-green-500'>Loading orders...</div> : null}

        {!isLoading && !orders.length ? (
          <div className='rounded-xl bg-slate-100 p-5 text-gray-600'>No orders yet for this account.</div>
        ) : null}

        {!isLoading ? (
          <div className='flex flex-col gap-4'>
            {orders.map((order) => (
              <div key={order.id} className='rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm'>
                <div className='mb-3 flex items-center justify-between'>
                  <div>
                    <div className='text-lg font-bold text-gray-800'>Order #{order.id}</div>
                    <div className='text-sm text-gray-500'>Status: {order.status}</div>
                  </div>
                  <div className='text-xl font-bold text-green-500'>Rs {order.total}/-</div>
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                  {order.items.map((item) => (
                    <div key={item.id} className='flex items-center justify-between rounded-lg bg-white px-3 py-2'>
                      <span className='font-medium text-gray-700'>{item.name} x {item.quantity}</span>
                      <span className='text-green-500'>Rs {item.price}/-</span>
                    </div>
                  ))}
                </div>

                <div className='flex items-center justify-between text-sm text-gray-600'>
                  <span>User ID: {order.userId}</span>
                  <span>Subtotal: Rs {order.subtotal}/-</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default OrderHistoryPanel
