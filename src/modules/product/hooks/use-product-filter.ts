import { useQueryStates ,parseAsString, parseAsArrayOf, parseAsStringLiteral} from "nuqs"
export const sortValues=["curated","trending","hot_end_new"] as const;
const params = {
    sort:parseAsStringLiteral(sortValues).withDefault("curated"),
    minPrice: parseAsString.withOptions({
        clearOnDefault: true
    }).withDefault(""),
    maxPrice: parseAsString.withOptions({
        clearOnDefault: true
    }).withDefault(""),
    tags:parseAsArrayOf(parseAsString).withOptions({
        clearOnDefault:true
    }).withDefault([])
}
export const useProductFilters = () => {
    return useQueryStates(params, {
    throttleMs: 1000 // 👈 FIX NUQS-429
  })
}

