// /app/posts/[slug]/page.js

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// 카테고리 데이터를 불러오는 함수
const loadCategories = () => {
    const categoriesFilePath = path.join(process.cwd(), "content", "categories.json");
    const categoriesData = fs.readFileSync(categoriesFilePath, "utf-8");
    return JSON.parse(categoriesData);
};

export default async function PostPage({ params }) {
    const { slug } = params;

    // 포스트 파일 경로
    const filePath = path.join(process.cwd(), "content", `${slug}.md`);

    // 포스트 파일이 존재하고 유효한지 확인
    if (!fs.existsSync(filePath)) {
        return <h1>포스트를 찾을 수 없습니다.</h1>; // 포스트가 없을 경우 메시지
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);

    // 제목이나 날짜가 없는 경우 처리
    if (!frontmatter.title || !frontmatter.date) {
        return <h1>유효하지 않은 포스트입니다.</h1>; // 제목이나 날짜가 없을 경우 메시지
    }

    // 카테고리 데이터 로드
    const categories = loadCategories();
    const postCategory = categories.find(category => category.slug === frontmatter.category);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 md:w-2/3 mx-auto">
                        <div className="h-full rounded-xl bg-white overflow-hidden">
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                    {postCategory ? postCategory.name : "카테고리 없음"}
                                </h2>
                                <h1 className="title-font text-2xl font-medium text-gray-600 mb-4">
                                    {frontmatter.title}
                                </h1>
                                <p className="leading-relaxed text-gray-500 mb-4">
                                    {frontmatter.date}
                                </p>
                                <div className="leading-relaxed text-gray-700">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: marked(content) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
