import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from '@/components/footer/PageFooter';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600"],
})

export const metadata = {
  title: 'Target Gap Visualiser',
  description: 'arget Gap Visualiser',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
