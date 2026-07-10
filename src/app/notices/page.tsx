import { prisma } from "@/lib/prisma"; // DB 연결 인스턴스 import
import Link from "next/link";
import {LinkButton} from "@/components/LinkButton";

// 공지 목록 페이지 컴포넌트
export default async function NoticePage() {
    // 공지 전체를 최신순으로 조회
    const notices = await prisma.notice.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    // 조회한 목록을 리스트로 렌더링
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">공지사항</h1>
                <LinkButton href={`/notices/new`} label={`글쓰기`}></LinkButton>
            </div>
            <ul className="space-y-2">
                {notices.map((notice) => (
                    <li key={notice.id} className="border-b py-2">
                        <Link href={`/notices/${notice.id}`} className="hover:underline">
                            {notice.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}