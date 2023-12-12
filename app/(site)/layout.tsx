import Lines from "@/components/Lines";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "../context/ToastContext";
import ThemeProviderComponent from "@/providers/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SessionProviderComponent from "@/providers/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProviderComponent>
          <SessionProviderComponent session={session}>
            <Lines />
            <ToasterContext />
            {children}
          </SessionProviderComponent>
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
