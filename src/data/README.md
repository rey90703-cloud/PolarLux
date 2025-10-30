# Samsung Refrigerator Data

## Tổng quan

File `samsung-refrigerators.json` chứa dữ liệu chi tiết của **30 sản phẩm** tủ lạnh Samsung, được phân thành 3 danh mục:

### 📊 Cấu trúc dữ liệu

```
samsung-refrigerators.json
├── categories (3 danh mục)
│   ├── Top Freezer (RT Series) - 10 sản phẩm
│   ├── Bottom Freezer (RB Series) - 10 sản phẩm
│   └── French Door (RF Series) - 10 sản phẩm
└── metadata (thông tin version, ngày cập nhật)
```

---

## 🔖 Danh mục sản phẩm

### 1. Tủ Lạnh Ngăn Đông Trên (Top Freezer - RT Series)
- **Số lượng:** 10 sản phẩm
- **Dung tích:** 208L - 620L
- **Giá:** 6.290.000đ - 19.990.000đ
- **Đặc điểm:** Thiết kế truyền thống, tiết kiệm không gian, phù hợp mọi gia đình

**Models:**
- RT38CG6784B1SV - Bespoke AI 382L
- RT62K7011BS - Twin Cooling Plus 620L
- RT31CG5020S9 - All-Around Cooling 305L
- RT22M4032BU - Digital Inverter 243L
- RT20HAR8DBU - Digital Inverter 216L
- RT18M6213SR - Twin Cooling Plus 510L
- RTF380G - All-Around Cooling 208L
- RT16A6195SR - All-Around Cooling 441L
- RT6300D - AI Energy Mode 521L
- RT58K7000S8 - Twin Cooling Plus 580L

### 2. Tủ Lạnh Ngăn Đông Dưới (Bottom Freezer - RB Series)
- **Số lượng:** 10 sản phẩm
- **Dung tích:** 307L - 458L
- **Giá:** 11.990.000đ - 21.990.000đ
- **Đặc điểm:** Tiện lợi, dễ tiếp cận thực phẩm tươi, thiết kế hiện đại

**Models:**
- RB16DG6000SL - Counter Depth 453L
- RB10FSR4ESR - Digital Inverter 320L
- RB34C675EB1 - SpaceMax 340L Smart
- RB12A300631 - Bespoke 340L Matte Grey
- RB6000D - SpaceMax 458L Refined Inox
- RB30N4180S8 - All-Around Cooling 307L
- RB38T775CB1 - SpaceMax 385L Smart
- RB33N300NSA - No Frost 328L
- RB37J5000SA - Twin Cooling Plus 367L
- RB31FDRNDSA - No Frost 310L Classic

### 3. Tủ Lạnh 4 Cánh (French Door / Multi-Door - RF Series)
- **Số lượng:** 10 sản phẩm
- **Dung tích:** 466L - 850L
- **Giá:** 35.990.000đ - 84.990.000đ
- **Đặc điểm:** Cao cấp, dung tích lớn, nhiều tính năng thông minh

**Models:**
- RF29DB9900QD - Bespoke 4-Door Flex 820L AI Family Hub+
- RF65DG9H0EB1 - French AI 636L Family Hub
- RF28T5F01SR - 36" Family Hub 793L
- RF31CG7400SR - 30 cu.ft Mega Capacity 4 Loại Đá
- RF23DB9600QL - Bespoke 4-Door Flex 651L Beverage Center
- RF48A4010B4 - French Door 466L Twin Cooling Plus
- RS64T5F01B4 - Side-by-Side Family Hub 641L
- RF24BB6200 - 4-Door French 597L Triple Cooling
- RF29DB9700QL - Bespoke 4-Door Flex 820L Beverage Zone
- RF23DB9700QL - Bespoke Counter Depth 651L

---

## 📦 Cấu trúc dữ liệu mỗi sản phẩm

```typescript
{
  id: string;                    // Model ID
  modelName: string;             // Tên model chính thức
  name: string;                  // Tên sản phẩm tiếng Việt
  capacity: number;              // Dung tích (số)
  capacityUnit: string;          // Đơn vị (L)
  image: string;                 // Đường dẫn hình ảnh
  description: string;           // Mô tả ngắn
  price: number;                 // Giá (VNĐ)
  priceFormatted: string;        // Giá định dạng
  energyRating: string;          // Đánh giá năng lượng
  color: string[];               // Màu sắc có sẵn
  specs: string[];               // Thông số kỹ thuật (8-10 items)
  features: string[];            // Tính năng nổi bật (4-6 items)
  dimensions: {                  // Kích thước (mm)
    width: number;
    height: number;
    depth: number;
  }
}
```

---

## 💻 Cách sử dụng trong React

### 1. Import dữ liệu

```typescript
import refrigeratorsData from '@/data/samsung-refrigerators.json';

const { categories, metadata } = refrigeratorsData;
```

### 2. Ví dụ component hiển thị danh sách

```tsx
import { useState } from 'react';
import refrigeratorsData from '@/data/samsung-refrigerators.json';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('top-freezer');
  
  const category = refrigeratorsData.categories.find(
    cat => cat.id === selectedCategory
  );
  
  return (
    <div>
      <h2>{category?.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {category?.products.map(product => (
          <div key={product.id} className="card">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-xl font-bold">{product.priceFormatted}</p>
            <button>Xem chi tiết</button>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. Ví dụ filter và search

```tsx
const [searchTerm, setSearchTerm] = useState('');
const [priceRange, setPriceRange] = useState([0, 100000000]);

const filteredProducts = category?.products.filter(product => 
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  product.price >= priceRange[0] &&
  product.price <= priceRange[1]
);
```

### 4. Ví dụ hiển thị chi tiết sản phẩm

```tsx
const ProductDetail = ({ productId }: { productId: string }) => {
  const product = refrigeratorsData.categories
    .flatMap(cat => cat.products)
    .find(p => p.id === productId);
  
  if (!product) return <div>Không tìm thấy sản phẩm</div>;
  
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      
      <div>
        <h3>Thông số kỹ thuật</h3>
        <ul>
          {product.specs.map((spec, idx) => (
            <li key={idx}>{spec}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3>Tính năng nổi bật</h3>
        <div className="flex gap-2">
          {product.features.map((feature, idx) => (
            <span key={idx} className="badge">{feature}</span>
          ))}
        </div>
      </div>
      
      <div>
        <h3>Kích thước</h3>
        <p>
          {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm
        </p>
      </div>
    </div>
  );
};
```

---

## 🔍 TypeScript Types

Tạo file `types/refrigerator.ts`:

```typescript
export interface Refrigerator {
  id: string;
  modelName: string;
  name: string;
  capacity: number;
  capacityUnit: string;
  image: string;
  description: string;
  price: number;
  priceFormatted: string;
  energyRating: string;
  color: string[];
  specs: string[];
  features: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  series: string;
  products: Refrigerator[];
}

export interface RefrigeratorData {
  categories: Category[];
  metadata: {
    version: string;
    lastUpdated: string;
    currency: string;
    brand: string;
    country: string;
    totalProducts: number;
    description: string;
  };
}
```

---

## 🎨 Hình ảnh

Tất cả hình ảnh sản phẩm được lưu tại:
```
public/images/fridges/{model-id}.jpg
```

Ví dụ:
- `public/images/fridges/rt38cg6784b1sv.jpg`
- `public/images/fridges/rb16dg6000sl.jpg`
- `public/images/fridges/rf29db9900qd.jpg`

**Lưu ý:** Hiện đang sử dụng placeholder images. Xem `public/images/fridges/README.md` để biết cách thay thế bằng hình ảnh chính thức.

---

## 📝 Cập nhật dữ liệu

Khi cần cập nhật hoặc thêm sản phẩm mới:

1. Edit file `samsung-refrigerators.json`
2. Follow cấu trúc dữ liệu hiện có
3. Thêm hình ảnh tương ứng vào `public/images/fridges/`
4. Update `metadata.lastUpdated` và `metadata.totalProducts`

---

## 🚀 Next Steps

- [ ] Tạo component ProductGrid để hiển thị danh sách
- [ ] Tạo component ProductDetail để hiển thị chi tiết
- [ ] Implement filter và search functionality
- [ ] Add sorting options (giá, dung tích, đánh giá)
- [ ] Implement product comparison feature
- [ ] Add to wishlist/favorites
- [ ] Integrate với backend API (nếu có)
- [ ] Setup SEO cho từng sản phẩm

---

**Version:** 1.0  
**Last Updated:** 2025-01-31  
**Total Products:** 30
