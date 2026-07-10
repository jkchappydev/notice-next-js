import Link from "next/link";

type EditLinkProps = {
    href: string,
    label: string
}

export function LinkButton({href, label}: EditLinkProps) {
    return (
        <Link href={href} className="text-blue-600 hover:underline">
            {label}
        </Link>
    );
}