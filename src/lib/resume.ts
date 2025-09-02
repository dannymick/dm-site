import fs from 'node:fs';
import path from 'node:path';

export type RoleMeta = {
  slug: string;
  company: string;
  title: string;
  start: string;
  end: string;
  logo?: string | null;
};

export type EducationMeta = {
  slug: string;
  school: string;
  degree: string;
  start: string;
  end: string;
  logo?: string | null;
};

export type ResumeData = {
  roles: RoleMeta[];
  education: EducationMeta[];
  sectionsBySlug: Record<string, string>; // MDX content per role (body only)
};

const RESUME_PATH = path.join(process.cwd(), 'Resume.mdx');

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function stripParens(input: string): string {
  return input.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

export function loadResume(): ResumeData {
  const raw = fs.readFileSync(RESUME_PATH, 'utf8');

  // Find the Experience section
  const expIndex = raw.indexOf('\n## Experience');
  if (expIndex === -1) {
    return { roles: [], education: [], sectionsBySlug: {} };
  }
  const afterExp = raw.slice(expIndex);

  // Split into role sections starting with level-3 headings until next level-2
  const stopIndex = afterExp.indexOf('\n## ', 1);
  const expBody = stopIndex === -1 ? afterExp : afterExp.slice(0, stopIndex);

  const roleBlocks = expBody.split(/\n(?=###\s+)/g).filter((b) => b.trim().startsWith('###'));

  const roles: RoleMeta[] = [];
  const sectionsBySlug: Record<string, string> = {};

  for (const block of roleBlocks) {
    const lines = block.trim().split(/\n/);
    const heading = lines[0];
    // Pattern: ### Company, Location – **Title**
    const headingMatch = heading.match(/^###\s+(.+?)\s+–\s+\*\*(.+)\*\*/);
    if (!headingMatch) continue;
    const companyLoc = headingMatch[1].trim();
    const title = headingMatch[2].trim();
    const company = companyLoc.split(',')[0].trim();

    // Next non-empty line expected to be italic dates: *Month YYYY – Month YYYY*
    const dateLine = (lines.slice(1).find((l) => l.trim().length > 0) || '').trim();
    const dateMatch = dateLine.match(/^\*(.+?)\s+–\s+(.+?)\*/);
    const start = dateMatch ? dateMatch[1].trim() : '';
    const end = dateMatch ? dateMatch[2].trim() : '';

    const slug = slugify(company);

    // Body content after the date line
    const dateLineIndex = lines.findIndex((l) => l === dateLine);
    const bodyStart = dateLineIndex >= 0 ? dateLineIndex + 1 : 1;
    const body = lines.slice(bodyStart).join('\n').trim();

    roles.push({ slug, company, title, start, end });
    sectionsBySlug[slug] = body.length ? body : '';
  }

  // Logos will be attached later using a unified resolver for roles and education

  // Parse Education section
  const eduIndex = raw.indexOf('\n## Education');
  const education: EducationMeta[] = [];
  if (eduIndex !== -1) {
    const afterEdu = raw.slice(eduIndex);
    const stopEdu = afterEdu.indexOf('\n## ', 1);
    const eduBody = stopEdu === -1 ? afterEdu : afterEdu.slice(0, stopEdu);
    const eduBlocks = eduBody.split(/\n(?=###\s+)/g).filter((b) => b.trim().startsWith('###'));

    for (const block of eduBlocks) {
      const lines = block.trim().split(/\n/);
      const heading = lines[0];
      // Pattern: ### School, Location
      const headingMatch = heading.match(/^###\s+(.+?)\s*$/);
      if (!headingMatch) continue;
      const schoolLoc = headingMatch[1].trim();
      const school = schoolLoc.split(',')[0].trim();

      const dateLine = (lines.slice(1).find((l) => l.trim().startsWith('*')) || '').trim();
      const dateMatch = dateLine.match(/^\*(.+?)\s+–\s+(.+?)\*/);
      const start = dateMatch ? dateMatch[1].trim() : '';
      const end = dateMatch ? dateMatch[2].trim() : '';

      const dateLineIndex = lines.findIndex((l) => l === dateLine);
      const bodyStart = dateLineIndex >= 0 ? dateLineIndex + 1 : 1;
      const body = lines.slice(bodyStart).join('\n').trim();
      const degree = body.split(/\n/).filter(Boolean)[0] || '';

      const slug = slugify(school);
      education.push({ slug, school, degree, start, end });
    }
  }

  // Attach logo path if a matching file exists in public/logos or public root
  const logosDir = path.join(process.cwd(), 'public', 'logos');
  const publicDir = path.join(process.cwd(), 'public');
  const tryExts = ['svg', 'png', 'webp', 'jpg', 'jpeg'];

  function acronym(input: string): string {
    return input
      .replace(/[^A-Za-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .toLowerCase();
  }

  function resolveLogo(basenames: string[]): string | null {
    const bases = Array.from(new Set(basenames.map((b) => b.toLowerCase())));

    const findInDir = (dir: string, webPrefix: string): string | null => {
      if (!fs.existsSync(dir)) return null;
      const entries = fs.readdirSync(dir);
      for (const base of bases) {
        for (const entry of entries) {
          const dot = entry.lastIndexOf('.');
          if (dot <= 0) continue;
          const name = entry.slice(0, dot).toLowerCase();
          const ext = entry.slice(dot + 1).toLowerCase();
          if (name === base && tryExts.includes(ext as any)) {
            return `${webPrefix}/${entry}`.replace(/\\/g, '/');
          }
        }
      }
      return null;
    };

    // Prefer logos/ over public root.
    return findInDir(logosDir, '/logos') || findInDir(publicDir, '');
  }

  for (const r of roles) {
    const altSlug = slugify(stripParens(r.company));
    const bases = [r.slug, altSlug, acronym(r.company)];
    r.logo = resolveLogo(bases);
  }

  for (const e of education) {
    const altSlug = slugify(stripParens(e.school));
    const bases = [e.slug, altSlug, acronym(e.school)];
    e.logo = resolveLogo(bases);
  }

  return { roles, education, sectionsBySlug };
}

export function getAllRoleSlugs(): string[] {
  const { roles } = loadResume();
  return roles.map((r) => r.slug);
}

export function getRoleBySlug(slug: string): { meta: RoleMeta; mdx: string } | null {
  const { roles, sectionsBySlug } = loadResume();
  const meta = roles.find((r) => r.slug === slug);
  if (!meta) return null;
  const section = sectionsBySlug[slug] ?? '';
  return { meta, mdx: section };
}
