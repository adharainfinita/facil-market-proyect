import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
const googleClientId = import.meta.env.VITE_GOOGLE_ID;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<GoogleOAuthProvider clientId={googleClientId}>
				<App />
			</GoogleOAuthProvider>
		</BrowserRouter>
	</Provider>
);
