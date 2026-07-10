import Link from "next/link";

type CancelButtonProps = {
    href: string,
    label: string
}

export function CancelButton({href, label}:CancelButtonProps) {
    return (
        <Link
            href={href}
            className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-50"
        >
            {label}
        </Link>
    )
}