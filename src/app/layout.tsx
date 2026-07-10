import "./globals.css";
import {Header} from "@/components/Header";
import {Sidebar} from "@/components/Sidebar";
import {Footer} from "@/components/Footer";

export default function RootLayout({
                                     children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">

        <body>
            <div className="h-screen max-w-4xl mx-auto flex flex-col">
                <Header/>
                <div className="flex-1 overflow-y-auto flex gap-8 px-6">
                    <Sidebar/>
                    <main className="flex-1 pt-6 pb-12">{children}</main>
                </div>
                <Footer/>
            </div>
        </body>

        </html>
    );
}
