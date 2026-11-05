/**
 * InfoDrill AI Solutions — Favicon Generator
 * Calls the PowerShell script that uses System.Drawing to render high-DPI transparent icons.
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const psScript = path.join(__dirname, 'generate-favicon.ps1');

console.log('Generating crisp multi-resolution favicons from InfoDrill emblem...');
try {
  const output = execSync(`powershell -ExecutionPolicy Bypass -File "${psScript}"`, {
    encoding: 'utf-8',
    stdio: 'inherit'
  });
  console.log('Favicon generation complete!');
} catch (err) {
  console.error('Failed to run favicon generator:', err);
  process.exit(1);
}

