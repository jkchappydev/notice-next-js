import Link from "next/link";

type CancelButtonProps = {
    href: string
}

export function CancelButton({href}:CancelButtonProps) {
    return (
        <Link
            href={href}
            className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-50"
        >
            취소
        </Link>
    )
}