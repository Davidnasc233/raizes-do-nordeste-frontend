import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const docsDir = 'docs';
const browserDir = join(docsDir, 'browser');

if (!existsSync(browserDir)) {
  console.error('Could not find docs/browser. Run the Angular build before this script.');
  process.exit(1);
}

for (const entry of readdirSync(browserDir)) {
  const source = join(browserDir, entry);
  const destination = join(docsDir, entry);
  rmSync(destination, { force: true, recursive: true });
  cpSync(source, destination, { recursive: true });
}

rmSync(browserDir, { force: true, recursive: true });

const indexPath = join(docsDir, 'index.html');
const notFoundPath = join(docsDir, '404.html');

if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
}

mkdirSync(docsDir, { recursive: true });
writeFileSync(join(docsDir, '.nojekyll'), '');

console.log('GitHub Pages output prepared in docs/.');
