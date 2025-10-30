# PolarLux - Samsung Refrigerator E-commerce Website

[![GitHub](https://img.shields.io/badge/GitHub-PolarLux-blue?logo=github)](https://github.com/rey90703-cloud/PolarLux)

## Project Description

A complete e-commerce website for Samsung refrigerators featuring shopping cart, user authentication, and checkout functionality. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🛒 **30 Samsung refrigerator products** across 3 categories (Top Freezer, Bottom Freezer, French Door)
- 🛍️ **Shopping cart** with add/remove/quantity control and localStorage persistence
- 👤 **User authentication** - login/register system with form validation
- 💳 **Complete checkout flow** with customer info, address, and payment method selection
- 📱 **Responsive design** - Mobile-first approach with Tailwind CSS
- 🎨 **3D model viewer** for interactive product showcase
- 🎯 **Product filtering** by category with tabs
- 🔔 **Toast notifications** for user actions
- 💾 **LocalStorage persistence** for cart and user data

## Technologies

- **Vite** - Fast build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Hook Form + Zod** - Form validation
- **React Query** - Data fetching
- **Model Viewer** - 3D product display

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone https://github.com/rey90703-cloud/PolarLux.git

# Navigate to project directory
cd PolarLux

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```sh
# Build the project
npm run build

# Preview production build
npm run preview
```

### Linting

```sh
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Cart.tsx        # Shopping cart sidebar
│   ├── CheckoutForm.tsx # Order checkout form
│   ├── Collection.tsx  # Product display
│   ├── LoginModal.tsx  # Authentication modal
│   └── ...
├── contexts/           # React contexts
│   └── CartContext.tsx # Cart & auth state
├── hooks/              # Custom React hooks
│   └── useRefrigerators.ts
├── types/              # TypeScript type definitions
│   ├── cart.types.ts
│   ├── refrigerator.types.ts
│   └── model-viewer.d.ts
├── data/               # Static data
│   └── samsung-refrigerators.json
└── utils/              # Utility functions

```

## Features Detail

### Shopping Cart
- Add products to cart
- Update quantity (+/-)
- Remove items
- Real-time price calculation
- Cart badge showing item count
- Persistent across sessions (localStorage)

### Checkout Process
1. View cart items and total
2. Fill customer information (auto-filled if logged in)
3. Enter delivery address
4. Select payment method (COD/Bank Transfer/Credit Card)
5. Order confirmation with order ID

### User Authentication
- Register new account
- Login with email/password
- User greeting in header
- Logout functionality
- Form validation with error messages

## Data Structure

Products are loaded from `src/data/samsung-refrigerators.json` with structure:
```json
{
  "categories": [
    {
      "id": "top-freezer",
      "name": "Tủ Lạnh Ngăn Đông Trên",
      "products": [...]
    }
  ]
}
```

## Repository

**GitHub**: [https://github.com/rey90703-cloud/PolarLux](https://github.com/rey90703-cloud/PolarLux)

## Demo

Live demo available at: `http://localhost:8080` (after running `npm run dev`)

## Screenshots

### Homepage
- Hero section with 3D refrigerator model
- Product categories with tabs
- Featured Samsung products

### Shopping Cart
- Sidebar cart with product list
- Quantity controls and price calculation
- Checkout button

### Checkout
- Customer information form
- Delivery address fields
- Payment method selection
- Order confirmation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Private project - All rights reserved

## Contact

- **Email**: info@mu-fridge.com
- **GitHub**: [@rey90703-cloud](https://github.com/rey90703-cloud)

---

Made with ❤️ by PolarLux Team
