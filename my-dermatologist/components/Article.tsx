"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";

interface ArticleProps {
  article: {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    author: string;
    readTime: string;
    category: string;
    backLink: string;
    backLabel: string;
  };
}

export default function Article({ article }: ArticleProps) {
  return (
    <article className="py-16 bg-bg">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={article.backLink}
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            {article.backLabel}
          </Link>
          <div className="mb-8">
            <div className="inline-block bg-primary text-primary-fg px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              {article.category}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-text-muted">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-text
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-6
              prose-ul:text-text-muted prose-ul:mb-6
              prose-li:mb-2
              prose-strong:text-text prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>
      </div>
    </article>
  );
}
