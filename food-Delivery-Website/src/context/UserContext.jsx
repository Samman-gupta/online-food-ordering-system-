import React, { createContext, useEffect, useMemo, useState } from 'react'
import { food_items } from '../food'
import { getCurrentUser, getFoods, getMyOrders, registerUser } from '../lib/api'
import { resolveFoodImage } from '../lib/foodImages'

export const dataContext = createContext()
const AUTH_STORAGE_KEY = 'foodapp-auth'

function normalizeFoodItem(item) {
    return {
        id: item.id,
        food_name: item.name,
        food_category: item.category,
        food_type: item.type,
        food_quantity: 1,
        food_image: resolveFoodImage(item.image),
        image_key: item.image,
        price: item.price
    }
}

function UserContext({ children }) {
    const [foods, setFoods] = useState(food_items)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [input, setInput] = useState("")
    const [showCart, setShowCart] = useState(false)
    const [showOrders, setShowOrders] = useState(false)
    const [isLoadingFoods, setIsLoadingFoods] = useState(true)
    const [foodError, setFoodError] = useState("")
    const [authMode, setAuthMode] = useState("login")
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [isAuthSubmitting, setIsAuthSubmitting] = useState(false)
    const [authCredentials, setAuthCredentials] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [isLoadingOrders, setIsLoadingOrders] = useState(false)

    useEffect(() => {
        const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY)

        if (!savedAuth) {
            return
        }

        try {
            setAuthCredentials(JSON.parse(savedAuth))
        } catch (error) {
            localStorage.removeItem(AUTH_STORAGE_KEY)
        }
    }, [])

    useEffect(() => {
        let ignore = false

        async function loadFoods() {
            setIsLoadingFoods(true)
            setFoodError("")

            try {
                const data = await getFoods()
                if (!ignore) {
                    setFoods(data.map(normalizeFoodItem))
                }
            } catch (error) {
                if (!ignore) {
                    setFoods(food_items)
                    setFoodError("Backend not reachable. Showing local menu data.")
                }
            } finally {
                if (!ignore) {
                    setIsLoadingFoods(false)
                }
            }
        }

        loadFoods()

        return () => {
            ignore = true
        }
    }, [])

    useEffect(() => {
        let ignore = false

        async function loadAuthenticatedUser() {
            if (!authCredentials) {
                setCurrentUser(null)
                setOrders([])
                return
            }

            try {
                const user = await getCurrentUser(authCredentials)
                if (!ignore) {
                    setCurrentUser(user)
                    const userOrders = await getMyOrders(authCredentials)
                    if (!ignore) {
                        setOrders(userOrders)
                    }
                }
            } catch (error) {
                if (!ignore) {
                    setCurrentUser(null)
                    setOrders([])
                    setAuthCredentials(null)
                    localStorage.removeItem(AUTH_STORAGE_KEY)
                }
            }
        }

        loadAuthenticatedUser()

        return () => {
            ignore = true
        }
    }, [authCredentials])

    const cate = useMemo(() => {
        const searchTerm = input.trim().toLowerCase()

        return foods.filter((item) => {
            const matchesCategory = selectedCategory === "All" || item.food_category === selectedCategory
            const matchesSearch = !searchTerm || item.food_name.toLowerCase().includes(searchTerm)
            return matchesCategory && matchesSearch
        })
    }, [foods, selectedCategory, input])

    async function refreshOrders(credentials = authCredentials) {
        if (!credentials) {
            setOrders([])
            return []
        }

        setIsLoadingOrders(true)
        try {
            const userOrders = await getMyOrders(credentials)
            setOrders(userOrders)
            return userOrders
        } finally {
            setIsLoadingOrders(false)
        }
    }

    async function login(credentials) {
        setIsAuthSubmitting(true)
        try {
            const user = await getCurrentUser(credentials)
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials))
            setAuthCredentials(credentials)
            setCurrentUser(user)
            await refreshOrders(credentials)
            setShowAuthModal(false)
            return user
        } finally {
            setIsAuthSubmitting(false)
        }
    }

    async function register(payload) {
        setIsAuthSubmitting(true)
        try {
            await registerUser(payload)
            await login({
                username: payload.username,
                password: payload.password
            })
        } finally {
            setIsAuthSubmitting(false)
        }
    }

    function logout() {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        setAuthCredentials(null)
        setCurrentUser(null)
        setOrders([])
        setShowOrders(false)
    }

    const data = {
        foods,
        cate,
        input,
        setInput,
        selectedCategory,
        setSelectedCategory,
        showCart,
        setShowCart,
        showOrders,
        setShowOrders,
        isLoadingFoods,
        foodError,
        authMode,
        setAuthMode,
        showAuthModal,
        setShowAuthModal,
        isAuthSubmitting,
        currentUser,
        authCredentials,
        login,
        register,
        logout,
        orders,
        refreshOrders,
        isLoadingOrders
    }

    return (
        <dataContext.Provider value={data}>
            {children}
        </dataContext.Provider>
    )
}

export default UserContext
