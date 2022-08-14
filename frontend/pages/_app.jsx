import '../styles/globals.css'
import { WorkoutsContextProvider } from '../context/WorkoutsContext'
import { UserContextProvider } from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <WorkoutsContextProvider>
        <Component {...pageProps} />
      </WorkoutsContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
