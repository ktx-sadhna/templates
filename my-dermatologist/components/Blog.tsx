"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Pagination } from "../lib/content";

interface BlogItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

interface BlogProps {
  blog: {
    heading: string;
    subtext: string;
    items: BlogItem[];
    pagination?: Pagination;
  };
}

export default function Blog({ blog }: BlogProps) {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text mb-6">
            {blog.heading}
          </h2>
          <p className="text-xl text-text-muted">
            {blog.subtext}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blog.items.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-surface rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-fg px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text">{post.author}</span>
                    <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        {blog.pagination && blog.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            {blog.pagination.prevHref && (
              <Link
                href={blog.pagination.prevHref}
                className="px-6 py-3 bg-surface border border-border rounded-full font-semibold text-text hover:border-primary hover:text-primary transition-colors"
              >
                Previous
              </Link>
            )}
            <span className="text-text-muted">
              Page {blog.pagination.currentPage} of {blog.pagination.totalPages}
            </span>
            {blog.pagination.nextHref && (
              <Link
                href={blog.pagination.nextHref}
                className="px-6 py-3 bg-primary text-primary-fg rounded-full font-semibold hover:bg-accent hover:text-accent-fg transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
