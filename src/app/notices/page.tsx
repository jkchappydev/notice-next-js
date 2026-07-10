import { prisma } from "@/lib/prisma"; // DB 연결 인스턴스 import
import Link from "next/link";

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
        <div className="max-w-2xl mx-auto p-4 space-y-2">
            <ul className="space-y-2">
                <div className="flex justify-end">
                    <Link
                        href="/notices/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        작성
                    </Link>
                </div>

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
