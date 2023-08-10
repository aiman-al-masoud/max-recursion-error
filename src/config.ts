import { TokenMap, TreebankMap } from "./core.ts";

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
        ['noun-phrase', ' must ', 'verb', ' ', 'adjective'],
    ],
    'noun-phrase': [
        ['determiner', ' ', 'noun'],
        ['noun-phrase', ' ', 'that', ' ', 'sentence'],
    ],
    quote: [
        ['you say', ' ', '<i>', '"', 'text', '"', '</i>'],
    ],
    link: [
        ['<a href="">https://max-recursion-error.com/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord', '</a>'],
        ['<a href="">https://docs.python.org/3/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord', '</a>'],
        ['<a href="">https://developer.mozilla.org/en-US/docs/', 'newWord', '-', 'newWord', '-', 'newWord', '-', 'newWord', '</a>'],
    ]
}

export const tokens: TokenMap = {
    determiner: ['the', 'this', 'that', 'your'],
    noun: ['you', 'question', 'code', 'idea', 'website', 'intelligence', 'stupidity', 'remark', 'person', 'documentation', 'duplicate', 'Python', 'C++', 'Java', 'bullshit'],
    adjective: ['stupid', 'silly', 'ludicrous', 'mean', 'scary', 'evil', 'crazy', 'bigoted', 'irrelevant', 'pathetic', 'duplicated', 'deprecated'],
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
