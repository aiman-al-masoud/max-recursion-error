function pickRand<T>(arr: T[], avoid?: unknown): T | undefined {
    const pool = arr.filter(x => JSON.stringify(x) !== JSON.stringify(avoid))
    const choice = pool[parseInt((pool.length * Math.random()) + '')]
    return choice
}

export type Treebank = string[][]
export type TreebankMap = { [string: string]: Treebank }
export type TokenType = 'determiner' | 'noun' | 'adjective' | 'verb' | 'text' | 'newWord'
export type TokenMap = { [x in TokenType]: string[] }
export type Answer = {
    answerer: string,
    answer: string,
}

function generate(
    treebanks: TreebankMap,
    tokens: TokenMap,
    start: string,
    limit: number,
    avoid?: unknown
): string {

    if (limit <= 0) {
        return ''
    }

    if (start in treebanks) {
        const tb = pickRand(treebanks[start], avoid)
        if (tb) return tb.map(x => generate(treebanks, tokens, x, limit - 1, x)).reduce((a, b) => a + b, '')
    }

    if (start in tokens) {
        const t = pickRand(tokens[start as TokenType], avoid)
        if (t) return t
    }

    return start
}

function sentencesOf(text: string) {
    const sentences = text.split(/\.|\?|\!|\,/).filter(x => x.trim())
    const result = sentences.map(x => x.trim())
    return result
}

function wordsOf(text: string) {
    return text.replace(/\.|\?|\!|\,/g, ' ').toLowerCase().split(/\s+/)
}

export function makeAnswer(
    question: string,
    usernames: string[],
    treebanks: TreebankMap,
    tokens: TokenMap,
    limit: number,
): Answer {

    const freshTokens: TokenMap = {
        ...tokens,
        text: [...tokens.text, ...sentencesOf(question)],
        newWord: wordsOf(question),
    }

    const answer = generate(treebanks, freshTokens, 'sentence', limit)
    const answerer = pickRand(usernames)!
    return {
        answer,
        answerer,
    }
}



// const ans = makeAnswer('how do I set a variable in python? Please help me because I am a noob, and I am still learning, thanks!', usernames, treebanks, tokens, 10)
// console.log(ans)
// console.log(ans.answer)



