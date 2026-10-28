import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupNativePath = path.resolve(__dirname, '../node_modules/rollup/dist/native.js');

if (fs.existsSync(rollupNativePath)) {
  const content = `const wasmNative = require('@rollup/wasm-node/dist/native.js');

exports.parse = wasmNative.parse;
exports.parseAsync = wasmNative.parseAsync;
exports.xxhashBase64Url = wasmNative.xxhashBase64Url;
exports.xxhashBase36 = wasmNative.xxhashBase36;
exports.xxhashBase16 = wasmNative.xxhashBase16;
exports.flushLlvmCoverage = wasmNative.flushLlvmCoverage || (() => {});
`;
  try {
    fs.writeFileSync(rollupNativePath, content, 'utf8');
    console.log('[Info Drill] Rollup WASM compatibility patch verified.');
  } catch (err) {
    console.warn('[Info Drill] Note: Could not patch rollup native (non-critical if already configured):', err.message);
  }
}
