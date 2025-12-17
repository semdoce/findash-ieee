![Financial Dashboard Screenshot](https://github.com/user-attachments/assets/db447bb8-5e05-4e7a-ab55-350a68b69f2c)
# 💰 MyBudget: Financial Dashboard
## ✨ Overview

**MyBudget** is an example financial dashboard application designed to help users track their transactions and visualize their financial data through various interactive charts. It serves as a comprehensive case study demonstrating a full-stack implementation using **React** for the front-end and **Node.js/Express** for the back-end.

This project was developed as a hands-on learning experience, focusing on database structure, secure authentication, and data visualization.

## 🛠️ Technologies

- React
- Vite
- Tailwind
- Toastify
- Axios
- Jsonwebtoken
- Node.js
- Knex
- Express
- Highcharts

## 🚀 Key Features

### User Management & Security

- **Secure Authentication:** Users can **create**, **login**, and **delete** their accounts.
- **Profile Management:** Users can update their **username**, **password**, and **profile picture**.

### Financial Tracking & Data

- **Transaction CRUD:** Users can **create**, **read**, **update**, and **delete** their financial transactions (e.g., adding or subtracting cash from different payment methods like credit card, emergency account, etc.).
- **Local Database:** Sets up a local database for persistent storage of user and transaction data.
- **Profile Picture Handling:** A unique approach where the system uses a folder to store the image, with the database saving the file location for retrieval and display.

### Data Visualization & Filtering

- **Dynamic Charting:** Visualize transactions using **pie**, **bar**, or **line** graphs powered by **Highcharts**.
- **Advanced Filtering:** Users can customize the displayed data and graphs using **monthly**, **weekly**, and **categories** filters to gain detailed financial insights.

## 🛠️ Installation and Setup

### Prerequisites

To run this project locally, you will need:

- **Node.js** (version **24.11** or later)
- A compatible SQL database manager (e.g., MySQL, PostgreSQL, DBeaver)

### Step 1: Clone the Repository

```bash
git clone https://github.com/semdoce/mybudget.git
cd mybudget
```

### Step 2: Install Dependencies

Install packages for both the front-end and back-end:

```bash
# Install frontend dependencies
cd front
npm install
cd ../

# Install backend dependencies
cd back
npm install
cd ../
```

### Step 3: Configure Environment Variables

Navigate to the back folder and create a file named .env by copying the contents of .env.example. You must replace the placeholder values with your actual database credentials.

| Variable          | Example Value  | Description                                                                                                      |
| :---------------- | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| **DB_CONNECTION** | mysql          | The database driver Knex will use (e.g., mysql, mysql2, postgres, sqlite3).                                      |
| **DB_NAME**       | findashieee    | The name of your database instance.                                                                              |
| **SERVER_HOST**   | localhost      | The host for the Express server.                                                                                 |
| **SERVER_PORT**   | 3000           | The port for the Express server.                                                                                 |
| **DB_PORT**       | 3306           | The port for your database.                                                                                      |
| **DB_USER**       | root           | Your database user (e.g., root).                                                                                 |
| **DB_PASSWORD**   | 1234           | Your database password.                                                                                          |
| **JWT_KEY**       | secret_key_jwt | A secret key for JWT encryption/decryption (can be read as a "paywall checker"). Must be a strong, unique value. |

### Step 4: Run the Application

Start the back-end server first, then the front-end development server.

```bash
# Start the backend server
cd back
npm run start
```

```bash
# In a new terminal, start the frontend
cd front
npm run dev
```

The application should now be accessible in your web browser, typically at http://localhost:5173 (Vite's default port).

## 💡 Creation Process

<img width="1232" height="722" alt="image" src="https://github.com/user-attachments/assets/e1cd7649-28bf-444c-a2b3-f7c9965fcee2" />

- When we started this project we didnt knew how it would turn out. It was my very first big project, so I was about to approach it like anything I did before: just learning the tools I had to use and then coding. Well, it didnt turn out that way, besides I had to learn how to structure a database first, and learn how to work with a team. Took some months, many people helped us a lot with this, telling us new things about data security and design.

- The principal idea was to integrate React (with Vite) and Node.js to create a program that can help you with finances. Creating transactions of adding cash or subtracting it from more than one way of payment (credit card, debit card, emergency account, etc).

## 🧠 What I Learned

- wip, its a plenty of things.
-
-

## 🔮 How It Can Be Improved

- Group finances workflow (multiple people interaction).
- Allowing users to **create**, **update**, and **delete** their own transaction **categories** for better data organization.
- Shifting the filtering logic from the front-end to the back-end to optimize performance and work more efficiently with large datasets.
- Bug testing
- Reducing the ai slopped code (that will be a pain on my vacation...)
