import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { contact, services, selectedService, whatsappMessage } from './content'

function Icon({ name, className = '' }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    send: <><path d="m21 3-7 18-4-7-7-4L21 3Z" /><path d="m10 14 5-5" /></>,
    tool: <><path d="m14 6 4 4 3-3a6 6 0 0 1-8 7L6 21a2 2 0 0 1-3-3l7-7a6 6 0 0 1 7-8l-3 3Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20" /></>,
    external: <><path d="M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
  }
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.arrow}</svg>
}

function HeroArt() {
  return <div className="hero-art" aria-hidden="true">
    <div className="art-glow" /><div className="orbit" />
    <svg className="crystal" viewBox="0 0 430 370" fill="none">
      <defs><linearGradient id="a" x1="55" y1="15" x2="365" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#eee4ff"/><stop offset=".48" stopColor="#a180ff"/><stop offset="1" stopColor="#5925ef"/></linearGradient><linearGradient id="b" x1="168" y1="20" x2="256" y2="316"><stop stopColor="#8853ff"/><stop offset="1" stopColor="#ede3ff" stopOpacity=".4"/></linearGradient><linearGradient id="c" x1="60" y1="220" x2="340" y2="300"><stop stopColor="#5826e7"/><stop offset="1" stopColor="#d2b8ff"/></linearGradient></defs>
      <path d="m210 15 112 187-47 137-198-83L210 15Z" fill="url(#a)" stroke="#7540f3"/>
      <path d="m210 15 24 214 41 110 47-137L210 15Z" fill="url(#b)" stroke="#c5a9ff"/>
      <path d="m77 256 157-27 41 110L77 256Z" fill="url(#c)" stroke="#8c58f0"/>
      <path d="m77 256 133-241 24 214-157 27Z" fill="#f1e7ff" fillOpacity=".3" stroke="#c4a3ff"/>
      <path d="m46 209 188 20-80 99L46 209Z" fill="url(#a)" stroke="#9e73ff"/>
      <path d="m46 209 108 119 80-99L46 209Z" fill="#7340ee" fillOpacity=".2"/>
    </svg>
    <div className="art-browser"><div className="browser-dots"><i/><i/><i/></div><div className="mini-page"><span/><div><b/><b/><b/></div></div></div>
    <div className="art-code"><div className="code-label">bot.py <span>Python</span></div><code><em>def</em> create_bot():<br/>&nbsp; return <strong>"Business"</strong><br/><br/><span>@app.route("/")</span><br/><em>def</em> index():<br/>&nbsp; return render()</code></div>
    <div className="orb orb-one"/><div className="orb orb-two"/>
    <div className="art-notification"><span className="telegram-disc"><Icon name="send"/></span><div><b>Новая заявка</b><small>Telegram-бот</small></div><i/></div>
  </div>
}

function ContactForm({ initialService }: { initialService?: string }) {
  const [ready, setReady] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const description = event.currentTarget.elements.namedItem('description') as HTMLTextAreaElement
    if (description.value.trim().length < 10) {
      description.setCustomValidity('Опишите задачу: хотя бы 10 символов без пробелов по краям.')
      description.reportValidity()
      return
    }
    const text = `Здравствуйте, Бакыт!\nМеня зовут ${String(data.get('name')).trim()}.\nУслуга: ${data.get('service')}.\nЗадача: ${String(data.get('description')).trim()}`
    window.location.assign(whatsappMessage(text))
    setReady(true)
  }
  return <form className="contact-form" onSubmit={submit}>
    <h3>Расскажите о вашей задаче</h3>
    <p>Подготовим сообщение и откроем WhatsApp.</p>
    <label htmlFor="name">Ваше имя</label><input id="name" name="name" required maxLength={80} autoComplete="given-name" placeholder="Как к вам обращаться?" pattern=".*\S.*"/>
    <label htmlFor="service">Что нужно сделать?</label><select id="service" name="service" defaultValue={initialService ?? 'Сайт для бизнеса'}><option>Сайт для бизнеса</option><option>Telegram-бот</option><option>Исправление ошибки</option><option>Backend / REST API</option><option>Другая задача</option></select>
    <label htmlFor="description">Коротко о проекте</label><textarea id="description" name="description" required minLength={10} maxLength={2000} rows={4} onInput={e=>e.currentTarget.setCustomValidity('')} placeholder="Чем занимается бизнес и что вы хотите получить?"/>
    <button className="button primary" type="submit">Продолжить в WhatsApp <Icon name="arrow"/></button>
    <small>Сообщение отправите вы в WhatsApp. Данные формы не сохраняются на сайте.</small>
    {ready && <p className="form-status" role="status">Сообщение подготовлено. Если WhatsApp не открылся, напишите по контактам рядом.</p>}
  </form>
}

const faqs = [
  ['Как формируется цена?', 'Цена «от» относится к небольшому согласованному объёму. После обсуждения задачи фиксируем функции, сроки, число правок и стоимость до начала разработки.'],
  ['Как проходит оплата?', 'Обычно 50% перед началом и 50% после приёмки. Для небольших исправлений условия согласуем отдельно.'],
  ['Домен и хостинг входят в стоимость?', 'Они оплачиваются отдельно, если не договорились иначе. Помогу выбрать подходящий вариант и настроить публикацию.'],
  ['Что входит в гарантию?', 'В течение 30 дней после приёмки бесплатно исправляю ошибки собственной разработки в согласованном объёме. Новые функции и смена дизайна оцениваются отдельно.'],
  ['Можно заказать только доработку?', 'Да. Можно обратиться с конкретной ошибкой, новым разделом, API или интеграцией. Сначала посмотрю код и оценю задачу.'],
]

export default function App({ service }: { service?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const current = selectedService(service)
  const home = current ? '/' : ''
  const initial = current?.icon === 'send' ? 'Telegram-бот' : current?.icon === 'tool' ? 'Исправление ошибки' : undefined
  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="/" aria-label="Bakyt Dev — главная">Bakyt <span>Dev.</span></a>
      <nav aria-label="Основная навигация" className={menuOpen ? 'nav open' : 'nav'}><a href={`${home}#services`} onClick={()=>setMenuOpen(false)}>Услуги</a><a href={`${home}#projects`} onClick={()=>setMenuOpen(false)}>Проекты</a><a href={`${home}#about`} onClick={()=>setMenuOpen(false)}>Обо мне</a><a className="mobile-contact" href="#contact" onClick={()=>setMenuOpen(false)}>Связаться</a></nav>
      <a className="button primary header-cta" href="#contact">Обсудить проект <Icon name="arrow"/></a>
      <button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
    </div></header>
    <main id="main" className="container">
      {current && <nav className="breadcrumbs" aria-label="Хлебные крошки"><a href="/">Главная</a><span>/</span><span>{current.short}</span></nav>}
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><span className="eyebrow"><i/> Разработчик · Алматы</span>
        <h1 id="hero-title">{current ? <>{current.heading} <span>{current.accent}</span></> : <>Сайты и боты,<br/>которые работают<br/><span>на ваш бизнес</span></>}</h1>
        <p>{current?.subtitle ?? 'Разработка сайтов, Telegram-ботов и автоматизация заявок. От вашей идеи до работающего проекта.'}</p>
        <div className="hero-actions"><a className="button primary" href="#contact">Обсудить проект <Icon name="arrow"/></a><a className="button secondary" href="#projects"><span className="play">▶</span> Смотреть проекты</a></div>
        <div className="hero-note"><Icon name="check"/> Согласуем объём, сроки и стоимость до старта</div>
      </div><HeroArt/></section>
      {current && <section className="service-detail" aria-labelledby="included"><div><span className="overline">Ваша задача → готовое решение</span><h2 id="included">Что входит в работу</h2><p>{current.note}</p><a className="text-link" href="#contact">Получить оценку <Icon name="arrow"/></a></div><ul>{current.includes.map(item=><li key={item}><Icon name="check"/>{item}</li>)}</ul></section>}
      <section id="services" className="services" aria-label="Услуги и стоимость">{services.map(item=><a className="service-card" key={item.slug} href={`/${item.slug}/`}><span className="service-icon"><Icon name={item.icon}/></span><div><h2>{item.short}</h2><p>{item.description}</p><div className="service-bottom"><strong>{item.price}</strong><span className="round-arrow"><Icon name="arrow"/></span></div><small>{item.time}</small></div></a>)}</section>
      <section id="projects" className="section projects"><div className="section-heading"><div><span className="overline">От идеи к интерфейсу</span><h2>Избранные проекты</h2></div><a className="text-link" href={contact.github} target="_blank" rel="noopener noreferrer">Все проекты на GitHub <Icon name="external"/></a></div>
        <div className="project-grid">
          <article className="project-card"><a className="project-visual flowza-visual" href="https://github.com/KuatBakyt/flowza-crm" target="_blank" rel="noopener noreferrer" aria-label="Исходный код Flowza CRM"><div className="mock-browser"><span>Flowza CRM <i>Заявки и расписание</i></span><img src="/images/flowza-dashboard.webp" alt="Настоящий экран Flowza CRM с тестовыми данными" width="1440" height="1000" loading="lazy"/></div><span className="image-label">Интерфейс · тестовые данные</span></a><div className="project-info"><span className="project-type">Собственный проект · MVP</span><h3>Flowza CRM <span>↗</span></h3><p>Заявки, клиенты и расписание мастеров. Передача заказов и уведомления через Telegram.</p><div className="tags"><span>Django</span><span>Flutter</span><span>PostgreSQL</span></div><details><summary>О задаче и решении</summary><p>Собрал API и адаптивный интерфейс для работы с заказами: роли, календарь, проверка занятости и распределение между мастерами. Проект для локального запуска; коммерческие результаты не заявляются.</p><a className="text-link" href="https://github.com/KuatBakyt/flowza-crm" target="_blank" rel="noopener noreferrer">Код и инструкция <Icon name="external"/></a></details></div></article>
          <article className="project-card"><a className="project-visual fashion-visual" href="https://github.com/KuatBakyt/Fashion-Luxe" target="_blank" rel="noopener noreferrer" aria-label="Исходный код Fashion Luxe"><img src="/images/fashion-hero.webp" alt="Изображение из проекта Fashion Luxe" width="800" height="600" loading="lazy"/><div className="fashion-cover"><span>FASHION LUXE</span><strong>Стиль.<br/>В деталях.</strong></div><span className="image-label">Обложка учебного проекта</span></a><div className="project-info"><span className="project-type">Учебный проект</span><h3>Fashion Luxe <span>↗</span></h3><p>Приложение магазина одежды: каталог, избранное, корзина и сценарий оформления заказа.</p><div className="tags"><span>Flutter</span><span>Provider</span><span>GoRouter</span></div><details><summary>О задаче и решении</summary><p>Разделил работу с данными и состояние экранов через сервисы, репозитории и ViewModel. Заказ имитируется: реальные платежи и доставка не подключены.</p><a className="text-link" href="https://github.com/KuatBakyt/Fashion-Luxe" target="_blank" rel="noopener noreferrer">Код и инструкция <Icon name="external"/></a></details></div></article>
          <article className="project-card bank-card"><a className="project-visual bank-visual" href="https://github.com/KuatBakyt/business_bank_app" target="_blank" rel="noopener noreferrer" aria-label="Исходный код Business Bank"><img src="/images/bank-dashboard.webp" alt="Экран учебного Business Bank с тестовыми счетами" width="1440" height="1000" loading="lazy"/><span className="image-label">Интерфейс · тестовые данные</span></a><div className="project-info"><span className="project-type">Учебный проект · Fintech</span><h3>Business Bank <span>↗</span></h3><p>Бизнес-банк: счета в тенге, платежи с согласованием, роли сотрудников и выписки.</p><div className="tags"><span>Django REST</span><span>PostgreSQL</span><span>Flutter Web</span></div><p className="project-disclaimer">Учебная система без реальных банковских операций.</p><a className="text-link" href="https://github.com/KuatBakyt/business_bank_app" target="_blank" rel="noopener noreferrer">Посмотреть проект <Icon name="external"/></a></div></article>
        </div>
      </section>
      <section className="process section"><div className="section-heading"><div><span className="overline">Понятно на каждом этапе</span><h2>Как будем работать</h2></div><p>Вы знаете, что получите<br/>и сколько это будет стоить.</p></div><ol>{[['Обсуждаем задачу','Уточняем цель, функции и ваши материалы.'],['Фиксируем условия','Согласуем объём, цену, сроки и предоплату.'],['Создаём и проверяем','Показываю результат, вносим согласованные правки.'],['Запускаем проект','Публикуем, передаю доступы и инструкцию.']].map(([title,text],i)=><li key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
      <section id="about" className="about section"><div className="about-monogram" aria-hidden="true"><span>BK<span className="monogram-dot">.</span></span><div>Python / React / Flutter</div></div><div><span className="overline">На связи лично</span><h2>Привет, я Бакыт.<br/>Создаю понятные цифровые продукты.</h2><p>Разрабатываю сайты, backend на Python и приложения на Flutter. Живу в Алматы, работаю удалённо. Мне интересно связывать удобный интерфейс с логикой, которая помогает решать повседневные задачи бизнеса.</p><p>Можно начать с небольшой задачи: страницы услуг, бота для заявок или исправления ошибки.</p><div className="tags"><span>Python / Django</span><span>React / TypeScript</span><span>Flutter / Dart</span><span>Docker</span></div></div></section>
      <section className="faq section"><div><span className="overline">Перед началом</span><h2>Частые вопросы</h2><p>О стоимости, сроках<br/>и условиях работы.</p></div><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
      <section id="contact" className="contact section"><div className="contact-copy"><span className="overline">Давайте начнём с разговора</span><h2>Есть задача?<br/><span>Давайте обсудим.</span></h2><p>Расскажите, что хотите сделать. Посмотрю задачу и предложу подходящий вариант по объёму и бюджету.</p><div className="contact-links"><a href={whatsappMessage('Здравствуйте, Бакыт! Хочу обсудить проект.')} target="_blank" rel="noopener noreferrer">WhatsApp <Icon name="arrow"/></a><a href={contact.telegram} target="_blank" rel="noopener noreferrer">Telegram <Icon name="arrow"/></a><a href={`mailto:${contact.email}`}>{contact.email} <Icon name="arrow"/></a><a href="tel:+77476202879">{contact.phone} <Icon name="arrow"/></a></div></div><ContactForm key={service ?? 'home'} initialService={initial}/></section>
    </main>
    <footer className="container footer"><a className="brand" href="/">Bakyt <span>Dev.</span></a><p>Сайты, боты и автоматизация · Алматы</p><div><a href="/privacy/">Конфиденциальность</a><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div><small>© {new Date().getFullYear()} Бакыт Куат</small></footer>
  </>
}
