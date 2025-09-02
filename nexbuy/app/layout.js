import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <div id="root">{children}
          <Footer />
        </div>
      </body>
    </html>
  )
}