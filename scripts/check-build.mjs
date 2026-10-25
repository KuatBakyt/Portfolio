import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
const slugs = ['', 'razrabotka-saitov-almaty/', 'telegram-boty/', 'ispravlenie-oshibok/']
const titles = new Set(), canonicals = new Set()
for (const slug of slugs) {
  const html = await readFile(`dist/${slug}index.html`, 'utf8')
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${slug}: exactly one H1`)
  assert.ok(!html.includes('<!--app-html-->'), 'SSR markup must exist')
  assert.ok(html.includes('application/ld+json'), 'structured data')
  assert.ok(html.includes('id="contact"'), 'contact section')
  titles.add(html.match(/<title>(.*?)<\/title>/)[1])
  canonicals.add(html.match(/rel="canonical" href="([^"]+)"/)[1])
  for (const [,path] of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
    if (path.endsWith('/')) await access(`dist${path}index.html`)
    else if (!path.includes('#')) await access(`dist${path}`)
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])
  assert.equal(new Set(ids).size, ids.length, 'unique element IDs')
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `missing #${id}`)
}
assert.equal(titles.size, slugs.length, 'unique titles')
assert.equal(canonicals.size, slugs.length, 'unique canonicals')
await access('dist/privacy/index.html');await access('dist/sitemap.xml');await access('dist/robots.txt');await access('dist/404.html');await access('dist/og-cover.png')
console.log('Build verified: rendered content, unique SEO metadata, local links, assets, anchors and sitemap.')
