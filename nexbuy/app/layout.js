import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: { 
    template: '%s | NexBuy',
    default: 'NexBuy'
  },
  description: 'Your one-stop shop for all things tech!',

icons: {
  icon: "/image/NexGen.png",
}
}
export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body>
        <ToastContainer />
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}