import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import QueryProvider from './lib/react-query/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-h3gqcqwc5580bizh.us.auth0.com"
      clientId="QxXCgEXciLe0SfAp8Uqd7sSouZNMHZXC"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </Auth0Provider>
  </BrowserRouter>
)
