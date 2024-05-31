import React from "react";

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, content }) => {
  return (
    <article>
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;
