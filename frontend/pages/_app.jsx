import '../styles/globals.css'
import { WorkoutsContextProvider } from '../context/WorkoutsContext'
import { UserContextProvider } from '../context/UserContext'
import { DarkModeContextProvider } from '../context/DarkModeContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <DarkModeContextProvider>
        <WorkoutsContextProvider>
          <Component {...pageProps} />
        </WorkoutsContextProvider>
      </DarkModeContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
