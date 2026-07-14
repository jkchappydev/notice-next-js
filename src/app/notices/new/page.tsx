import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {CancelButton} from "@/components/CancelButton";
import {SubmitButton} from "@/components/SubmitButton";
import {TitleInput} from "@/components/TitleInput";

export default function NoticeNewPage() {
    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold mb-4">공지사항 등록</h1>
            <form action={createNotice} className="space-y-4">
                <TitleInput></TitleInput>
                <textarea
                    name="content"
                    placeholder="내용"
                    rows={8}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                <div>
                    <SubmitButton label={`등록`} message={`등록하시겠어요?`}></SubmitButton>
                    <CancelButton href={`/notices`} label={`취소`} message={`취소하시겠어요?`}></CancelButton>
                </div>
            </form>
        </div>
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