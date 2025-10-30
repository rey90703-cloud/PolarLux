/**
 * Script to download Samsung refrigerator product images
 * Run: node scripts/download-images.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image URLs mapping - Samsung CDN URLs (from actual Samsung VN website)
const imageUrls = {
  // Top Freezer - RT Series (Samsung Vietnam URLs verified)
  'rt38cb668422sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cb668422sv/gallery/vn-top-mount-freezer-bespoke-design-472512-rt38cb668422sv-547910134?$1300_1038_PNG$',
  'rt31cg5424b1sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cg5424b1sv/gallery/vn-top-mount-freezer-spacemax-rt31cg5424b1sv-536303517?$1300_1038_PNG$',
  'rt31cb56248asv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt31cb56248asv/gallery/vn-top-mount-freezer-bespoke-rt31cb56248asv-536476427?$1300_1038_PNG$',
  'rt47cb66868asv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt47cb66868asv/gallery/vn-top-mount-freezer-bespoke-design-453404-rt47cb66868asv-536331957?$1300_1038_PNG$',
  'rt38cg6584b1sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt38cg6584b1sv/gallery/vn-top-mount-freezer-smartthings-ai-energy-mode-455269-rt38cg6584b1sv-536331765?$1300_1038_PNG$',
  'rt20har8dbu': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt20har8dbu-sv/gallery/vn-top-mount-freezer-rt20har8dbu-rt20har8dbu-sv-536800427?$1300_1038_PNG$',
  'rt22m4032by': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rt22m4032by-sv/gallery/vn-top-mount-freezer-rt22m4032by-rt22m4032by-sv-536797653?$1300_1038_PNG$',
  // Remaining Top Freezer models - using old URLs as fallback
  'rt38cg6784b1sv': 'https://images.samsung.com/is/image/samsung/vn-top-mount-freezer-rt38cg6784b1sv-rt38cg6784b1sv-frontblack-thumb-537205221',
  'rt62k7011bs': 'https://images.samsung.com/is/image/samsung/p6pim/levant/rt62k7011bs-jo/gallery/levant-top-mount-freezer-rt62k7000s8-jo-rt62k7011bs-jo-frontsilver-206043621',
  'rt31cg5020s9': 'https://images.samsung.com/is/image/samsung/p6pim/in/rt31cg5020s9-tl/gallery/in-top-mount-freezer-rt31cg5020s9-tl-537178479',
  'rt22m4032bu': 'https://images.samsung.com/is/image/samsung/vn-top-mount-freezer-rt22m4032bu-sv-frontstarryblack-67467722',
  'rt18m6213sr': 'https://images.samsung.com/is/image/samsung/us-top-freezer-refrigerator-rt18m6213sr-rt18m6213sr-aa-frontsilver-69201173',
  'rtf380g': 'https://images.samsung.com/is/image/samsung/ph-top-mount-freezer-rt21m6211s9-tc-frontsilver-63872542',
  'rt16a6195sr': 'https://images.samsung.com/is/image/samsung/us-top-freezer-refrigerator-rt16a6195sr-rt16a6195sr-aa-frontsilver-535849318',
  'rt6300d': 'https://images.samsung.com/is/image/samsung/assets/latin_en/refrigerators/top-mount-freezer/rt6300d-top-mount-freezer-521l-rt52dg5004sl-frontsil',
  'rt58k7000s8': 'https://images.samsung.com/is/image/samsung/p6pim/levant/rt58k7000s8-jo/gallery/levant-top-mount-freezer-rt58k70-rt58k7000s8-jo-frontsilver-206043427',
  
  // Bottom Freezer - RB Series
  'rb16dg6000sl': 'https://images.samsung.com/is/image/samsung/ca-bottom-mount-freezer-rb16dg6000sl-aa-frontsilver-537204890',
  'rb10fsr4esr': 'https://images.samsung.com/is/image/samsung/ca-bottom-mount-freezer-rb10fsr4esr-aa-frontsilver-291508446',
  'rb34c675eb1': 'https://images.samsung.com/is/image/samsung/hk-bottom-mount-freezer-rb34c675eb1-sh-frontblack-537179043',
  'rb12a300631': 'https://images.samsung.com/is/image/samsung/us-bespoke-4-door-flex-refrigerator-rb12a300631-rb12a300631-aa-frontmattegrey-530427403',
  'rb6000d': 'https://images.samsung.com/is/image/samsung/ph-bottom-mount-freezer-rb6000d-frontrefinedinox-537177880',
  'rb30n4180s8': 'https://images.samsung.com/is/image/samsung/levant/rb30n4180s8-me/gallery/levant-bottom-mount-freezer-rb30n41-rb30n4180s8-me-frontsilver-205963133',
  'rb38t775cb1': 'https://images.samsung.com/is/image/samsung/uk-bottom-mount-freezer-rb38t775cb1-eu-frontblack-299704628',
  'rb33n300nsa': 'https://images.samsung.com/is/image/samsung/levant/rb33n300nsa-me/gallery/levant-bottom-mount-freezer-rb33n30-rb33n300nsa-me-frontsilver-205963068',
  'rb37j5000sa': 'https://images.samsung.com/is/image/samsung/p6pim/levant/rb37j5000sa-me/gallery/levant-bottom-mount-freezer-rb37j50-rb37j5000sa-me-frontsilver-205962903',
  'rb31fdrndsa': 'https://images.samsung.com/is/image/samsung/levant/rb31fdrndsa-me/gallery/levant-bottom-mount-freezer-rb31fdr-rb31fdrndsa-me-frontsilver-205962668',
  
  // French Door - RF Series (verified Samsung VN models)
  'rf48a4010m9sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rf48a4010m9-sv/gallery/vn-non-plumbing-water-dispenser-382489-rf48a4010m9-sv-517976506?$Q90_684_547_JPG$',
  'rf65db990012sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rf65db990012sv/gallery/vn-t-style-french-door-32inch-family-hub-rf65db990012sv-544292499?$Q90_684_547_JPG$',
  'rf59c766fb1sv': 'https://images.samsung.com/is/image/samsung/p6pim/vn/rf59c766fb1-sv/gallery/vn-rf7000cc-french-door-refrigerators-non-bespoke-has-beverage-center-rf59c766fb1-sv-536797692?$Q90_684_547_JPG$',
  // Remaining French Door models - using old URLs as fallback
  'rf29db9900qd': 'https://images.samsung.com/is/image/samsung/us-bespoke-4-door-flex-refrigerator-rf29db9900qd-rf29db9900qd-aa-frontstainlesssteel-537213824',
  'rf65dg9h0eb1': 'https://images.samsung.com/is/image/samsung/uk-multi-door-rf65dg9h0eb1-eu-frontblack-537205318',
  'rf28t5f01sr': 'https://images.samsung.com/is/image/samsung/us-family-hub-refrigerator-rf28t5f01sr-aa-frontsilver-291508559',
  'rf31cg7400sr': 'https://images.samsung.com/is/image/samsung/us-4-door-french-door-refrigerator-rf31cg7400sr-rf31cg7400sr-aa-frontsilver-537213790',
  'rf23db9600ql': 'https://images.samsung.com/is/image/samsung/us-bespoke-4-door-flex-refrigerator-rf23db9600ql-rf23db9600ql-aa-frontstainlesssteel-537213812',
  'rf48a4010b4': 'https://images.samsung.com/is/image/samsung/levant/rf48a4010b4-lv/gallery/levant-french-door-rf48a4010b4-lv-frontgentleblackmatt-421513903',
  'rs64t5f01b4': 'https://images.samsung.com/is/image/samsung/ph-side-by-side-rs64t5f01b4-tc-frontgentleblackmatt-291508632',
  'rf24bb6200': 'https://images.samsung.com/is/image/samsung/assets/us/refrigerators/4-door-french-door/gallery/RF30BB6200_001_Front_Stainless-Steel',
  'rf29db9700ql': 'https://images.samsung.com/is/image/samsung/us-bespoke-4-door-flex-refrigerator-rf29db9700ql-rf29db9700ql-aa-frontstainlesssteel-537213820',
  'rf23db9700ql': 'https://images.samsung.com/is/image/samsung/us-bespoke-4-door-flex-refrigerator-rf23db9700ql-rf23db9700ql-aa-frontstainlesssteel-537213816'
};

// Placeholder image URLs from Unsplash (free to use)
const placeholderUrls = {
  'rt38cg6784b1sv': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rt62k7011bs': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rt31cg5020s9': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rt22m4032bu': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rt20har8dbu': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop',
  'rt18m6213sr': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rtf380g': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rt16a6195sr': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rt6300d': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rt58k7000s8': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop',
  
  'rb16dg6000sl': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rb10fsr4esr': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rb34c675eb1': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rb12a300631': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rb6000d': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop',
  'rb30n4180s8': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rb38t775cb1': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rb33n300nsa': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rb37j5000sa': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rb31fdrndsa': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop',
  
  'rf29db9900qd': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rf65dg9h0eb1': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rf28t5f01sr': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rf31cg7400sr': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rf23db9600ql': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop',
  'rf48a4010b4': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=1000&fit=crop',
  'rs64t5f01b4': 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&h=1000&fit=crop',
  'rf24bb6200': 'https://images.unsplash.com/photo-1603893037882-1bcb9d8c27d3?w=800&h=1000&fit=crop',
  'rf29db9700ql': 'https://images.unsplash.com/photo-1540317580384-e5d43616abd2?w=800&h=1000&fit=crop',
  'rf23db9700ql': 'https://images.unsplash.com/photo-1565192052454-6c0839e1eb29?w=800&h=1000&fit=crop'
};

const outputDir = path.join(__dirname, '..', 'public', 'images', 'fridges');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(outputDir, filename);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('Starting image download...\n');
  
  // Use actual Samsung CDN URLs
  const urls = imageUrls;
  
  let completed = 0;
  let failed = 0;
  
  for (const [modelId, url] of Object.entries(urls)) {
    const filename = `${modelId}.jpg`;
    
    try {
      await downloadImage(url, filename);
      completed++;
    } catch (error) {
      console.error(`✗ Failed to download ${modelId}:`, error.message);
      failed++;
    }
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n=== Download Complete ===`);
  console.log(`✓ Successfully downloaded: ${completed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`📁 Images saved to: ${outputDir}`);
}

// Run the download
downloadAllImages().catch(console.error);
