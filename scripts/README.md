# Scripts Documentation

## Download Images Script

### Mục đích
Script này dùng để tải xuống hình ảnh sản phẩm tủ lạnh Samsung.

### Cách sử dụng

```bash
# Chạy script để download images
node scripts/download-images.js
```

### Lưu ý quan trọng

#### 1. Hình ảnh Placeholder
Hiện tại script sử dụng hình ảnh placeholder từ Unsplash (miễn phí). Để sử dụng hình ảnh chính thức của Samsung:

1. Truy cập Samsung website cho từng model
2. Mở Developer Tools (F12) → Network tab
3. Tìm URL hình ảnh chất lượng cao (thường có dạng: `images.samsung.com/is/image/samsung/...`)
4. Copy URL và cập nhật vào object `imageUrls` trong file `download-images.js`

#### 2. Các nguồn hình ảnh Samsung chính thức

**Vietnam:**
- https://www.samsung.com/vn/refrigerators/

**US:**
- https://www.samsung.com/us/home-appliances/refrigerators/

**Global:**
- https://images.samsung.com/is/image/samsung/...

#### 3. Cấu trúc URL Samsung CDN

Hình ảnh từ Samsung CDN thường có format:
```
https://images.samsung.com/is/image/samsung/{region}-{type}-{model}-{view}-{size}
```

Ví dụ:
```
https://images.samsung.com/is/image/samsung/vn-top-mount-freezer-rt38cg6784b1sv-rt38cg6784b1sv-frontblack-thumb-537205221
```

#### 4. Alternative: Manual Download

Nếu script không hoạt động, bạn có thể download thủ công:

1. Truy cập trang sản phẩm trên Samsung website
2. Right-click vào hình ảnh → "Save Image As..."
3. Lưu vào thư mục `public/images/fridges/`
4. Đặt tên file theo format: `{model-id}.jpg` (ví dụ: `rt38cg6784b1sv.jpg`)

#### 5. Kích thước hình ảnh đề xuất

- **Width**: 800-1200px
- **Height**: 1000-1500px (tỷ lệ 3:4 hoặc 2:3)
- **Format**: JPG hoặc WebP
- **Quality**: 80-90%
- **File size**: < 500KB mỗi ảnh

### Troubleshooting

**Error: ECONNREFUSED**
- Kiểm tra kết nối internet
- Có thể website chặn request tự động

**Error: 403 Forbidden**
- Website yêu cầu headers hoặc cookies
- Thử download thủ công thay vì dùng script

**Error: 404 Not Found**
- URL không còn tồn tại
- Cần cập nhật URL mới từ Samsung website

### Image Optimization

Sau khi download, nên optimize hình ảnh:

```bash
# Sử dụng ImageMagick để resize và optimize
convert input.jpg -resize 800x1000^ -quality 85 output.jpg

# Hoặc sử dụng npm package
npm install -g imagemin-cli
imagemin public/images/fridges/*.jpg --out-dir=public/images/fridges/optimized
```

### Next Steps

1. Chạy script để download placeholder images
2. Thay thế dần bằng hình ảnh chính thức từ Samsung
3. Optimize hình ảnh để tăng tốc độ load
4. Cân nhắc sử dụng WebP format cho performance tốt hơn
