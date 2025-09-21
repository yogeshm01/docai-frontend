import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -left-32 top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="absolute -right-32 top-28 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl" />
                </div>
                <div className="container mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-1 text-xs text-blue-700">
                            AI Document Platform
                        </div>
                        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Manage Your Documents Intelligently with AI
                        </h1>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80">
                            Upload, update, and query your documents using powerful AI—all in one seamless platform.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link to="/dashboard" className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring">
                                Try it now
                            </Link>
                            <a href="#features" className="inline-flex items-center rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground">
                                Explore features
                            </a>
                        </div>
                        <p className="mt-6 text-xs text-foreground/60">No credit card required</p>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative">
                        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:from-blue-500/10 dark:to-indigo-500/10">
                                <svg viewBox="0 0 560 400" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#2563eb" />
                                            <stop offset="100%" stopColor="#4f46e5" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="0" y="0" width="560" height="400" rx="16" fill="url(#g1)" opacity="0.08" />
                                    <g>
                                        <rect x="40" y="40" width="320" height="240" rx="12" fill="#ffffff" opacity="0.9" />
                                        <rect x="64" y="72" width="200" height="16" rx="8" fill="#c7d2fe" />
                                        <rect x="64" y="104" width="256" height="12" rx="6" fill="#e0e7ff" />
                                        <rect x="64" y="128" width="210" height="12" rx="6" fill="#e0e7ff" />
                                        <rect x="64" y="152" width="232" height="12" rx="6" fill="#e0e7ff" />
                                        <rect x="64" y="192" width="96" height="28" rx="8" fill="#6366f1" />
                                        <rect x="168" y="192" width="96" height="28" rx="8" fill="#3b82f6" />
                                    </g>
                                    <g>
                                        <rect x="384" y="80" width="136" height="136" rx="16" fill="#eef2ff" />
                                        <g transform="translate(384,80)">
                                            <circle cx="68" cy="68" r="58" fill="none" stroke="#6366f1" strokeDasharray="6 8" />
                                            <circle cx="68" cy="68" r="32" fill="#dbeafe" />
                                            <path d="M56 68h24M68 56v24" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                                        </g>
                                    </g>
                                    <g>
                                        <rect x="40" y="304" width="112" height="20" rx="10" fill="#dbeafe" />
                                        <rect x="160" y="304" width="72" height="20" rx="10" fill="#e0e7ff" />
                                        <rect x="240" y="304" width="72" height="20" rx="10" fill="#dbeafe" />
                                        <rect x="320" y="304" width="72" height="20" rx="10" fill="#e0e7ff" />
                                    </g>
                                </svg>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-foreground/60">
                                <div className="rounded border border-blue-200/40 bg-blue-50/40 px-2 py-1 dark:border-blue-500/20 dark:bg-blue-500/10">Upload</div>
                                <div className="rounded border border-indigo-200/40 bg-indigo-50/40 px-2 py-1 dark:border-indigo-500/20 dark:bg-indigo-500/10">Update</div>
                                <div className="rounded border border-violet-200/40 bg-violet-50/40 px-2 py-1 dark:border-violet-500/20 dark:bg-violet-500/10">Query</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logos */}
            <section className="border-y border-border/60 bg-card/40">
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-5">
                        {[
                            "Dropbox",
                            "Notion",
                            "Google Drive",
                            "OneDrive",
                            "Slack",
                        ].map((name) => (
                            <div key={name} className="flex items-center justify-center">
                                <div className="text-sm font-semibold tracking-wide text-foreground/60">{name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="container mx-auto px-4 py-20">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Manage and interact with PDFs intelligently</h2>
                    <p className="mt-3 text-foreground/75">Upload, edit, and query your documents with AI-powered assistance.</p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "PDF Upload & Editing",
                            desc: "Seamlessly upload and edit PDF files with an intuitive interface.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 3v12" />
                                    <path d="M8 11l4 4 4-4" />
                                    <rect x="4" y="17" width="16" height="4" rx="1" />
                                </svg>
                            ),
                        },
                        {
                            title: "AI-Powered Q&A",
                            desc: "Ask questions about your documents and get fast, context-aware responses.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 8h10M7 12h7" />
                                    <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                </svg>
                            ),
                        },
                        {
                            title: "Secure Authentication",
                            desc: "Authenticate users securely to protect your documents and data.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="10" rx="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            ),
                        },
                        {
                            title: "Persistent Storage",
                            desc: "Store your PDFs and data reliably using SQLite3 database.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="7" />
                                    <path d="M12 9v3l2 2" />
                                </svg>
                            ),
                        },
                        {
                            title: "Document Parsing",
                            desc: "Automatically parse documents for better AI understanding and retrieval.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12a9 9 0 1 1-9-9" />
                                    <path d="M21 3v6h-6" />
                                </svg>
                            ),
                        },
                        {
                            title: "REST API Integration",
                            desc: "Smooth backend communication enabling fast and reliable workflows.",
                            icon: (
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 3v18h18" />
                                    <rect x="7" y="9" width="3" height="6" />
                                    <rect x="12" y="7" width="3" height="8" />
                                    <rect x="17" y="11" width="3" height="4" />
                                </svg>
                            ),
                        },
                    ].map((f) => (
                        <div key={f.title} className="group rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 ring-1 ring-blue-600/20">
                                {f.icon}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm text-foreground/70">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* How it works */}
            <section id="how" className="bg-card/40 py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From upload to answers</h2>
                        <p className="mt-3 text-foreground/75">Three simple steps to value.</p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {[
                            {
                                step: "1",
                                title: "Upload",
                                desc: "Bring PDFs, docs, and websites. We parse and structure your data automatically.",
                            },
                            {
                                step: "2",
                                title: "Manage & Secure",
                                desc: "Organize documents, set permissions, and ensure secure access.",
                            },
                            {
                                step: "3",
                                title: "Ask AI",
                                desc: "Interact with your documents through AI-powered natural language questions and get precise answers.",
                            },
                        ].map((s) => (
                            <div key={s.step} className="relative rounded-xl border border-border bg-background p-6 shadow-sm">
                                <div className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white shadow">
                                    {s.step}
                                </div>
                                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                                <p className="mt-2 text-sm text-foreground/70">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="container mx-auto px-4 py-20">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Teams love DocAI</h2>
    <p className="mt-3 text-foreground/75">Real feedback from users working with PDFs smarter.</p>
  </div>
  <div className="mt-12 grid gap-6 md:grid-cols-3">
    {[
      {
        name: "Ava Thompson",
        role: "Operations Manager",
        quote: "Uploading and managing PDFs has never been easier. The AI answers save us so much time.",
        rating: 5,
      },
      {
        name: "Miguel Santos",
        role: "Customer Support Lead",
        quote: "The AI Q&A feature helps our team find document insights instantly with reliable citations.",
        rating: 4,
      },
      {
        name: "Jin Park",
        role: "CTO",
        quote: "Secure authentication and permissions gave us confidence for full enterprise adoption.",
        rating: 5,
      },
    ].map((t) => (
      <figure key={t.name} className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <blockquote className="text-sm text-foreground/80">“{t.quote}”</blockquote>
        <div className="mt-3 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < t.rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 1 L12 7 L18 7 L13 11 L15 17 L10 13 L5 17 L7 11 L2 7 L8 7 Z" />
            </svg>
          ))}
        </div>
        <figcaption className="mt-4 text-sm font-medium">
          <span className="block">{t.name}</span>
          <span className="block text-foreground/60">{t.role}</span>
        </figcaption>
      </figure>
    ))}
  </div>
</section>


            {/* CTA */}
            <section className="relative overflow-hidden py-20">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-blue-600/10 blur-2xl" />
                </div>
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    <h3 className="text-2xl font-bold">Start managing documents with intelligence</h3>
                    <p className="mt-3 text-foreground/75">Join now and transform how your team finds and uses information.</p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <Link to="/app" className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring">
                            Try it now
                        </Link>
                        <a href="#features" className="inline-flex items-center rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground">
                            Learn more
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
