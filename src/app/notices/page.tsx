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
        <ul>
            {notices.map((notice) => (
                <li key={notice.id}>
                    <Link href={`/notices/${notice.id}`}>{notice.title}</Link>
                </li>
            ))}
        </ul>
    );
}
