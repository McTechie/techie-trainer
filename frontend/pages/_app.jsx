import '../styles/globals.css'
import { WorkoutsContextProvider } from '../context/WorkoutsContext'

function MyApp({ Component, pageProps }) {
  return <WorkoutsContextProvider>
    <Component {...pageProps} />
  </WorkoutsContextProvider>
}

export default MyApp
