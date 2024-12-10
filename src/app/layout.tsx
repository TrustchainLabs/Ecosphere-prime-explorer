import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider, ThemeConfig } from 'antd'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ecosphere Prime App',
  description: 'Ecosphere Hyper-local Climate Intelligence Oracle'
}

const inter = Inter({ subsets: ['latin'] })

const theme: ThemeConfig = {
  components: {
    DatePicker: {
      colorPrimary: 'var(--primary-color)',
      cellActiveWithRangeBg: 'var(--primary-color)',
      cellBgDisabled: 'var(--tertiary-color)'
    }
  }
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}

export default RootLayout
