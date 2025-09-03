import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'NexBuy',
  description: 'Your one-stop shop for all things tech!',
}

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body>
      <div>
        <ToastContainer />
        <Header />
          {children}
        <Footer />
      </div>
      </body>
    </html>
  )
}