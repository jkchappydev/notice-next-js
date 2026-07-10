import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="w-40 shrink-0 border-r pr-6">
            <nav className="space-y-2 pt-6">
                <Link href="/notices" className="block hover:underline">공지사항</Link>
            </nav>
        </aside>
    );
}
