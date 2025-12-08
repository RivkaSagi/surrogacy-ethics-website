/**
 * Script to fetch team members from Google Drive and update the local cache
 * Run with: node scripts/update-team-cache.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    lines.forEach(line => {
      const match = line.match(/^([^=#]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
  }
}

loadEnvFile();

const FOLDER_ID = '1M5uFc8ilWS_f8it0tKBNmj35hYZbPj_z';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const CACHE_FILE = path.join(__dirname, '../src/data/team-members.json');

async function fetchDocContent(docId) {
  try {
    const docUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
    const response = await fetch(docUrl);
    if (response.ok) {
      const text = await response.text();
      return text.trim();
    }
  } catch (err) {
    console.warn(`⚠️  Could not fetch description for doc ${docId}`);
  }
  return null;
}

async function fetchTeamMembers() {
  if (!API_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_GOOGLE_API_KEY not found in .env.local');
    console.log('Please create a .env.local file with your Google API key');
    process.exit(1);
  }

  try {
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&fields=files(id,name,mimeType,webContentLink,thumbnailLink)&key=${API_KEY}`;

    console.log('🔄 Fetching team members from Google Drive...');
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const files = data.files || [];

    console.log(`📁 Found ${files.length} files in folder`);

    // Separate images and documents
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const images = files.filter((file) => {
      const ext = file.name.toLowerCase().split('.').pop();
      return imageExtensions.includes(ext);
    });

    const docs = files.filter((file) => {
      return file.mimeType === 'application/vnd.google-apps.document';
    });

    console.log(`📷 Found ${images.length} images`);
    console.log(`📄 Found ${docs.length} Google Docs`);

    // Create a map of document names to their content
    const docMap = new Map();
    for (const doc of docs) {
      const cleanDocName = doc.name.replace(/[_-]/g, ' ').trim();
      console.log(`📖 Fetching description for: ${cleanDocName}`);
      const content = await fetchDocContent(doc.id);
      if (content) {
        docMap.set(cleanDocName, content);
      }
    }

    // Process images and match with descriptions
    const members = [];
    for (const file of images) {
      // Remove file extension from name
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      // Clean up the name (replace underscores, hyphens with spaces)
      const cleanName = nameWithoutExt.replace(/[_-]/g, ' ').trim();

      // Try to find matching description
      let description = docMap.get(cleanName);

      if (!description) {
        // Try partial match (in case doc name is slightly different)
        for (const [docName, docContent] of docMap.entries()) {
          if (docName.includes(cleanName) || cleanName.includes(docName)) {
            description = docContent;
            break;
          }
        }
      }

      // Fallback to default description
      if (!description) {
        description = `חבר/ה בצוות הפורום להובלת הקוד האתי לפונדקאות בישראל`;
      }

      members.push({
        name: cleanName,
        description: description,
        imageId: file.id,
        imageUrl: `https://drive.google.com/uc?export=view&id=${file.id}`,
      });
    }

    // Sort alphabetically in Hebrew
    members.sort((a, b) => a.name.localeCompare(b.name, 'he'));

    console.log(`✅ Processed ${members.length} team member images`);

    // Create cache object
    const cache = {
      members: members,
      lastUpdated: new Date().toISOString(),
    };

    // Write to cache file
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');

    console.log(`💾 Cache updated successfully at ${CACHE_FILE}`);
    console.log(`📅 Last updated: ${cache.lastUpdated}`);
    console.log('\nTeam members:');
    members.forEach((member, index) => {
      console.log(`  ${index + 1}. ${member.name}`);
    });

  } catch (error) {
    console.error('❌ Error fetching team members:', error.message);
    process.exit(1);
  }
}

// Run the script
fetchTeamMembers();
