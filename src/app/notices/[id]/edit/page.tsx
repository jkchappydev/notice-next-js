import {prisma} from "@/lib/prisma";
import {notFound, redirect} from "next/navigation";
import {CancelButton} from "@/components/CancelButton";
import {SubmitButton} from "@/components/SubmitButton";
import {TitleInput} from "@/components/TitleInput";

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
        <div className="space-y-2">
            <h1 className="text-xl font-bold mb-4">공지사항 수정</h1>
            <form action={updateNotice} className="space-y-4">
                <input type="hidden" name="id" value={notice.id}/>
                <TitleInput defaultValue={notice.title}></TitleInput>
                <textarea
                    name="content"
                    defaultValue={notice.content}
                    rows={8}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                <div className="flex gap-2">
                    <SubmitButton label={`수정`} message={`수정하시겠어요?`}></SubmitButton>
                    <CancelButton href={`/notices/${notice.id}`} label={`취소`} message={`취소하시겠어요?`}></CancelButton>
                </div>
            </form>
        </div>
    )
}

async function updateNotice(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title.trim() || !content.trim()) {
        throw new Error("제목과 내용을 입력해주세요.");
    }

    if (title.length > 20) {
        throw new Error("제목은 20자 이내로 입력해주세요.");
    }

    await prisma.notice.update({
        where: {id},
        data: {title, content}
    });

    redirect(`/notices/${id}`)
}