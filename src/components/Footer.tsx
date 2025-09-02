import { Tooltip } from '@radix-ui/themes';
import { GitHubLogoIcon, LinkedInLogoIcon, FileTextIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur py-3">
      <div className="container-responsive flex items-center justify-between gap-3 text-sm text-neutral-400">
        <nav className="flex items-center gap-2">
          <Tooltip content="LinkedIn" sideOffset={6}>
            <a
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:text-neutral-200 hover:bg-neutral-900"
              href="https://www.linkedin.com/in/danny-mickleburgh-868b64183/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInLogoIcon className="h-5 w-5" />
            </a>
          </Tooltip>
          <Tooltip content="GitHub" sideOffset={6}>
            <a
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:text-neutral-200 hover:bg-neutral-900"
              href="https://github.com/dannymick"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
          </Tooltip>
          {/* <Tooltip content="Resume PDF" sideOffset={6}>
            <a
              aria-label="Resume PDF"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:text-neutral-200 hover:bg-neutral-900"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileTextIcon className="h-5 w-5" />
            </a>
          </Tooltip> */}
        </nav>
      </div>
    </footer>
  );
}
