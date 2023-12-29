import Lines from "@/components/Lines";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "../context/ToastContext";
import ThemeProviderComponent from "@/providers/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SessionProviderComponent from "@/providers/SessionProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark:bg-black ${inter.className} scroll overscroll-none scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-300 scrollbar-thumb-rounded dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-800 dark:selection:bg-green-600`}
      >
        <ThemeProviderComponent>
          <SessionProviderComponent session={session}>
            <Header />
            <Lines />
            <ToasterContext />
            {children}
          </SessionProviderComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
