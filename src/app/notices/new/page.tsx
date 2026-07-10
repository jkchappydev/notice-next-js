import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {CancelButton} from "@/components/CancelButton";
import {SubmitButton} from "@/components/SubmitButton";

export default function NoticeNewPage() {
    return (
        <form action={createNotice} className="max-w-2xl mx-auto p-4 space-y-4">
            <input
                type="text"
                name="title"
                placeholder="제목"
                className="w-full border rounded px-3 py-2"
            />
            <textarea
                name="content"
                placeholder="내용"
                rows={8}
                className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-2">
                <SubmitButton label={`작성 완료`}></SubmitButton>
                <CancelButton href={`/notices`} label={`취소`}></CancelButton>
            </div>
        </form>
    );
}

async function createNotice(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const notice = await prisma.notice.create({
        data: {title, content}
    });

    redirect(`/notices/${notice.id}`);
}