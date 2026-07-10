import Link from "next/link";

export function Header() {
    return (
        <header className="border-b p-4">
            <Link href="/" className="font-bold text-lg">로고</Link>
        </header>
    );
}