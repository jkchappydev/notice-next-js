import {prisma} from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";
import {CancelButton} from "@/components/CancelButton";
import {SubmitButton} from "@/components/SubmitButton";

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
        <form action={updateNotice} className="max-w-2xl mx-auto p-4 space-y-4">
            <input type="hidden" name="id" value={notice.id}/>
            <input
                type="text"
                name="title"
                defaultValue={notice.title}
                className="w-full border rounded px-3 py-2"
            />
            <textarea
                name="content"
                defaultValue={notice.content}
                rows={8}
                className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-2">
                <SubmitButton label={`수정`} message={`수정하시겠어요?`}></SubmitButton>
                <CancelButton href={`/notices/${notice.id}`} label={`취소`} message={`취소하시겠어요?`}></CancelButton>
            </div>
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