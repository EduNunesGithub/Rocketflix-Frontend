import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";

import { Home } from "./pages/Home/Home";

import { theme } from "./themes/mainTheme";
import { pxToRem } from "./utils/unitConverter";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles
				styles={(theme) => ({
					"*": {
						boxSizing: "border-box",
						margin: 0,
						padding: 0,
						overflowWrap: "break-word",
						"::-webkit-scrollbar": {
							width: pxToRem(12),
							height: pxToRem(12)
						},
						"::-webkit-scrollbar-button": {
							width: 0,
							height: 0
						},
						"::-webkit-scrollbar-corner": {
							background: "transparent"
						},
						"::-webkit-scrollbar-thumb": {
							background: "#E9E6E37F",
							border: "0px none #FFFFFF",
							borderRadius: pxToRem(100),
							":hover": {
								background: "#E9E6E3BF"
							},
							":active": {
								background: "#E9E6E3"
							}
						},
						"::-webkit-scrollbar-track": {
							background: "#1A1A1A",
							border: "0px none #FFFFFF",
							borderRadius: pxToRem(0),
							":hover": {
								background: "#1A1A1A"
							},
							":active": {
								background: "#1A1A1A"
							}
						}
					},
					body: {
						background: "linear-gradient(67.08deg, #1E46A3 0%, #000000 48.94%, #C12A23 99.96%)",
						overflowX: "hidden",
						minWidth: "100vw"
					},
					[theme.breakpoints.down("sm")]: {
						html: {
							fontSize: `${(16 / 375) * 100}vw`
						}
					}
				})}
			/>

			<Box
				sx={{
					margin: "auto",
					py: {
						xs: pxToRem(50),
						md: pxToRem(126)
					},
					width: "100%",
					maxWidth: pxToRem(1440),
					minHeight: "100vh"
				}}
			>
				<Home />
			</Box>
		</ThemeProvider>
	)
};