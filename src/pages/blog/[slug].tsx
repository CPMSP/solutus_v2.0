import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../../components/Layout";
import BlogPost from "../../components/BlogPost";
import markdownToHtml from "../../utils/markdownToHtml";

interface PostProps {
  title: string;
  date: string;
  content: string;
}

const Post: React.FC<PostProps> = ({ title, date, content }) => {
  return (
    <Layout>
      <BlogPost title={title} date={date} content={content} />
    </Layout>
  );
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);

  return {
    props: {
      title: data.title,
      date: data.date,
      content: htmlContent,
    },
  };
}

export default Post;
