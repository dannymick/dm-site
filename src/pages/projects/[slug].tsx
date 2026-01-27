import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getAllProjectSlugs, getProjectBySlug, type ProjectMeta } from '@/lib/resume';
import MdxImage from '@/components/MdxImage';

type Props = {
  meta: ProjectMeta;
  mdx: MDXRemoteSerializeResult;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllProjectSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || '');
  const project = getProjectBySlug(slug);
  if (!project) return { notFound: true };
  const mdx = await serialize(project.mdx, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });
  return { props: { meta: project.meta, mdx } };
};

export default function ProjectPage({ meta, mdx }: Props) {
  return (
    <>
      <Head>
        <title>{`${meta.name} | Danny Mickleburgh`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container-responsive py-12">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          <span>Back</span>
        </Link>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100">
          {meta.name}
        </h1>
        {meta.subtitle ? <p className="mt-1 text-neutral-400">{meta.subtitle}</p> : null}

        <article className="mdx-content max-w-none mt-6 mb-10">
          <MDXRemote
            {...mdx}
            components={{
              img: (props) => <MdxImage {...(props as any)} />,
            }}
          />
        </article>
      </main>
    </>
  );
}
