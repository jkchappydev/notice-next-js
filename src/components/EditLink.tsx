import Link from "next/link";

type EditLinkProps = {
    href: string
}

export function EditLink({href}: EditLinkProps) {
    return (
        <Link href={href} className="text-blue-600 hover:underline">
            수정
        </Link>
    );
}