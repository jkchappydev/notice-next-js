import { prisma } from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";

// URL 파라미터 타입 — params는 나중에 값이 채워지는 Promise라 await로 꺼내서 씀
type PageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function NoticeEditPage({params}: PageProps) {
    const {id} = await params;
    const noticeId = Number(id);

    const notice = await prisma.notice.findUnique({
        where: {
            id: noticeId
        }
    });

    if (!notice) {
        notFound();
    }

    return (
        <form action={updateNotice}>
            <input type="hidden" name="id" value={notice.id}/>
            <input type="text" name="title" defaultValue={notice.title}/>
            <textarea name="content" defaultValue={notice.content} />
            <button type="submit">수정 완료</button>
        </form>
    )
}

async function updateNotice(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.notice.update({
        where: {id},
        data: {title, content}
    });

    redirect(`/notices/${id}`)
}