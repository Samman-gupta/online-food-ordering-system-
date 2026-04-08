import React, { useEffect, useState } from 'react'

function AuthModal({ isOpen, mode, onClose, onLogin, onRegister, isSubmitting }) {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    setForm({
      name: '',
      username: '',
      password: ''
    })
  }, [mode, isOpen])

  if (!isOpen) {
    return null
  }

  const isRegister = mode === 'register'

  async function handleSubmit(event) {
    event.preventDefault()

    if (isRegister) {
      await onRegister(form)
      return
    }

    await onLogin({
      username: form.username,
      password: form.password
    })
  }

  function updateField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>
        <div className='mb-5 flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>{isRegister ? 'Create account' : 'Login'}</h2>
            <p className='text-sm text-gray-500'>
              {isRegister ? 'Register to place and track your own orders.' : 'Use your account to place and view orders.'}
            </p>
          </div>
          <button className='text-sm font-semibold text-gray-500 hover:text-gray-700' onClick={onClose}>Close</button>
        </div>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {isRegister ? (
            <input
              type='text'
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder='Full name'
              className='rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500'
            />
          ) : null}

          <input
            type='text'
            value={form.username}
            onChange={(event) => updateField('username', event.target.value)}
            placeholder='Username'
            className='rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500'
          />

          <input
            type='password'
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
            placeholder='Password'
            className='rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500'
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition-all hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-green-300'
          >
            {isSubmitting ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal
