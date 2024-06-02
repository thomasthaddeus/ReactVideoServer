// generateManualsData.js
const fs = require('fs');
const path = require('path');

const rootDir = '../docs';
const outputFilePath = path.join(__dirname, '../../src/components/manualsData.js');

// Function to convert file name to a more readable format
function formatName(fileName) {
  // Remove the file extension (.pdf or .PDF)
  const baseName = fileName.replace(/\.pdf$/i, '');
  // Insert space before capital letters
  const readableName = baseName.replace(/([a-z])([A-Z])/g, '$1 $2');
  return readableName;
}

function scanDirectory(dir, baseDir) {
  const files = [];
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push({
        name: formatName(item),
        files: scanDirectory(fullPath, baseDir),
      });
    } else {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      files.push({
        name: formatName(item),
        link: `./docs/${relativePath}`, // Adjusted to include the base 'docs' directory
      });
    }
  });

  return files;
}

function generateManualsData() {
  const schematicsData = scanDirectory(path.join(rootDir, 'schematics'), rootDir);
  const extrasData = scanDirectory(path.join(rootDir, 'extras'), rootDir);

  const data = [
    {
      category: 'Schematics',
      files: schematicsData,
    },
    {
      category: 'Extras',
      files: extrasData,
    },
    // Add other categories if needed
  ];

  const content = `const manualsData = ${JSON.stringify(data, null, 2).replace(/"(\w+)":/g, '$1:')};\n\nexport default manualsData;\n`;

  fs.writeFileSync(outputFilePath, content, 'utf8');
  console.log(`manualsData.js has been generated at ${outputFilePath}`);
}

generateManualsData();
