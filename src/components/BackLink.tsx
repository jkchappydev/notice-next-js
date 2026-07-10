import Link from "next/link";

type BackLinkProps = {
    href: string
}

export function BackLink({href}: BackLinkProps) {
    return (
        <Link href={href} className="text-sm text-gray-500 hover:underline">
            ← 목록으로
        </Link>
    );
}