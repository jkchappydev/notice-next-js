// src/components/Sidebar.tsx
import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-48 border-r p-4 space-y-2">
            <Link href={`/notices`} className="block hover:underline">공지사항</Link>
        </aside>
    );
}