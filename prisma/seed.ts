import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.notice.createMany({
        data: [
            {
                title: "첫 번째 공지",
                content: "첫 번째 공지 테스트 내용"
            },
            {
                title: "두 번째 공지",
                content: "두 번째 공지 테스트 내용"
            }
        ]
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });