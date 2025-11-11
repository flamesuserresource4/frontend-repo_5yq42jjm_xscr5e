import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold mb-2">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SKILLS = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
  { name: 'Testing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framer/framer-original.svg' },
]

function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
    >
      <span className={`absolute inset-y-0 left-0 flex items-center pl-2 text-[10px] ${isDark ? 'text-gray-500' : 'text-amber-500'}`}>{isDark ? '' : '☀️'}</span>
      <span className={`absolute inset-y-0 right-0 flex items-center pr-2 text-[10px] ${isDark ? 'text-blue-300' : 'text-gray-400'}`}>{isDark ? '🌙' : ''}</span>
      <span className={`inline-block h-6 w-6 transform rounded-full bg-gradient-to-tr from-violet-600 to-blue-500 shadow transition ${isDark ? 'translate-x-7' : 'translate-x-1'}`}></span>
    </button>
  )
}

export default function App() {
  const BASE_URL = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [contactState, setContactState] = useState({ loading: false, ok: null, message: '' })
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/projects`)
        const data = await res.json()
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects)
        }
      } catch (e) {
        // ignore, will show fallback
      } finally {
        setLoadingProjects(false)
      }
    }
    load()
  }, [BASE_URL])

  const fallbackProjects = [
    {
      title: 'Realtime Chat App',
      description: 'WebSocket powered chat with rooms, typing indicators, and message persistence.',
      tech: ['React', 'FastAPI', 'MongoDB', 'WebSocket'],
      url: '#',
      repo: '#',
    },
    {
      title: 'AI Code Assistant',
      description: 'Inline code suggestions and refactoring hints using transformer models.',
      tech: ['TypeScript', 'Vite', 'Python', 'LLM'],
      url: '#',
      repo: '#',
    },
    {
      title: 'Portfolio Generator',
      description: 'Generate personal websites from a simple YAML profile with themes.',
      tech: ['React', 'Tailwind', 'FastAPI'],
      url: '#',
      repo: '#',
    },
  ]

  const handleNav = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMenuOpen(false)
    }
  }

  const onSubmitContact = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message'),
    }

    setContactState({ loading: true, ok: null, message: '' })
    try {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data && data.status === 'ok') {
        setContactState({ loading: false, ok: true, message: 'Thanks! I will get back to you shortly.' })
        e.currentTarget.reset()
      } else {
        setContactState({ loading: false, ok: false, message: 'Something went wrong. Please try again.' })
      }
    } catch (e) {
      setContactState({ loading: false, ok: false, message: 'Unable to send right now. Please try later.' })
    }
  }

  const experience = [
    { role: 'Senior Software Engineer', company: 'Tech Corp', start: '2023', end: 'Present', points: ['Led development of a multi-tenant SaaS platform', 'Improved page performance by 40% with strategic caching', 'Mentored a team of 4 engineers'] },
    { role: 'Full‑Stack Engineer', company: 'Startup Labs', start: '2021', end: '2023', points: ['Built and maintained GraphQL APIs', 'Implemented CI pipelines and automated tests', 'Collaborated with design to ship polished UI'] },
    { role: 'Software Engineer', company: 'Freelance', start: '2019', end: '2021', points: ['Delivered end‑to‑end web apps for clients', 'Optimized apps for accessibility and SEO'] },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <span className="text-sm font-semibold tracking-wider">Software Engineer</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              {NAV.map((item) => (
                <button key={item.id} onClick={() => handleNav(item.id)} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  {item.label}
                </button>
              ))}
            </nav>
            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <nav className="px-4 py-3 grid gap-2 bg-white/95 dark:bg-gray-950/95">
              {NAV.map((item) => (
                <button key={item.id} onClick={() => handleNav(item.id)} className="text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero with Spline - improved contrast */}
      <section className="relative pt-24" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="py-8">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur p-6 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-violet-600 dark:text-violet-400 font-semibold">Hi, I’m</p>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight">
                  Your Name
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">Software Engineer</span>
                </h1>
                <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-xl">
                  I build modern, scalable web applications with delightful user experiences. I enjoy solving complex problems and shipping high-quality products.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>FastAPI</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>AWS</Badge>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <a href="#projects" onClick={(e) => { e.preventDefault(); handleNav('projects') }} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100">View Projects</a>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact') }} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700">Contact</a>
                </div>
              </div>
            </div>
            <div className="h-[460px] sm:h-[520px] lg:h-[560px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40">
              <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="About" title="A bit about me" subtitle="Passionate about clean code, performance, and delightful UX." />
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I’m a software engineer with experience across the stack. I focus on building reliable, accessible, and maintainable applications. I love working with modern toolchains and collaborating with cross‑functional teams to turn ideas into products.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Skills" title="Tools I work with" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILLS.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={s.icon} alt={s.name} className="h-5 w-5" loading="lazy" />
                  <span className="truncate">{s.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">Advanced</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience - Vertical timeline with progress */}
      <section id="experience" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Experience" title="Where I’ve worked" subtitle="A timeline of roles with dates." />
          <div className="relative pl-8">
            <span className="pointer-events-none absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 dark:from-violet-600 dark:via-blue-600 dark:to-cyan-600" />
            {experience.map((job, idx) => (
              <div key={idx} className="relative mb-10 last:mb-0">
                <span className="absolute -left-0.5 top-2 h-3 w-3 rounded-full bg-violet-600 ring-4 ring-white dark:ring-gray-950" />
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{job.role} · {job.company}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{job.start} — {job.end}</span>
                  </div>
                  <ul className="mt-3 list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    {job.points.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Projects" title="Things I’ve built" />
          {loadingProjects ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading projects…</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(projects.length ? projects : fallbackProjects).map((p, i) => (
                <article key={(p.id || p._id || i)} className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="h-40 bg-gradient-to-tr from-violet-100 to-blue-100 dark:from-violet-950 dark:to-blue-950" />
                  <div className="p-5">
                    <h3 className="font-semibold group-hover:underline underline-offset-4">{p.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{p.description}</p>
                    {p.tech && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-700 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-gray-700">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-violet-600 dark:text-violet-400 hover:underline">Live</a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="text-gray-700 dark:text-gray-200 hover:underline">Code</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Contact" title="Let’s build something together" subtitle="Send a quick message and I’ll reply soon." />
          <form onSubmit={onSubmitContact} className="grid grid-cols-1 gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input name="name" required className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" name="email" required className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <input name="subject" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea name="message" required rows={5} className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div className="flex items-center gap-3">
              <button disabled={contactState.loading} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50">
                {contactState.loading ? 'Sending…' : 'Send Message'}
              </button>
              {contactState.ok != null && (
                <span className={`${contactState.ok ? 'text-emerald-600' : 'text-red-600'} text-sm`}>
                  {contactState.message}
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 dark:text-gray-300 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/test" className="hover:underline">System Status</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNav('contact') }} className="hover:underline">Get in touch</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
