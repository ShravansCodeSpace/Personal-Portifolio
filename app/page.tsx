import Image from "next/image";
import { Download, ExternalLink, Mail } from "lucide-react";
import { achievements, certifications, experiences, modules, profile, skillGroups } from "@/lib/content";
import { ContactForm, FeedbackForm } from "@/components/Forms";
import { Header } from "@/components/Header";
import { Tracker } from "@/components/Tracker";
import { TrackLink } from "@/components/TrackLink";

function CharacterAccent() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]" aria-hidden>
      <div className="absolute inset-6 rounded-[34%_46%_40%_44%] border" style={{ borderColor: "var(--border)" }} />
      <div className="absolute left-1/2 top-12 h-28 w-36 -translate-x-1/2 rounded-[38%_42%_36%_40%] border-2" style={{ borderColor: "var(--primary)" }} />
      <div className="absolute left-[42%] top-24 size-3 rounded-full" style={{ background: "var(--secondary)" }} />
      <div className="absolute left-[56%] top-24 size-3 rounded-full" style={{ background: "var(--secondary)" }} />
      <div className="absolute left-1/2 top-44 h-32 w-48 -translate-x-1/2 rounded-[42%_44%_24%_28%] border-2" style={{ borderColor: "var(--primary)" }} />
      <div className="absolute left-[52%] top-52 h-3 w-36 -rotate-12 rounded-full" style={{ background: "var(--secondary)" }} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <Tracker />
      <main id="top">
        <section className="section-block overflow-hidden">
          <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <p className="eyebrow">{profile.title} · {profile.location}</p>
              <h1 className="heading-xl">{profile.name}</h1>
              <p className="mt-4 text-xl font-medium">{profile.valueProp}</p>
              <p className="muted mt-4 max-w-2xl">{profile.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="button button-primary" href="#modules">View projects</a>
                <TrackLink className="button button-secondary" href="/resume.pdf" eventType="resume_download">
                  <Download size={16} />
                  Download resume
                </TrackLink>
                <TrackLink className="button button-secondary" href={`mailto:${profile.email}`} eventType="email_click">
                  <Mail size={16} />
                  Email
                </TrackLink>
                <TrackLink className="button button-secondary" href={profile.linkedin} target="_blank" rel="noopener" eventType="linkedin_click">
                  <ExternalLink size={16} />
                  LinkedIn
                </TrackLink>
              </div>
              <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {profile.stats.map((stat) => (
                  <div className="card" key={stat.label}>
                    <dt className="text-3xl font-semibold" style={{ color: "var(--primary)" }}>{stat.value}</dt>
                    <dd className="muted text-sm">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <Image
                src="/assets/commerce-cloud-hero.webp"
                width={900}
                height={620}
                priority
                alt="Abstract commerce cloud architecture visualization"
                className="rounded-lg border object-cover shadow-card dark:shadow-cardDark"
                style={{ borderColor: "var(--border)" }}
              />
            </div>
          </div>
        </section>

        <section className="section-block border-t" id="about" style={{ borderColor: "var(--border)" }}>
          <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr]">
            <CharacterAccent />
            <div>
              <p className="eyebrow">About</p>
              <h2 className="heading-lg">A commerce engineer who connects platform depth with launch ownership.</h2>
              <p className="muted mt-4">
                I specialize in SAP Commerce Cloud delivery for enterprise storefronts, mobile integrations, authentication, checkout,
                reporting, and operational tooling. My work spans Samsung, HPE, and DENTSPLY Sirona programs, with hands-on ownership from
                technical design and implementation through production support.
              </p>
            </div>
          </div>
        </section>

        <section className="section-block" id="skills">
          <div className="container-shell">
            <p className="eyebrow">Skills / tech stack</p>
            <h2 className="heading-lg">Grouped capabilities for SAP Commerce delivery.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className="card card-hover" key={group.title}>
                    <Icon aria-hidden size={24} style={{ color: "var(--primary)" }} />
                    <h3 className="heading-md mt-4">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-block border-y" id="experience" style={{ borderColor: "var(--border)" }}>
          <div className="container-shell">
            <p className="eyebrow">Experience / timeline</p>
            <h2 className="heading-lg">Reverse-chronological delivery history.</h2>
            <div className="mt-8 grid gap-4">
              {experiences.map((experience) => (
                <article className="card grid gap-3 md:grid-cols-[220px_1fr]" key={`${experience.company}-${experience.dates}`}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>{experience.dates}</p>
                    <p className="muted text-sm">{experience.company}</p>
                  </div>
                  <div>
                    <h3 className="heading-md">{experience.role}</h3>
                    <p className="muted mt-2">{experience.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block" id="modules">
          <div className="container-shell">
            <p className="eyebrow">Modules / projects worked on</p>
            <h2 className="heading-lg">SAP Commerce modules translated into business capability.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <article className="card card-hover" key={module.title}>
                    <Icon aria-hidden size={22} style={{ color: "var(--secondary)" }} />
                    <h3 className="heading-md mt-4">{module.title}</h3>
                    <p className="muted mt-2 text-sm">{module.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {module.tags.map((tag) => <span className="tag text-xs" key={tag}>{tag}</span>)}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-block border-y" id="achievements" style={{ borderColor: "var(--border)" }}>
          <div className="container-shell">
            <p className="eyebrow">Achievements</p>
            <h2 className="heading-lg">Signals of ownership, scale, and credibility.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <article className="card card-hover" key={achievement.title}>
                    <Icon aria-hidden size={24} style={{ color: "var(--primary)" }} />
                    <h3 className="heading-md mt-4">{achievement.title}</h3>
                    <p className="mt-2 font-semibold" style={{ color: "var(--secondary)" }}>{achievement.metric}</p>
                    <p className="muted mt-2 text-sm">{achievement.detail}</p>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {certifications.map((certification) => {
                const Icon = certification.icon;
                return (
                  <article className="card card-hover flex items-start gap-4" key={certification.name}>
                    <Icon aria-hidden size={26} style={{ color: "var(--primary)" }} />
                    <div>
                      <h3 className="heading-md">{certification.name}</h3>
                      <p className="muted">{certification.issuer} · {certification.date}</p>
                      <p className="muted mt-2 text-sm">{certification.focus}</p>
                      <a className="mt-4 inline-flex text-sm font-semibold" href={certification.href} target="_blank" rel="noopener" style={{ color: "var(--primary)" }}>
                        View certificate
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-block" id="contact">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="heading-lg">Start a conversation about SAP Commerce delivery.</h2>
              <p className="muted mt-4">
                Reach me by email or LinkedIn. The form records submissions through the configured serverless route and Supabase table.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackLink className="button button-primary" href={`mailto:${profile.email}`} eventType="email_click">{profile.email}</TrackLink>
                <TrackLink className="button button-secondary" href={profile.linkedin} target="_blank" rel="noopener" eventType="linkedin_click">LinkedIn profile</TrackLink>
                <a className="button button-secondary" href="/dashboard">Owner login</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="section-block border-y" id="feedback" style={{ borderColor: "var(--border)" }}>
          <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <p className="eyebrow">Visitor feedback</p>
              <h2 className="heading-lg">Share quick feedback about the portfolio.</h2>
              <p className="muted mt-4">Feedback is stored in Supabase when configured and appears in the owner dashboard.</p>
            </div>
            <FeedbackForm />
          </div>
        </section>

      </main>
      <footer className="border-t py-6" style={{ borderColor: "var(--border)" }}>
        <div className="container-shell flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="muted">© {new Date().getFullYear()} {profile.name}. SAP Commerce Cloud specialist.</p>
          <a href="#top" className="font-medium" style={{ color: "var(--primary)" }}>Back to top</a>
        </div>
      </footer>
    </>
  );
}
