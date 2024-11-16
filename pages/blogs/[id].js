import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import marked from "marked";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function BlogPost() {
  const [content, setContent] = useState("");
  const { query } = useRouter();

  useEffect(() => {
    if (query.id) {
      fetch(`/blogs/${query.id}.md`)
        .then((res) => res.text())
        .then((text) => setContent(marked(text)))
        .catch((err) => console.error(err));
    }
  }, [query.id]);

  return (
    <div>
      <Header />
      <main className="flex flex-col md:flex-row gap-6">
        <section className="flex-1">
          <article className="bg-white shadow-md rounded-md p-6">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </section>
        <Sidebar />
      </main>
    </div>
  );
}
