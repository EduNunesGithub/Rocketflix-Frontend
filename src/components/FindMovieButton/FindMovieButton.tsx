import Box from "@mui/material/Box";
import ButtonBase, { ButtonBaseProps } from "@mui/material/ButtonBase";
import CircularProgress from '@mui/material/CircularProgress';
import {
    useEffect,
    useRef,
    useState
} from "react";

import { pxToRem } from "../../utils/unitConverter";

import shuffle from "/SVG/shuffle.svg";

interface FindMovieButtonProps extends ButtonBaseProps {
    loading?: boolean;
};

export const FindMovieButton = (props: FindMovieButtonProps) => {
    const propsMUI = (({ loading, ...o }) => o)(props);

    const [innerContainerWidth, setInnerContainerWidth] = useState<number>(0);
    const innerContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (() => {
            if (!innerContainer.current) return;

            const observer = new ResizeObserver(() => {
                callback(innerContainer.current, setInnerContainerWidth);
            });

            observer.observe(innerContainer.current);

            return () => observer.disconnect();
        })();
    }, [innerContainer]);

    const callback = (
        element: HTMLDivElement | null,
        setStateFunction: React.Dispatch<React.SetStateAction<number>>
    ) => {
        if (!element) return;

        const elementWidth = element.getBoundingClientRect().width;

        setStateFunction(elementWidth);
    };

    return (
        <ButtonBase
            {...propsMUI}
            sx={{
                background: "#E9E6E3",
                position: "relative",
                display: "flex",
                gap: pxToRem(16),
                alignItems: "center",
                color: "#000000",
                fontFamily: "Poppins, sans-serif",
                fontSize: pxToRem(12),
                fontWeight: 700,
                lineHeight: pxToRem(18),
                borderColor: "#1A1A1A",
                borderRadius: pxToRem(5),
                borderStyle: "solid",
                borderWidth: pxToRem(2),
                px: pxToRem(16),
                py: pxToRem(10),
                transitionDuration: "0.2s",
                transitionProperty: "transform",
                width: "fit-content",
                height: pxToRem(48),
                "::after": {
                    content: '""',
                    opacity: 0,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderColor: "#FFFCF9",
                    borderRadius: pxToRem(5),
                    borderStyle: "solid",
                    borderWidth: pxToRem(2),
                    transitionDuration: "0.2s",
                    transitionProperty: "opacity",
                    width: `calc(100% + ${pxToRem(4)} + ${pxToRem(2)})`,
                    height: `calc(100% + ${pxToRem(4)} + ${pxToRem(2)})`,
                },
                ":focus": {
                    "::after": {
                        opacity: 1
                    }
                },
                ":hover": {
                    transform: "scale(1.05)"
                },
                ...props.sx
            }}
        >
            <Box
                component="img"
                alt="Ícone de aleatorizar"
                src={shuffle}
                sx={{
                    objectFit: "conver",
                    width: pxToRem(35.56),
                    height: pxToRem(25.30)
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    transitionDuration: "0.2s",
                    transitionProperty: "width",
                    width: `${innerContainerWidth}px`
                }}
            >
                <Box
                    ref={innerContainer}
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {props.loading ? (
                        <CircularProgress
                            size={pxToRem(16)}
                            sx={{
                                color: "#000000"
                            }}
                        />
                    ) : "Encontrar filme"}
                </Box>
            </Box>
        </ButtonBase>
    );
};