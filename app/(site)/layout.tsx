import Lines from "@/components/Lines";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "../context/ToastContext";
import ThemeProviderComponent from "@/providers/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SessionProviderComponent from "@/providers/SessionProvider";
import { BoostDataProvider } from "../context/BoostContext";
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
        className={`dark:bg-black ${inter.className} scrollbar-thin scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scroll scrollbar-thumb-rounded scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 overscroll-none dark:selection:bg-green-600`}
      >
        <ThemeProviderComponent>
          <SessionProviderComponent session={session}>
            <Lines />
            <ToasterContext />
            <BoostDataProvider>{children}</BoostDataProvider>
          </SessionProviderComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
