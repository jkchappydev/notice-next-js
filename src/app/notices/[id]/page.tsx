import { prisma } from "@/lib/prisma";  // DB 연결 인스턴스 import
import { notFound } from "next/navigation"; // 404 처리용 함수 import

// URL 파라미터 타입
type PageProps = {
    params: Promise<{
        id: string
    }>
}

// 공지 상세 페이지 컴포넌트

export default async function NoticeDetailPage({params}:PageProps) {
    // URL의 id 값을 숫자로 변환
    const { id } = await params;
    const noticeId = Number(id);

    // id에 해당하는 공지사항 단건 조회
    const notice = await prisma.notice.findUnique({
        where: {
            id: noticeId
        }
    });

    // 공지사항이 없으면 404 페이지로 이동
    if (!notice) {
        notFound();
    }

    // 조회한 공지사항을 화면에 출력
    return (
        <article>
            <h1>{notice.title}</h1>
            <p>{notice.content}</p>
        </article>
    )
}