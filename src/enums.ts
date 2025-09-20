export const SortOrder = {
    ASC: 'asc',
    DESC: 'desc',
} as const;
export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export const SortBy = {
    DATE: 'date',
    EMISSION: 'emission',
    CATEGORY: 'category',
} as const;
export type SortBy = typeof SortBy[keyof typeof SortBy];