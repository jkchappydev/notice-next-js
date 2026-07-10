import "./globals.css";
import {Sidebar} from "@/components/Sidebar";
import {Header} from "@/components/Header";

export default function RootLayout({
                                     children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">

        <body className="min-h-full flex flex-col">
            <Header/>
            <div className="flex flex-1">
                <Sidebar/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </body>

        </html>
    );
}
