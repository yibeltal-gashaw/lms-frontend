import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

createRoot(document.getElementById("root")).render(
	<ThemeProvider>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ThemeProvider>
);
