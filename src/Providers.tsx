import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import { Provider } from "./components/ui/provider";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Providers = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SessionProvider>
        <Provider>
          <Outlet />
        </Provider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
