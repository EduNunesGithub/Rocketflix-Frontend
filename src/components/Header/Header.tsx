import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";

import { pxToRem } from "../../utils/unitConverter";

import logo from "/SVG/logo.svg";

interface HeaderProps {
    sx?: SxProps<Theme> | undefined;
};

export const Header = ({
    sx
}: HeaderProps) => {
    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                gap: pxToRem(20),
                flexDirection: "column",
                alignItems: "center",
                px: pxToRem(16),
                ...sx
            }}
        >
            <Box
                component="img"
                alt="Logo da rocketflix"
                src={logo}
                sx={{
                    objectFit: "center",
                    width: "100%",
                    maxWidth: pxToRem(87.24),
                    height: pxToRem(62.92)
                }}
            />

            <Box
                component="h1"
                sx={{
                    color: "#FFFCF9",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: pxToRem(40),
                    fontWeight: 700,
                    lineHeight: pxToRem(60),
                    textAlign: "center"
                }}
            >
                Não sabe o que assistir?
            </Box>
        </Box>
    );
};