import { TokenMap, TreebankMap } from "./stuff.ts";

export const treebanks: TreebankMap = {
    sentence: [
        ['simple-sentence'],
        ['sentence', ' ', 'but', ' ', 'sentence'],
        ['sentence', ' ', 'and', ' ', 'sentence'],
        ['quote'],
        ['you must read ', 'link'],
    ],
    'simple-sentence': [
        ['noun-phrase', ' ', 'verb', ' ', 'adjective'],
    ],
    'noun-phrase': [
        ['determiner', ' ', 'noun'],
        ['noun-phrase', ' ', 'that', ' ', 'sentence'],
    ],
    quote: [
        ['you say', ' ', '"', 'text', '"'],
    ],
    link: [
        ['https://max-recursion-error.com/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord'],
        ['https://docs.python.org/3/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord'],
        ['https://developer.mozilla.org/en-US/docs/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord'],
    ]
}

export const tokens: TokenMap = {
    determiner: ['the', 'this', 'that', 'your'],
    noun: ['question', 'code', 'idea', 'website', 'intelligence', 'stupidity', 'remark', 'person', 'documentation', 'duplicate'],
    adjective: ['stupid', 'silly', 'ludicrous', 'mean', 'scary', 'evil', 'crazy', 'bigoted', 'irrelevant', 'pathetic', 'duplicated'],
    verb: ['is'],
    text: [],
    newWord: [],
}

export const usernames = [
    '10x Dev',
    'Noobie Crusher',
    'Urcodeissh*t',
    'Usuck',
    '100x Dev',
    'Normie Hater',
    '20x Dev',
]
