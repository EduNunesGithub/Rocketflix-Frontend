import { Box } from "@mui/material";
import { useState } from "react";

import { FindMovieButton } from "../../components/FindMovieButton/FindMovieButton";
import { Header } from "../../components/Header/Header";
import { MovieDescription } from "../../components/MovieDescription/MovieDescription";

import {
    Movie,
    requestRandomMovie
} from "../../lib/API";
import { pxToRem } from "../../utils/unitConverter";

export const Home = () => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [movie, setMovie] = useState<Movie | undefined>(undefined);

    const newRandomMovie = async () => {
        setLoading(true);

        const response = await requestRandomMovie();

        setLoading(false);

        if (response === null) {
            setError(true);
            setMovie({ id: undefined, overview: undefined, poster_path: undefined, title: undefined });

            return;
        };

        setError(false);
        setMovie(response);
    };

    return (
        <>
            <Header
                sx={{
                    mb: pxToRem(32)
                }}
            />

            <MovieDescription
                error={error}
                movie={movie}
                sx={{
                    mb: pxToRem(28)
                }}
            />

            <FindMovieButton
                loading={loading}
                onClick={newRandomMovie}
                sx={{
                    mx: "auto"
                }}
            />

            <Box
                component="p"
                sx={{
                    color: "#FFFCF9",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: {
                        xs: pxToRem(12),
                        md: pxToRem(14)
                    },
                    fontWeight: 400,
                    lineHeight: {
                        xs: pxToRem(18),
                        md: pxToRem(21)
                    },
                    textAlign: "center",
                    mt: pxToRem(28),
                    mx: "auto",
                    px: pxToRem(16),
                    maxWidth: pxToRem(382 + 32)
                }}
            >
                Clique em "Encontrar filme" que traremos informações de algum filme para você assistir hoje.
            </Box>
        </>
    );
};