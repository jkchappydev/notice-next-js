"use client";

import Link from "next/link";

type CancelButtonProps = {
    href: string,
    label: string,
    message: string
}

export function CancelButton({href, label, message}:CancelButtonProps) {
    return (
        <Link
            href={href}
            className="px-4 text-gray-600 hover:underline"
            onClick={(e) => {
                if (!confirm(message)) {
                    e.preventDefault();
                }
            }}
        >
            {label}
        </Link>
    )
}