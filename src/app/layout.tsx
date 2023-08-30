import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from '@/components/footer/PageFooter';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: 'Target Gap Visualiser',
  description: 'Open Earth Foundation Target Gap Visualiser',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
  )
}

