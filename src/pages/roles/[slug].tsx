import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getAllRoleSlugs, getRoleBySlug, type RoleMeta } from '@/lib/resume';

type Props = {
  meta: RoleMeta;
  mdx: MDXRemoteSerializeResult;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllRoleSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || '');
  const role = getRoleBySlug(slug);
  if (!role) return { notFound: true };
  const mdx = await serialize(role.mdx, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
  });
  return { props: { meta: role.meta, mdx } };
};

export default function RolePage({ meta, mdx }: Props) {
  return (
    <>
      <Head>
        <title>{`${meta.company} — ${meta.title} | Danny Mickleburgh`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="container-responsive py-12">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          <span>Back</span>
        </Link>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100">
          {meta.company}
          <span className="mx-2 text-neutral-500">•</span>
          <span className="text-neutral-300">{meta.title}</span>
        </h1>
        <p className="mt-1 text-neutral-400">{meta.start} – {meta.end}</p>

        <article className="mdx-content max-w-none mt-6 mb-10">
          <MDXRemote {...mdx} />
        </article>
      </main>
      
    </>
  );
}
