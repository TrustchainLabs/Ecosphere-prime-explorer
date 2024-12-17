import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConfigProvider, ThemeConfig } from 'antd'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ecosphere Prime Explorer',
  description: 'Ecosphere Hyper-local Climate Intelligence Oracle'
}

const inter = Inter({ subsets: ['latin'] })

const theme: ThemeConfig = {
  components: {
    DatePicker: {
      colorPrimary: 'var(--primary-color)',
      cellActiveWithRangeBg: 'var(--primary-color)',
      cellBgDisabled: 'var(--tertiary-color)'
    },
    Form: {
      labelColor: 'var(--text-color)',
      colorBorder: 'var(--border-color)',
      colorPrimary: 'var(--primary-color)',
      colorText: 'var(--text-color)'
    },
    Button: {
      colorPrimary: 'var(--primary-color)',
      primaryColor: 'var(--text-color)',
      colorPrimaryHover: 'var(--tertiary-color)',
      colorPrimaryActive: 'var(--tertiary-color)'
    },
    Spin: {
      colorPrimary: 'var(--primary-color)'
    }
  }
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main>
          <ConfigProvider theme={theme}>
            {children}
          </ConfigProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
