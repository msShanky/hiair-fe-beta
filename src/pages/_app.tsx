import "../styles/globals.css";
import { useEffect } from "react";
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useLocalStorage } from "@mantine/hooks";
import { store } from "app/store";

const hiairTheme: Partial<MantineTheme> = {
	fontFamily: "Raleway, sans-serif",
};

function MyApp({ Component, pageProps }: AppProps) {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const isDark = colorScheme === "dark";

	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (isDark ? "light" : "dark"));

	useEffect(() => {
		// @ts-ignore
		document.body.className = isDark ? "dark-mode" : "light-mode";
		if (isDark) {
			document.documentElement.classList.add("dark");
			document.body.classList.add("bg-shadeBlack");
		} else {
			document.documentElement.classList.remove("dark", "bg-shadeBlack");
			document.body.classList.remove("bg-shadeBlack");
		}
	});

	return (
		<>
			<UserProvider supabaseClient={supabaseClient}>
				<Provider store={store}>
					<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
						<MantineProvider withGlobalStyles withNormalizeCSS theme={hiairTheme}>
							<NotificationsProvider position="bottom-right">
								<Component {...pageProps} />
							</NotificationsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</Provider>
			</UserProvider>
		</>
	);
}

export default MyApp;
