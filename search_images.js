import fs from 'fs';
import path from 'path';

function searchForImages(dir, depth = 0) {
  if (depth > 4) return;
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
            searchForImages(fullPath, depth + 1);
          }
        } else {
          if (/\.(png|jpe?g|webp|gif)$/i.test(file)) {
            console.log('FOUND IMAGE:', fullPath);
          }
        }
      } catch (err) {}
    });
  } catch (err) {}
}

console.log('Searching current directory...');
searchForImages('.');
console.log('Searching parent directory...');
searchForImages('..');
console.log('Searching /tmp ...');
searchForImages('/tmp');
