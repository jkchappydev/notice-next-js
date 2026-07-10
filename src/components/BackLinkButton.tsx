import Link from "next/link";

type BackLinkProps = {
    href: string,
    label: string
}

export function BackLinkButton({href, label}: BackLinkProps) {
    return (
        <Link href={href} className="text-sm text-gray-500 hover:underline">
            {label}
        </Link>
    );
}