import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import { loadResume, type RoleMeta, type EducationMeta } from '@/lib/resume';

type Props = { roles: RoleMeta[]; education: EducationMeta[] };

export async function getStaticProps() {
  const { roles, education } = loadResume();
  return { props: { roles, education } };
}

function yearsOf({ start, end }: { start: string; end: string }) {
  const y = (s: string) => (s.match(/(\d{4})/)?.[1] ?? '').trim();
  const a = y(start);
  const b = y(end);
  return a && b ? `${a}-${b}` : a || b || '';
}

export default function Home({ roles, education }: Props) {
  return (
    <>
      <Head>
        <title>Danny Mickleburgh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container-responsive py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Danny Mickleburgh</h1>
        <p>Engineer, Designer</p>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Experience</h2>
        <div className="mt-4">
          {roles.map((r) => (
            <Link key={r.slug} href={`/roles/${r.slug}`} className="group block">
              <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-3 px-2 sm:px-0 py-4 border-b border-neutral-800 last:border-b-0 transition-colors group-hover:bg-neutral-900/40 rounded-none">
                <div className="pt-0.5">
                  <Logo slug={r.slug} label={r.company} src={r.logo ?? undefined} />
                </div>
                <div>
                  <div className="text-lg font-medium text-neutral-100 flex items-center">
                    <span>{r.company}</span>
                    <span className="hidden sm:inline mx-2 text-neutral-500">•</span>
                    <span className="hidden sm:inline text-neutral-400">{r.title}</span>
                  </div>
                  <div className="sm:hidden text-sm text-neutral-500 mt-0.5">
                    <span className="text-neutral-300">{r.title}</span>
                  </div>
                  <div className="sm:hidden text-sm text-neutral-500 mt-0.5">{r.start} – {r.end}</div>
                </div>
                <div className="hidden sm:block text-sm text-neutral-500 group-hover:text-neutral-300">{yearsOf(r)} →</div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight">Education</h2>
        <div className="mt-4">
          {education.map((e) => (
            <div key={e.slug} className="grid grid-cols-[auto_1fr] items-start gap-3 py-4 border-b border-neutral-800 last:border-b-0">
              <div className="pt-0.5">
                <Logo slug={e.slug} label={e.school} src={e.logo ?? undefined} />
              </div>
              <div>
                <div className="text-lg font-medium text-neutral-100">{e.school}</div>
                <div className="sm:hidden text-sm text-neutral-500 mt-0.5">
                  <span className="text-neutral-300">{e.degree}</span>
                  <span className="mx-2 text-neutral-600">•</span>
                  {e.start} – {e.end}
                </div>
                <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-500 mt-0.5">
                  <span className="text-neutral-300">{e.degree}</span>
                  <span className="text-neutral-600">•</span>
                  <span>{e.start} – {e.end}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
