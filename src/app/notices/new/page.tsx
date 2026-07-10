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
                required
                maxLength={20}
                className="w-full border rounded px-3 py-2"
            />
            <textarea
                name="content"
                placeholder="내용"
                rows={8}
                required
                className="w-full border rounded px-3 py-2"
            />
            <div className="flex gap-2">
                <SubmitButton label={`등록`} message={`등록하시겠어요?`}></SubmitButton>
                <CancelButton href={`/notices`} label={`취소`} message={`취소하시겠어요?`}></CancelButton>
            </div>
        </form>
    );
}

async function createNotice(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title.trim() || !content.trim()) {
        throw new Error("제목과 내용을 입력해주세요.");
    }

    if (title.length > 20) {
        throw new Error("제목은 20자 이내로 입력해주세요.");
    }

    const notice = await prisma.notice.create({
        data: {title, content}
    });

    redirect(`/notices/${notice.id}`);
}