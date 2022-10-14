export interface Movie {
    id: number | undefined;
    overview: string | undefined;
    poster_path: string | undefined;
    title: string | undefined;
};

interface RequestRandomMovie {
    (): Promise<Movie | null>
};

export const requestRandomMovie: RequestRandomMovie = async () => {
    const response: { data: Response | null } = {
        data: null
    };

    try {
        response.data = await fetch("https://rocketseat-challenges-rocketflix.onrender.com/movies/random");
    } catch {
        return null;
    }

    if (response.data.status !== 200) return null;

    return response.data.json();
}