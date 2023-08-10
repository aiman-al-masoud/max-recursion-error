export function pickRand<T>(arr: T[], avoid?: unknown): T | undefined {
    const pool = arr.filter(x => JSON.stringify(x) !== JSON.stringify(avoid))
    const choice = pool[parseInt((pool.length * Math.random()) + '')]
    return choice
}

export function sentencesOf(text: string) {
    const sentences = text.split(/\.|\?|\!|\,/).filter(x => x.trim())
    const result = sentences.map(x => x.trim())
    return result
}

export function wordsOf(text: string) {
    return text.replace(/\.|\?|\!|\,/g, ' ').toLowerCase().split(/\s+/)
}

export function range(n: number) {
    return Array.from(new Array(n)).map((_, i) => i)
}
