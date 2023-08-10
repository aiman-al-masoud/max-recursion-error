import { pickRand, sentencesOf, wordsOf } from "./utils.ts"

export type Treebank = string[][]
export type TreebankMap = { [string: string]: Treebank }
export type TokenType = 'determiner' | 'noun' | 'adjective' | 'verb' | 'text' | 'newWord'
export type TokenMap = { [x in TokenType]: string[] }
export type Answer = {
    answerer: string,
    answer: string,
    timestamp: number,
}

export function makeAnswer(
    question: string,
    usernames: string[],
    treebanks: TreebankMap,
    tokens: TokenMap,
    limit: number,
    timestamp: number,
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
        timestamp,
    }
}

export function formatAnswer(ans: Answer): string {
    return `<div class="answer">
                <p class="answer-details">Answered by <span class="username answerer">${ans.answerer}</span> on <span
                        class="timestamp answer-timestamp">${new Date(ans.timestamp).toDateString()}</span></p>
                <div class="answer-content">
                    <p id="output-answer">${ans.answer}</p>
                </div>
            </div>`
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

