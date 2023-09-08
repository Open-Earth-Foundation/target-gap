import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer/PageFooter";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "DIGS Data Explorer",
  description:
    "Using data available at OpenClimate, we&apos;ve conducted a Digitally Enabled Independent Global Stocktake exercise to spotlight the alignment and gaps between climate targets and actions of nations, regions, and cities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <ThemeRegistry>
          <Navbar />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
