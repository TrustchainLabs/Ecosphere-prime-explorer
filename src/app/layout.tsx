import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ecosphere Prime App',
  description: 'Ecosphere Hyper-local Climate Intelligence Oracle'
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
