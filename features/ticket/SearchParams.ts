import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
    search: parseAsString.withDefault(''),
    sort: parseAsString.withDefault('newest')
})

export type PastedSearchParams = ReturnType<typeof searchParamsCache.parse>