This project is a full-stack Food Delivery Web Application developed using React (Vite) for the frontend and Spring Boot for the backend, with MySQL as the database. It enables users to browse food items, manage their cart, and place orders seamlessly.

 Project Structure Overview
 Frontend (React + Vite)

The frontend is built using React and follows a modular component-based architecture.

📂 src/
assets/ → Stores images and static resources
components/ → Reusable UI components
Card.jsx → Displays food item details
Card2.jsx → Cart item with quantity controls
Nav.jsx → Navigation bar with search and cart
AuthModal.jsx → Login/Register modal
OrderHistoryPanel.jsx → Displays past orders
context/
UserContext.jsx → Manages global state (search, cart visibility)
lib/
api.js → Handles API calls to backend
foodImages.js → Manages food image mapping
pages/ → Contains main pages (like Home)
redux/
cartSlice.js → Handles cart state using Redux Toolkit
store.js → Global Redux store configuration
Category.jsx → Food category filtering
food.js → Food data (static or initial)
App.jsx → Main application component
main.jsx → Entry point of React app
⚙️ Backend (Spring Boot)

The backend is built using Spring Boot and follows a layered architecture.

📂 com.foodapp
config/
SecurityConfig.java → Spring Security configuration
CorsConfig.java → Handles cross-origin requests
DataSeeder.java → Seeds initial data into database
controller/
AuthController.java → Handles authentication APIs
FoodController.java → Manages food-related APIs
OrderController.java → Handles order operations
dto/
AuthRequest.java, AuthResponse.java → Authentication data transfer
CreateOrderRequest.java, OrderItemRequest.java → Order data
model/
AppUser.java → User entity
Food.java → Food item entity
FoodOrder.java → Order entity
FoodOrderItem.java → Order item details
repository/
AppUserRepository.java → User DB operations
FoodRepository.java → Food DB operations
FoodOrderRepository.java → Order DB operations
service/ → Business logic layer
FoodAppApplication.java → Main entry point

🔧 Tech Stack
Frontend
React.js (Vite)
Redux Toolkit
Tailwind CSS
Axios
React Icons
React Toastify
Backend
Spring Boot
Spring Security
Spring Data JPA
JWT Authentication
MySQL
