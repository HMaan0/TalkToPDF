import Link from "next/link";
import React, { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
//import { CodeBlock } from './code-block';

const components: Partial<Components> = {
  pre: ({ children }) => <>{children}</>,
  ol: ({ node, children, ...props }) => {
    return (
      <ol
        className="list-decimal list-outside ml-4  marker:text-[#dc749e]"
        {...props}
      >
        {children}
      </ol>
    );
  },
  li: ({ node, children, ...props }) => {
    return (
      <li className="py-1 marker:text-[#dc749e]" {...props}>
        {children}
      </li>
    );
  },
  ul: ({ node, children, ...props }) => {
    return (
      <ul
        className="list-disc list-outside ml-10  marker:text-[#dc749e]"
        {...props}
      >
        {children}
      </ul>
    );
  },
  p: ({ node, children, ...props }) => {
    return (
      <p className="my-0.5 leading-relaxed" {...props}>
        {children}
      </p>
    );
  },
  strong: ({ node, children, ...props }) => {
    return (
      <span className="font-semibold" {...props}>
        {children}
      </span>
    );
  },
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-[#dc749e] hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  h1: ({ node, children, ...props }) => {
    return (
      <>
        <div className="mt-0 mb-8  first:block hidden ">
          <h1 className="text-[28px] font-semibold" {...props}>
            {children}
          </h1>
        </div>
        <div className="mt-8 mb-8  [&:nth-child(2)]:hidden">
          <div className="border-b border-[#dc749e] my-12 "></div>
          <h1 className="text-[28px] font-semibold" {...props}>
            {children}
          </h1>
        </div>
      </>
    );
  },
  h2: ({ node, children, ...props }) => {
    return (
      <div className="mt-8 mb-8">
        <div className="border-b border-[#dc749e] my-12 "></div>
        <h2 className="text-2xl font-semibold" {...props}>
          {children}
        </h2>
      </div>
    );
  },
  h3: ({ node, children, ...props }) => {
    return (
      <div className="mt-8 mb-8">
        <div className="border-b border-[#dc749e] my-12 "></div>
        <h3 className="text-xl font-semibold" {...props}>
          {children}
        </h3>
      </div>
    );
  },
  h4: ({ node, children, ...props }) => {
    return (
      <div className="mt-8 mb-8">
        <div className="border-b border-[#dc749e] my-12 "></div>
        <h4 className="text-lg font-semibold" {...props}>
          {children}
        </h4>
      </div>
    );
  },
  h5: ({ node, children, ...props }) => {
    return (
      <div className="mt-8 mb-8">
        <div className="border-b border-[#dc749e] my-12 "></div>
        <h5 className="text-base font-semibold" {...props}>
          {children}
        </h5>
      </div>
    );
  },
  h6: ({ node, children, ...props }) => {
    return (
      <div className="mt-8 mb-2">
        <div className="border-b border-[#dc749e] my-12 "></div>
        <h6 className="text-sm font-semibold" {...props}>
          {children}
        </h6>
      </div>
    );
  },
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
