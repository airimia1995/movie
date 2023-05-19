import { SortTypeEnum } from ".";

export const sorters = [
    { label: "Release Date", id: SortTypeEnum.ReleaseDate },
    { label: "Audience rating", id: SortTypeEnum.VoteAverage },
    { label: 'Title', id: SortTypeEnum.Title },
    { label: 'Overview', id: SortTypeEnum.Overview }
]