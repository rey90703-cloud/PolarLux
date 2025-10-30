# 项目上下文信息

- Dự án: Landing Page tủ lạnh Samsung - React + Vite + TypeScript

Cấu trúc Clean Code đã áp dụng:
- types/refrigerator.types.ts: Định nghĩa interfaces type-safe
- hooks/useRefrigerators.ts: Custom hook với React Query
- data/samsung-refrigerators.json: 30 sản phẩm chia 3 categories

Navigation fixed structure:
- HeaderTop + Navigation wrap trong div fixed top-0 z-50
- Hero section: pt-[120px] md:pt-[140px] để tránh bị đè
- Background với z-0, content với z-10

Collection component:
- Tabs cho 3 categories: top-freezer, bottom-freezer, french-door
- Grid responsive: xl:grid-cols-5, lg:grid-cols-4, md:grid-cols-2
- Card hiện model, name, price, capacity, features
- Modal chi tiết với specs, dimensions, colors
- Lazy loading images

ESLint issues đã fix:
- FridgeModel3D: module augmentation thay namespace
- command.tsx, textarea.tsx: type alias thay interface
- tailwind.config.ts: import thay require
- tsconfig.app.json: resolveJsonModule: true
