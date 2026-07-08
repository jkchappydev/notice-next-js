// Prisma Client 인스턴스를 싱글톤으로 관리하여 반복적인 DB 연결 생성을 방지
import { PrismaClient } from "@/generated/prisma/client";

// 전역 객체에 Prisma Client를 저장하기 위한 타입 정의
const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
};

// 기존에 생성된 Prisma Client가 있으면 재사용하고, 없으면 새로 생성
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 개발 환경에서만 전역 객체에 인스턴스 저장
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}