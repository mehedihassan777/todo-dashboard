import { LoggedInUserProvider } from "@/context/LoggedInUserContext";

import Head from "next/head";
import "../styles/globals.scss";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<meta name="theme-color" content="#10357F" />
				<meta name="robots" content="index, follow" />
				<meta name="author" content="Customer Dashboard LTD." />
				<meta name="publisher" content="Customer Dashboard LTD." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<LoggedInUserProvider>{children}</LoggedInUserProvider>
			</body>
		</html>
	);
}
