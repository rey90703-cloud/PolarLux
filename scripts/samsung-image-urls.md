# Samsung Product Image URLs

## URL Pattern Discovery

Từ việc phân tích Samsung Vietnam website, đã tìm thấy pattern URLs:

### Pattern chính:
```
https://images.samsung.com/is/image/samsung/p6pim/{region}/{model}/gallery/{detailed-info}?$SIZE$
```

### Sizes available:
- `$216_216_PNG$` - Thumbnail size
- `$684_547_PNG$` - Medium size  
- `$1300_1038_PNG$` - Large size
- `$ORIGIN_PNG$` - Original size

### Example URLs Found:

#### Top Mount Freezer (RT Series):
```
https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cb668422sv/gallery/vn-top-mount-freezer-bespoke-design-472512-rt38cb668422sv-thumb-547910135?$684_547_PNG$
```

#### Product List Images:
```
https://images.samsung.com/is/image/samsung/assets/vn/refrigerators/PC_MO_RT47CB66868ASV.png?$ORIGIN_PNG$
https://images.samsung.com/is/image/samsung/assets/vn/refrigerators/PC_MO_RB27N4010BUSV.png?$ORIGIN_PNG$
https://images.samsung.com/is/image/samsung/assets/vn/refrigerators/PC_MO_RS90F65D2FSV.png?$ORIGIN_PNG$
https://images.samsung.com/is/image/samsung/assets/vn/refrigerators/PC_MO_RF65DB990012SV.png?$ORIGIN_PNG$
```

## How to Find Specific Product Images:

### Method 1: Browse Samsung Website
1. Go to https://www.samsung.com/vn/refrigerators/all-refrigerators/
2. Filter by category (Top Mount, Bottom Mount, 4-Door, Side-by-Side)
3. Click on product
4. Open DevTools (F12) → Network tab
5. Look for image requests starting with `https://images.samsung.com/is/image/samsung/`

### Method 2: Direct URL Construction
For model code (e.g., RT38CB668422SV):
```
https://images.samsung.com/is/image/samsung/p6pim/vn/{lowercase-model}/gallery/vn-{product-type}-{model-with-dashes}-frontblack-{id}?$684_547_PNG$
```

### Method 3: Product Listing Images
```
https://images.samsung.com/is/image/samsung/assets/vn/refrigerators/PC_MO_{MODEL}.png?$ORIGIN_PNG$
```

## Discovered URLs (Samsung VN):

### Top Mount Freezer Models Found:

**RT38CB668422SV** (Tủ Lạnh Bespoke AI Đông Trên 385L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/rt6300c-top-mount-freezer-bespoke-design-385l-clean-black-rt38cb668422sv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cb668422sv/gallery/vn-top-mount-freezer-bespoke-design-472512-rt38cb668422sv-547910134?$1300_1038_PNG$
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cb668422sv/gallery/vn-top-mount-freezer-bespoke-design-472512-rt38cb668422sv-547910119?$684_547_PNG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cb668422sv/gallery/vn-top-mount-freezer-bespoke-design-472512-rt38cb668422sv-547910120?$684_547_PNG$

**RT31CG5424B1SV** (Tủ Lạnh Ngăn Đông Trên với Ngăn 4 Chế Độ Optimal Fresh+ 305L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/rt5300c-top-mount-freezer-spacemax-305l-black-rt31cg5424b1sv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cg5424b1sv/gallery/vn-top-mount-freezer-spacemax-rt31cg5424b1sv-536303517?$1300_1038_PNG$
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cg5424b1sv/gallery/vn-top-mount-freezer-spacemax-rt31cg5424b1sv-536303504?$684_547_PNG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cg5424b1sv/gallery/vn-top-mount-freezer-spacemax-rt31cg5424b1sv-536303505?$684_547_PNG$

**RT31CB56248ASV** (Tủ Lạnh Bespoke AI Đông Trên 305L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/rt5300c-top-mount-freezer-bespoke-305l-rt31cb56248asv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cb56248asv/gallery/vn-top-mount-freezer-bespoke-rt31cb56248asv-536476427?$1300_1038_PNG$

**RT47CB66868ASV** (Tủ Lạnh Bespoke AI Đông Trên 460L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/rt6300c-top-mount-freezer-bespoke-design-460l-rt47cb66868asv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt47cb66868asv/gallery/vn-top-mount-freezer-bespoke-design-453404-rt47cb66868asv-536331957?$1300_1038_PNG$

**RT38CG6584B1SV** (Tủ Lạnh Ngăn Đông Trên với Ngăn Lấy Nước Ngoài 382L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/rt5300c-smartthings-ai-energy-mode-382l-black-rt38cg6584b1sv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cg6584b1sv/gallery/vn-top-mount-freezer-smartthings-ai-energy-mode-455269-rt38cg6584b1sv-536331765?$1300_1038_PNG$
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cg6584b1sv/gallery/vn-top-mount-freezer-smartthings-ai-energy-mode-455269-rt38cg6584b1sv-536331748?$684_547_PNG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cg6584b1sv/gallery/vn-top-mount-freezer-smartthings-ai-energy-mode-455269-rt38cg6584b1sv-536331749?$684_547_PNG$

**RT20HAR8DBU** (Tủ Lạnh Ngăn Đông Trên với Hệ Thống Làm Lạnh Vòm Đa Chiều 216L):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/top-mount-freezer-rt20har8dbu-rt20har8dbu-sv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt20har8dbu-sv/gallery/vn-top-mount-freezer-rt20har8dbu-rt20har8dbu-sv-536800427?$1300_1038_PNG$

**RT22M4032BY** (Tủ Lạnh Ngăn Đông Trên với Ngăn Đông Mềm Optimal Fresh Zone, 243L Nâu Starry):
- Product Page: https://www.samsung.com/vn/refrigerators/top-mount-freezer/243l-starry-brown-rt22m4032by-sv/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rt22m4032by-sv/gallery/vn-top-mount-freezer-rt22m4032by-rt22m4032by-sv-536797653?$1300_1038_PNG$
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rt22m4032by-sv/gallery/vn-top-mount-freezer-rt22m4032by-rt22m4032by-sv-frontopenwithfoodblack-thumb-229422139?$684_547_PNG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rt22m4032by-sv/gallery/vn-top-mount-freezer-rt22m4032by-rt22m4032by-sv-rperspectiveblack-thumb-229422140?$684_547_PNG$

### French Door / Multi-Door Models Found:

**RF48A4010M9-SV** (Multi-Door Bespoke AI):
- Product Page: https://www.samsung.com/vn/refrigerators/multi-door/bespoke-ai-front-wahser-and-multi-door-refrigerator-f-svwedding4/
- Main Image: https://images.samsung.com/is/image/samsung/p6pim/vn/rf48a4010m9-sv/gallery/vn-non-plumbing-water-dispenser-382489-rf48a4010m9-sv-517976506?$Q90_684_547_JPG$

**RF65DB990012SV** (T-Style French Door 32" Family Hub):
- Product Page: https://www.samsung.com/vn/refrigerators/french-door/rf9000-t-style-french-door-32inch-family-hub-636l-clean-white-rf65db990012sv/
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rf65db990012sv/gallery/vn-t-style-french-door-32inch-family-hub-rf65db990012sv-544292499?$Q90_684_547_JPG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rf65db990012sv/gallery/vn-t-style-french-door-32inch-family-hub-rf65db990012sv-544292472?$Q90_684_547_JPG$
  3. https://images.samsung.com/is/image/samsung/p6pim/vn/rf65db990012sv/gallery/vn-t-style-french-door-32inch-family-hub-rf65db990012sv-544292475?$Q90_684_547_JPG$

**RF59C766FB1-SV** (RF7000CC French Door Bespoke):
- Product Page: https://www.samsung.com/vn/refrigerators/french-door/rf7000cc-french-door-bespoke-design-and-non-plumbing-648l-black-rf59c766fb1-sv/
- Gallery Images:
  1. https://images.samsung.com/is/image/samsung/p6pim/vn/rf59c766fb1-sv/gallery/vn-rf7000cc-french-door-refrigerators-non-bespoke-has-beverage-center-rf59c766fb1-sv-536797692?$Q90_684_547_JPG$
  2. https://images.samsung.com/is/image/samsung/p6pim/vn/rf59c766fb1-sv/gallery/vn-french-door-bespoke-design-and-non-plumbing-rf59c766fb1-sv-535358022?$Q90_684_547_JPG$
  3. https://images.samsung.com/is/image/samsung/p6pim/vn/rf59c766fb1-sv/gallery/vn-rf7000cc-french-door-refrigerators-non-bespoke-has-beverage-center-rf59c766fb1-sv-538873212?$Q90_684_547_JPG$

---

## URLs Still Needed for Our Models:

### Top Freezer (RT Series):
- RT38CG6784B1SV: Need to browse product page
- RT62K7011BS: Need to browse product page
- RT31CG5020S9: Need to browse product page
- RT22M4032BU: Need to browse product page
- RT20HAR8DBU: Need to browse product page
- RT18M6213SR: Need to browse product page (US model)
- RTF380G: Need to browse product page (PH model)
- RT16A6195SR: Need to browse product page (US model)
- RT6300D: Need to browse product page (Latin model)
- RT58K7000S8: Need to browse product page (Jordan model)

### Bottom Freezer (RB Series):
- RB16DG6000SL: Need to browse product page (Canada model)
- RB10FSR4ESR: Need to browse product page (Canada model)
- RB34C675EB1: Need to browse product page (Hong Kong model)
- RB12A300631: Need to browse product page (US model)
- RB6000D: Need to browse product page (Philippines model)
- RB30N4180S8: Need to browse product page (ME model)
- RB38T775CB1: Need to browse product page (UK model)
- RB33N300NSA: Need to browse product page (ME model)
- RB37J5000SA: Need to browse product page (ME model)
- RB31FDRNDSA: Need to browse product page (ME model)

### French Door (RF Series):
- RF29DB9900QD: Need to browse product page (US model)
- RF65DG9H0EB1: Need to browse product page (UK model)
- RF28T5F01SR: Need to browse product page (US model)
- RF31CG7400SR: Need to browse product page (US model)
- RF23DB9600QL: Need to browse product page (US model)
- RF48A4010B4: Need to browse product page (ME model)
- RS64T5F01B4: Need to browse product page (Philippines model)
- RF24BB6200: Need to browse product page (US model)
- RF29DB9700QL: Need to browse product page (US model)
- RF23DB9700QL: Need to browse product page (US model)

## Next Steps:

1. Browse each product page on Samsung's regional websites
2. Capture the main product image URL from Network tab
3. Update the `imageUrls` object in `download-images.cjs`
4. Run the download script

## Alternative: Use Stock Images

Since getting exact Samsung CDN URLs for all 30 models across different regions is time-consuming, 
you can:

1. Use high-quality stock refrigerator images that match the style
2. Use Samsung product catalog images from official press kits
3. Contact Samsung Vietnam for official product images
4. Use the placeholder images currently in place and update gradually

The current placeholder images are good enough for development and can be replaced with official 
Samsung images later.
