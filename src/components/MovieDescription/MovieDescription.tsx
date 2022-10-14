import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/system";
import {
    useEffect,
    useRef,
    useState
} from "react";

import { Movie } from "../../lib/API";
import { pxToRem } from "../../utils/unitConverter";

import poster from "/JPG/poster.jpg";
import shuffle from "/SVG/shuffle.svg";

interface MovieDescriptionDataProps {
    bannerAlt: string;
    bannerURL: string | undefined;
    errorScreen: boolean;
    stateHeightFunction: React.Dispatch<React.SetStateAction<number>>;
    synopsis: string | undefined;
    title: string | undefined;
};

interface MovieDescriptionProps {
    error: boolean;
    movie: Movie | undefined;
    sx?: SxProps<Theme> | undefined;
};

const MovieDescriptionData = ({
    bannerAlt,
    bannerURL,
    errorScreen,
    stateHeightFunction,
    synopsis = "",
    title = ""
}: MovieDescriptionDataProps) => {
    const banner = useRef<HTMLImageElement>(null);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (() => {
            if (!container.current) return;

            const observer = new ResizeObserver(() => callback(container.current));

            observer.observe(container.current);

            return () => observer.disconnect();
        })();
    }, [container]);

    const callback = (element: HTMLDivElement | null) => {
        if (!element) return;

        const elementHeight = element.getBoundingClientRect().height;

        stateHeightFunction(elementHeight);
    };

    return (
        <Box
            ref={container}
            sx={{
                display: "flex",
                gap: {
                    xs: pxToRem(18),
                    md: pxToRem(32)
                },
                flexDirection: {
                    xs: "column",
                    md: "row"
                },
                alignItems: {
                    xs: "center",
                    md: "flex-start"
                },
                justifyContent: "center",
                px: pxToRem(30)
            }}
        >
            <Box
                component="img"
                alt={bannerAlt}
                onError={() => {
                    if (!banner.current) return;

                    banner.current.src = shuffle;
                }}
                ref={banner}
                src={!bannerURL ? shuffle : (
                    errorScreen ? bannerURL : `https://image.tmdb.org/t/p/w500/${bannerURL}`
                )}
                sx={{
                    background: "#000000",
                    objectFit: "cover",
                    width: "100%",
                    maxWidth: pxToRem(172),
                    height: pxToRem(245),
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    gap: pxToRem(18),
                    flexDirection: "column",
                    justifyContent: errorScreen ? "center" : "unset",
                    color: "#FFFCF9",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: {
                        xs: "center",
                        md: "left"
                    },
                    maxWidth: errorScreen ? pxToRem(386) : pxToRem(422.5),
                    height: errorScreen ? {
                        xs: "unset",
                        md: pxToRem(245)
                    } : "unset"
                }}
            >
                {title && (
                    <Box
                        component="h2"
                        sx={{
                            fontSize: pxToRem(20),
                            fontWeight: 700,
                            lineHeight: pxToRem(30)
                        }}
                    >
                        {title}
                    </Box>
                )}

                {synopsis && (
                    <Box
                        component="p"
                        sx={{
                            fontSize: pxToRem(16),
                            fontWeight: 400,
                            lineHeight: pxToRem(24)
                        }}
                    >
                        {synopsis}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export const MovieDescription = ({
    error,
    movie,
    sx
}: MovieDescriptionProps) => {
    const [innerContainerHeight, setInnerContainerHeight] = useState<number>(0);
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (() => {
            if (!container.current || movie === undefined) return;

            container.current.focus();
        })();
    }, [movie]);

    if (movie === undefined) return null;

    return (
        <Box
            aria-modal="true"
            ref={container}
            role="dialog"
            tabIndex={-1}
            sx={{
                transitionDuration: "0.2s",
                transitionProperty: "height",
                transitionTimingFunction: "ease-in",
                overflow: "hidden",
                outline: "none",
                height: `${innerContainerHeight}px`,
                ...sx,
            }}
        >
            {error === true ? (
                <MovieDescriptionData
                    bannerAlt="Foto de uma tela de computador com vários código de programação"
                    bannerURL={poster}
                    errorScreen={true}
                    stateHeightFunction={setInnerContainerHeight}
                    synopsis={undefined}
                    title={"Ops, hoje não é dia de assistir filme. Bora codar! 🚀"}
                />
            ) : (
                <MovieDescriptionData
                    bannerAlt={`Banner do filme ${movie.title}`}
                    bannerURL={movie.poster_path}
                    errorScreen={false}
                    stateHeightFunction={setInnerContainerHeight}
                    synopsis={movie.overview}
                    title={movie.title}
                />
            )}
        </Box>
    );
};