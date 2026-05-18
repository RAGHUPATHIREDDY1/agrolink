# Agrolink

Agrolink is a professional agricultural marketplace built with React, Vite, Tailwind CSS, and localStorage. It simulates a full stack e-commerce platform with buyer and seller roles, category based browsing, cart and checkout flow, and seller product management.

## Features

- Buyer and seller registration/login
- Role-based protected pages
- Category pages for Fruits, Vegetables, Animals, and Machinery
- Product detail view with add to cart and wishlist support
- Cart, checkout, and order management
- Seller dashboard for inventory summaries
- Seller add product and manage listings
- LocalStorage persistence for users, products, cart, and orders
- Responsive UI with modern design

## Project structure

- `src/components/` — reusable UI components
- `src/pages/` — route page components
- `src/context/` — React Context state management
- `src/data/` — sample products data
- `src/services/` — localStorage helpers

## Run locally

1. Open a terminal in the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal.

## Notes

- This project is intentionally built using simple React and JavaScript.
- It uses localStorage to simulate backend behavior and keep the app easy to understand.
- The code is written to be resume-friendly and ready for interview demos.
