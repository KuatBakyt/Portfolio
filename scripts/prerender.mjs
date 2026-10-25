import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { readFile, writeFile, mkdir } from 'node:fs/promises'

const origin = (process.env.SITE_URL || 'https://portfolio-kohl-eight-yxq5iogtn8.vercel.app').replace(/\/$/, '')
const url = new URL(origin)
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be an HTTPS origin without a path')
const server = await createServer({ cacheDir: 'node_modules/.vite-prerender', server: { middlewareMode: true }, appType: 'custom' })
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const { services, contact } = await server.ssrLoadModule('/src/content.ts')
  const template = await readFile('dist/index.html', 'utf8')
  const pages = [{ path: '/', title: 'Bakyt Dev — разработка сайтов и Telegram-ботов в Алматы', description: 'Разработка сайтов в Алматы, Telegram-ботов на Python и исправление ошибок. Реальные проекты, понятные условия и связь напрямую с разработчиком.' }, ...services.map(s => ({ path: `/${s.slug}/`, title: `${s.heading} — ${s.price} | Bakyt Dev`, description: s.subtitle, service: s.slug }))]
  const business = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Bakyt Dev', url: origin, description: pages[0].description, areaServed: [{ '@type': 'City', name: 'Алматы' }, { '@type': 'Country', name: 'Казахстан' }], telephone: '+77476202879', email: contact.email, sameAs: [contact.github, contact.telegram], hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Разработка сайтов и ботов', itemListElement: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: `${origin}/${s.slug}/` } })) } }
  for (const page of pages) {
    const canonical = `${origin}${page.path}`
    const markup = renderToString(createElement(App, { service: page.service }))
    const structured = page.service ? [business, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: origin }, { '@type': 'ListItem', position: 2, name: services.find(s=>s.slug===page.service).short, item: canonical }] }] : business
    const head = `<meta name="description" content="${escape(page.description)}" />\n<link rel="canonical" href="${canonical}" />\n<meta name="robots" content="index,follow" />\n<meta property="og:type" content="website" />\n<meta property="og:locale" content="ru_RU" />\n<meta property="og:site_name" content="Bakyt Dev" />\n<meta property="og:title" content="${escape(page.title)}" />\n<meta property="og:description" content="${escape(page.description)}" />\n<meta property="og:url" content="${canonical}" />\n<meta property="og:image" content="${origin}/og-cover.png" />\n<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />\n<meta name="twitter:card" content="summary_large_image" />\n<script type="application/ld+json">${JSON.stringify(structured).replaceAll('<', '\\u003c')}</script>`
    const html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`).replace('<!--seo-head-->', head).replace('<!--app-html-->', markup)
    const directory = `dist${page.path}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}index.html`, html)
  }
  const privacy = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Конфиденциальность — Bakyt Dev</title><meta name="description" content="Как сайт Bakyt Dev работает с обращениями и данными посетителей."><link rel="canonical" href="${origin}/privacy/"><style>body{font:17px/1.8 Arial,sans-serif;color:#242035;background:#fcfaf8;max-width:760px;margin:60px auto;padding:0 24px}a{color:#683bfa}h1{line-height:1.2}h2{font-size:23px;margin-top:32px}</style></head><body><a href="/">← Bakyt Dev</a><h1>Конфиденциальность</h1><p>Сайт Бакыта Куата представляет услуги разработки и собственные проекты.</p><h2>Форма обращения</h2><p>Имя, выбранная услуга и описание задачи используются в браузере, чтобы подготовить сообщение в WhatsApp. Сайт не сохраняет эти поля и не отправляет их на свой сервер. При нажатии кнопки данные передаются в URL сервиса WhatsApp; сообщение вы отправляете самостоятельно.</p><h2>Сторонние сервисы</h2><p>Сайт размещён на Vercel: хостинг может обрабатывать технические сведения о запросах, включая IP-адрес, по своим правилам. Шрифт загружается с Google Fonts. При переходе в WhatsApp, Telegram, GitHub или почтовое приложение действуют правила выбранного сервиса.</p><h2>Аналитика и хранение</h2><p>На сайте не подключены системы рекламной аналитики и не используются собственные cookies или локальное хранилище для данных посетителя. Сообщение, отправленное в мессенджере, используется для ответа и обсуждения заказа. Не указывайте пароли, платёжные реквизиты или другую чувствительную информацию в форме.</p><h2>Контакт</h2><p>По вопросам обращения с вашими сообщениями: <a href="mailto:${contact.email}">${contact.email}</a>.</p></body></html>`
  await mkdir('dist/privacy', { recursive: true })
  await writeFile('dist/privacy/index.html', privacy)
  const all = [...pages.map(p=>p.path), '/privacy/']
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${all.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
  await writeFile('dist/404.html', '<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Страница не найдена — Bakyt Dev</title><body style="font:18px/1.8 Arial;padding:10vw;background:#fcfaf8;color:#242035"><h1>Такой страницы нет</h1><p>Посмотрите услуги и проекты на главной странице.</p><a href="/">На главную →</a></body></html>')
  console.log(`Prerendered ${all.length} pages. Canonical origin: ${origin}`)
} finally { await server.close() }
