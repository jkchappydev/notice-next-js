import {prisma} from "@/lib/prisma"; // DB 연결 인스턴스 import
import {notFound, redirect} from "next/navigation";
import {DeleteButton} from "@/components/DeleteButton";
import {LinkButton} from "@/components/LinkButton";
import {BackLinkButton} from "@/components/BackLinkButton";

// URL 파라미터 타입
type PageProps = {
    params: Promise<{
        id: string
    }>
}

// 공지 상세 페이지 컴포넌트
export default async function NoticeDetailPage({params}:PageProps) {
    // URL의 id 값을 숫자로 변환
    // 매개변수가 {params}:PageProps
    // 1.
    // const resolveParam = await params;
    // const noticeId = Number(resolveParam.id);
    // 2.
    const {id} = await params;
    const noticeId = Number(id);

    // 매개변수가 props:PageProps
    // 1.
    // const resolveParam = await props.params;
    // const noticeId = Number(resolveParam.id);
    // 2.
    // const {id} = await props.params;
    // const noticeId = Number(id);

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
            <h1 className="text-2xl font-bold mb-4">{notice.title}</h1>
            <p className="whitespace-pre-wrap mb-6">{notice.content}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <LinkButton href={`/notices/${notice.id}/edit`} label={`수정하기`}></LinkButton>
                    <form action={deleteNotice}>
                        <input type="hidden" name="id" value={notice.id}/>
                        <DeleteButton label={`삭제`} message={`정말 삭제하시겠어요?`}></DeleteButton>
                    </form>
                </div>
                <BackLinkButton href={`/notices`} label={`← 목록으로`}></BackLinkButton>
            </div>
        </article>
    )
}

async function deleteNotice(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));

    await prisma.notice.delete({
        where: {id}
    });

    redirect(`/notices`);
}