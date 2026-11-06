import assert from 'node:assert/strict';
import fs from 'node:fs';
import { screenDesigns, businessRules } from './data/designSpec.js';
assert.deepEqual(screenDesigns.map(screen=>screen.id),['home','services','booking','tracking','dashboard','technician','about','contact','how-it-works','policies','assessment']);
for(const screen of screenDesigns) { for(const field of ['purpose','content','action','mobile','states']) assert.ok(screen[field].length>20,screen.id+' '+field); assert.ok(screen.rows.length>=3); }
assert.equal(new Set(businessRules.map(([id])=>id)).size,10);
assert.equal(fs.readFileSync('docs/design-specification.md','utf8'),fs.readFileSync('public/design-specification.md','utf8'));
const docs=fs.readdirSync('assessment').filter(file=>file.endsWith('.md')); assert.equal(docs.length,6);
for(const file of docs) assert.equal(fs.readFileSync('assessment/'+file,'utf8'),fs.readFileSync('public/assessment/'+file,'utf8'));
console.log('PASS documentation: eleven screen specifications, ten business rules and six matching assessment downloads.');
