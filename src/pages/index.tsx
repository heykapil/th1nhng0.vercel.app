import Link from "next/link";
import moment from "moment";
import classNames from "classnames";
import { allPosts, allSnippets, Post, Snippet } from "contentlayer/generated";
import { pick } from "contentlayer/utils";
import ViewCounter from "src/components/ViewCounter";
import SnippetCard from "src/components/SnippetCard";
import useSWR from "swr";
import fetcher from "src/lib/fetcher";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAudio } from "react-use";
import TopTrackSpotify from "src/components/TopTrackSpotify";

export default function Home({
  posts,
  snippets,
}: {
  snippets: Snippet[];
  posts: Post[];
}) {
  return (
    <div className="space-y-10">
      <div className="border-b-[1px] pb-5 border-muted">
        <h1 className="text-3xl font-bold tracking-wide md:text-4xl text-text sm:leading-10 md:leading-14">
          Hello, my name is{" "}
          <Link href="/about">
            <a className="hover-underline-animation text-rose">Thịnh</a>
          </Link>
          <span className="ml-4 text-xl text-subtle">
            pronounced like{" "}
            <span className="text-rose hover-underline-animation">
              &quot;Think&quot;
            </span>
          </span>
        </h1>
        <h2 className="mt-3 font-mono md:text-lg text-subtle">
          Just a guy like to programming.
        </h2>
      </div>
      <p className="px-5 py-3 border-l-8 border-green-400 text-gl bg-green-600/50">
        <b>For guests that are not Vietnamese:</b> I will add more content in
        english soon{" "}
        <span className="mx-auto whitespace-nowrap">☆(❁´◡`❁)☆</span>
      </p>
      <NewestPost posts={posts} />
      <FeaturedSnippet snippets={snippets} />
      <TopTrackSpotify />
    </div>
  );
}

function NewestPost({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">New post</h3>
      <div className="flex flex-col gap-5 md:flex-row">
        {posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <a
              className={classNames(
                "transform hover:scale-105 duration-300 transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 ",
                {
                  "from-[#D8B4FE] to-[#818CF8]": i == 0,
                  "from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]": i == 1,
                  "from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]": i == 2,
                }
              )}
            >
              <div className="flex flex-col justify-between h-full p-4 rounded-lg bg-surface ">
                <div className="flex flex-col justify-between md:flex-row">
                  <h4 className="w-full mb-6 text-lg font-medium text-text md:text-lg sm:mb-10 ">
                    {post.title}
                  </h4>
                </div>
                <div>
                  <div className="text-subtle">
                    <ViewCounter slug={post.slug} />
                  </div>
                  <div>{moment(post.date).format("LL")}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <Link href="/blog">
        <a className="flex items-center mt-5 transition-all hover:text-text text-subtle">
          See all posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
}

function FeaturedSnippet({ snippets }: { snippets: Snippet[] }) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">My snippet</h3>
      <div className="grid gap-5 md:grid-cols-2">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} {...snippet} />
        ))}
      </div>
      <Link href="/blog">
        <a className="flex items-center mt-5 transition-all hover:text-text text-subtle">
          View all snippets
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const posts = allPosts
    .filter((post) => post.draft !== true)
    .map((post) => pick(post, ["slug", "title", "summary", "date"]))
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 3);
  const snippets = allSnippets
    .map((snippet) =>
      pick(snippet, ["description", "title", "logos", "slug", "date"])
    )
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 4);
  return { props: { posts, snippets } };
}
