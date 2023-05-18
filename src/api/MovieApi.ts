import axiosInstance from ".";
const API_KEY = process.env.REACT_APP_API_KEY;

const getSortedMovies = async (
    withCompany: string,
    sortBy: string,
    sortDirection: string
) => {
    const movies = await axiosInstance.get(
        `https://api.themoviedb.org/3/discover/movie?with_companies=${withCompany}${sortBy ? "&sort_by=" + sortBy + "." + sortDirection : ""
        }&page=1&api_key=${API_KEY}`
    );

    if (movies?.data?.results) {
        return movies.data.results;
    } else {
        throw new Error("No result found");
    }
};

const getMarvelCompanyId = async () => {
    const movies = await axiosInstance.get(
        `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=Marvel Studios`
    );
    if (movies?.data?.results[0]?.id) {
        return { marvelId: movies.data.results[0].id };
    } else {
        throw new Error("No Marvel id  found");
    }
};

const getDcCompanyId = async () => {
    const movies = await axiosInstance.get(
        `https://api.themoviedb.org/3/search/company?api_key=${API_KEY}&query=DC Entertainment`
    );
    if (movies?.data?.results[0]?.id) {
        return { dcId: movies.data.results[0].id };
    } else {
        throw new Error("No Dc id  found");
    }
};

const getCompanyIds = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        Promise.all([getDcCompanyId(), getMarvelCompanyId()]).then((values) => {
            resolve(values);
        }).catch((error) => {
            reject(error);
        });
    });
}

export {
    getSortedMovies,
    getMarvelCompanyId,
    getDcCompanyId,
    getCompanyIds
}

