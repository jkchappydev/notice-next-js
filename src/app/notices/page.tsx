import {prisma} from "@/lib/prisma"; // DB 연결 인스턴스 import
import {LinkButton} from "@/components/LinkButton";
import Link from "next/link";
import {formatDate} from "@/lib/formatDate";
import {SearchButton} from "@/components/SearchButton";

type PageProps = {
    searchParams: Promise<{
        q?: string
    }>
}

// 공지 목록 페이지 컴포넌트
export default async function NoticePage({searchParams}: PageProps) {
    const {q} = await searchParams;

    // 검색어가 있을 경우에는 조건 조회, 없을 경우 공지 전체를 최신순으로 조회
    const notices = await prisma.notice.findMany({
        where: q ? {
            title: {
                contains: q,
                mode: "insensitive" // 영문 대소문자를 구분하지 않고 검색 (Postgresql 에서 필요)
            }
        } : undefined, // 삼항 연산자
        orderBy: {
            createdAt: "desc"
        }
    });

    // 조회한 목록을 리스트로 렌더링, 조회 결과가 notices 에 담김
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">공지사항</h1>
                <LinkButton href={`/notices/new`} label={`글쓰기`}></LinkButton>
            </div>
            <form className="flex gap-2">
                <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="제목 검색"
                    className="w-full border rounded px-3 py-2"
                />
                <SearchButton label="검색"></SearchButton>
            </form>
            <ul className="space-y-2">
                {notices.map((notice) => (
                    <li key={notice.id} className="border-b py-2 flex justify-between items-center">
                        <Link href={`/notices/${notice.id}`} className="hover:underline">
                            {notice.title}
                        </Link>
                        <span className="text-sm text-gray-500">
                            {formatDate(notice.createdAt)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}