import {prisma} from "@/lib/prisma";
import Link from "next/link";
import {redirect} from "next/navigation";

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
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    작성 완료
                </button>
                <Link
                    href="/notices"
                    className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-50"
                >
                    취소
                </Link>
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