// scripts/buildData.mjs
import fs   from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// 1) File paths
const IN_CSV   = path.resolve('scripts', 'federal_budget_2025_26.csv');
const OUT_JSON = path.resolve('src', 'data', 'budget2025.json');

// 2) Read & raw-parse CSV
const raw  = fs.readFileSync(IN_CSV, 'utf-8');
let rows    = parse(raw, { columns: true, skip_empty_lines: true });

// 3) Log the original headers
console.log('Original columns:', Object.keys(rows[0] || {}));

// 4) Clean up header keys (trim whitespace/BOM)
rows = rows.map(row => {
  const cleanRow = {};
  for (const [key, value] of Object.entries(row)) {
    cleanRow[key.trim()] = value;
  }
  return cleanRow;
});

// 5) Log the cleaned headers
console.log('Cleaned columns:', Object.keys(rows[0] || {}));
// 3) Quick debug
console.log('▶ Total rows parsed:', rows.length);
console.log('▶ Rows w/ estimates:', rows.filter(r => r['2025-2026 Budget Estimate']?.trim() !== '').length);

// 4) Aggregate by Ministry, with guards
const totals = {};
for (const r of rows) {
  const sectorCell = r['Ministry'];
  if (typeof sectorCell !== 'string' || !sectorCell.trim()) continue;
  const sector = sectorCell.trim();

  const estCell = r['2025-2026 Budget Estimate'];
  if (typeof estCell !== 'string' || !estCell.trim()) continue;
  // remove any commas, then parse
  const rawAmt = estCell.replace(/,/g, '').trim();
  const amt = Number(rawAmt);
  if (Number.isNaN(amt)) continue;

  totals[sector] = (totals[sector] || 0) + amt;
}

// 5) Take top 10
const top10 = Object.entries(totals)
  .sort(([,a],[,b]) => b - a)
  .slice(0, 10)
  .map(([name,value]) => ({ name, value }));

// 6) Write JSON
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(top10, null, 2));

console.log(`✅ Generated ${top10.length} ministries to ${OUT_JSON}`);
