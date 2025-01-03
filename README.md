
# **Cafe & Bakery Website**

## **Project Overview**
This project is an online cafe and bakery web application developed using React, Node.js, Express, MongoDB, and Bootstrap. The platform provides a user-friendly interface for customers to browse the menu, place orders, and track their purchase history.

---

## **Features and Tech Stack**

### **Features**
- **User Features**:
  - User registration and login.
  - View and search menu items (e.g., coffee, pastries, cakes).
  - Add items to the cart and place orders.
  - Track order history.

- **Admin Features**:
  - Manage menu items (add, update, delete).
  - View and process customer orders.
  - Track order status.

---

### **Tech Stack**
- **Frontend**:
  - React.js
  - Bootstrap

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB

- **Authentication**:
  - JSON Web Tokens (JWT)

---

## **Project Structure**
The project is structured as follows:

```
/client              # React frontend application
/server              # Node.js backend application
/controllers         # Contains the business logic
/models              # Defines database schemas
/routes              # API route definitions
.gitignore           # Files and directories to ignore in Git
README.md            # This README file
```

---

## **How to Run**

### **Prerequisites**
- Node.js installed on your system.
- A MongoDB database (local or cloud).

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/cafe-bakery-website.git
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

6. Start the React development server:
   ```bash
   npm start
   ```

Access the project at `http://localhost:3000`.

---

## **Future Improvements**
- Integration with payment gateways.
- Adding user reviews and ratings for menu items.
- Real-time order status updates.

---
