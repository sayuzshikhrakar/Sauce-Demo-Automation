export function sortAlphabeticallyAsc(arr: string[]): string[] {
    return [...arr].sort((a, b) => a.localeCompare(b));
}

export function sortAlphabeticallyDesc(arr: string[]): string[] {
    return [...arr].sort((a, b) => b.localeCompare(a));
}
