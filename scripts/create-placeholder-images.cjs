/**
 * Create placeholder images for missing fridge photos
 * Uses different Unsplash queries for better results
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Better Unsplash URLs with more variety
const fridgeImageQueries = [
  'photo-1571175443880-49e1d25b2bc5', // Modern fridge
  'photo-1584568694244-14fbdf83bd30', // Kitchen with fridge
  'photo-1603893037882-1bcb9d8c27d3', // Stainless fridge
  'photo-1540317580384-e5d43616abd2', // Black fridge
  'photo-1565192052454-6c0839e1eb29', // White fridge
  'photo-1556911073-52527ac43761', // Kitchen appliance
  'photo-1600585152220-90363fe7e115', // Modern kitchen
  'photo-1556909212-d5b604d0c90d', // Kitchen interior
  'photo-1556911220-bff31c812dba', // Kitchen design
  'photo-1600566753376-12c8ab7fb75b', // Kitchen with fridge 2
];

const missingModels = [
  'rt31cg5020s9',
  'rt22m4032bu',
  'rt20har8dbu',
  'rtf380g',
  'rt6300d',
  'rt58k7000s8',
  'rb34c675eb1',
  'rb12a300631',
  'rb6000d',
  'rb33n300nsa',
  'rb37j5000sa',
  'rb31fdrndsa',
  'rf28t5f01sr',
  'rf31cg7400sr',
  'rf23db9600ql',
  'rf24bb6200',
  'rf29db9700ql',
  'rf23db9700ql'
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'fridges');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }
      
      const filepath = path.join(outputDir, filename);
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Created: ${filename}`);
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function createPlaceholders() {
  console.log('Creating placeholder images for missing models...\n');
  
  let completed = 0;
  let failed = 0;
  
  for (let i = 0; i < missingModels.length; i++) {
    const modelId = missingModels[i];
    const queryId = fridgeImageQueries[i % fridgeImageQueries.length];
    const url = `https://images.unsplash.com/${queryId}?w=800&h=1000&fit=crop&auto=format`;
    const filename = `${modelId}.jpg`;
    
    try {
      await downloadImage(url, filename);
      completed++;
    } catch (error) {
      console.error(`✗ Failed ${modelId}:`, error.message);
      failed++;
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  console.log(`\n=== Complete ===`);
  console.log(`✓ Created: ${completed}`);
  console.log(`✗ Failed: ${failed}`);
}

createPlaceholders().catch(console.error);
