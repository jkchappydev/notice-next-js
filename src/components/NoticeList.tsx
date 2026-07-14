"use client";

import {Notice} from "@/generated/prisma/client";
import {useState} from "react";
import Link from "next/link";
import {formatDate} from "@/lib/formatDate";

type NoticeListProps = {
    notices: Notice[]
}

export function NoticeList({notices}: NoticeListProps) {
    const [search, setSearch] = useState("");

    const filtered = notices.filter((notice) =>
        notice.title.includes(search)
    );

    return (
        <div className="space-y-2">
            <input
                type="text"
                placeholder="제목 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded px-3 py-2"
            />
            <ul className="space-y-2">
                {filtered.map((notice) => (
                    <li key={notice.id} className="border-b py-2 flex justify-between items-center">
                        <Link href={`/notices/${notice.id}`} className="hover:underline">
                            {notice.title}
                        </Link>
                        <span className="text-sm text-gray-500">
                            {formatDate(notice.createdAt)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}