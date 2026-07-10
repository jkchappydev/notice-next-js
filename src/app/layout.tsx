import "./globals.css";
import {Header} from "@/components/Header";
import {Sidebar} from "@/components/Sidebar";

export default function RootLayout({
                                     children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">

        <body className="min-h-full">
            <Header/>
            <div className="max-w-4xl mx-auto px-6 pb-12 flex gap-8">
                <Sidebar/>
                <main className="flex-1 pt-6">{children}</main>
            </div>
        </body>

        </html>
    );
}
