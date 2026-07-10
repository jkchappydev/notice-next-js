import Link from "next/link";

export function Header() {
    return (
        <header className="border-b">
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-bold text-lg">로고</Link>
            </div>
        </header>
    );
}