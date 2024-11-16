// app/page.js

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Analytics } from "@vercel/analytics/react";

// 사용자의 언어에 맞는 폴더만 탐색하는 함수
const getFilesByLanguage = (lang) => {
    const dir = path.join(process.cwd(), "content", lang); // 언어에 맞는 경로

    if (!fs.existsSync(dir)) {
        return [];
    }

    const files = fs.readdirSync(dir); // 해당 폴더 내 파일들 읽기

    let mdFiles = [];

    files.forEach((file) => {
        const filePath = path.join(dir, file); // 전체 경로를 얻음

        const stat = fs.statSync(filePath); // 파일/디렉토리 여부 확인

        if (stat.isDirectory()) {
            // 디렉토리라면 재귀 호출하여 그 안의 파일을 찾는다
            mdFiles = [
                ...mdFiles,
                ...getFilesByLanguage(path.join(file)), // lang을 다시 포함시키지 않음
            ];
        } else if (file.endsWith(".md")) {
            // .md 파일만 선택
            mdFiles.push(filePath);
        }
    });

    console.log(`mdFiles`, mdFiles);

    return mdFiles;
};

// SSR Functional Component
export default async function HomePage() {
    // 사용자의 언어 설정을 예시로 'ko'로 설정 (실제로는 브라우저 언어나 URL 파라미터 등으로 동적으로 설정될 수 있음)
    const userLang = "en"; // 예시: 'en', 'ko', 등으로 동적으로 설정될 수 있음
    // 현재 주소창에 적는 것은 404 나옴.(라우팅이 안 된 듯)

    // 선택된 언어 폴더 내의 .md 파일만 가져오기
    const files = getFilesByLanguage(userLang);
    console.log(`files`, files);

    const posts = files.map((filename) => {
        // slug를 상대경로로 수정 (content 폴더로부터의 상대경로)
        const relativePath = path.relative(
            path.join(process.cwd(), "content"),
            filename
        );
        // const slug = relativePath.replace(".md", ""); // .md 확장자 제거
        const slug = relativePath
            .replace(".md", "")
            .replace(/\\/g, "/")
            .replace(/^ko\//, "");
        console.log(`slug`, slug);

        const markdownWithMeta = fs.readFileSync(filename, "utf-8"); // 파일 읽기
        const { data: frontmatter } = matter(markdownWithMeta);

        // Markdown 콘텐츠를 HTML로 변환
        const processedContent = remark()
            .use(html)
            .processSync(markdownWithMeta);
        const contentHtml = processedContent.toString();

        // 첫 번째 이미지를 섬네일로 추출
        const firstImageMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/);
        const thumbnail = firstImageMatch ? firstImageMatch[1] : null;

        // 포스트 데이터 반환
        return {
            slug,
            title: frontmatter.title || "Untitled",
            category: frontmatter.category || "Uncategorized",
            date: frontmatter.date || "No Date",
            thumbnail,
        };
    });

    // 유효한 포스트만 필터링
    const validPosts = posts.filter((post) => {
        return (
            post.title !== "Untitled" &&
            post.title.trim() !== "" &&
            post.date !== "No Date" &&
            post.date.trim() !== ""
        );
    });

    // 날짜 기준으로 정렬 (최신 순)
    validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <section className="grid min-h-screen p-8 place-items-center">
                <div className="container grid grid-cols-1 gap-8 my-auto sm:grid-cols-2 lg:grid-cols-2">
                    {validPosts.length === 0 ? (
                        <div>작성된 포스트가 없습니다.</div>
                    ) : (
                        validPosts.map((post) => (
                            <div
                                key={post.slug}
                                className="relative flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2"
                            >
                                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 m-0 p-4">
                                    <a href={`/posts/${userLang}/${post.slug}`}>
                                        <img
                                            src={
                                                post.thumbnail ||
                                                "https://placehold.co/600x400"
                                            }
                                            alt={`Thumbnail for ${post.title}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </a>
                                </div>
                                <div className="p-6 px-2 sm:pr-6 sm:pl-4">
                                    <p className="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 !font-semibold">
                                        {post.category}
                                    </p>
                                    <a
                                        href={`/posts/${userLang}/${post.slug}`}
                                        className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700"
                                    >
                                        {post.title}
                                    </a>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 !font-semibold">
                                                June
                                            </p>
                                            <p className="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">
                                                {post.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <Analytics />
        </>
    );
}
