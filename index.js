// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const treebanks = {
    sentence: [
        [
            'simple-sentence'
        ],
        [
            'sentence',
            ' ',
            'but',
            ' ',
            'sentence'
        ],
        [
            'sentence',
            ' ',
            'and',
            ' ',
            'sentence'
        ],
        [
            'quote'
        ],
        [
            'you must read ',
            'link'
        ]
    ],
    'simple-sentence': [
        [
            'noun-phrase',
            ' ',
            'verb',
            ' ',
            'adjective'
        ]
    ],
    'noun-phrase': [
        [
            'determiner',
            ' ',
            'noun'
        ],
        [
            'noun-phrase',
            ' ',
            'that',
            ' ',
            'sentence'
        ]
    ],
    quote: [
        [
            'you say',
            ' ',
            '"',
            'text',
            '"'
        ]
    ],
    link: [
        [
            'https://max-recursion-error.com/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord'
        ],
        [
            'https://docs.python.org/3/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord'
        ],
        [
            'https://developer.mozilla.org/en-US/docs/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord'
        ]
    ]
};
const tokens = {
    determiner: [
        'the',
        'this',
        'that',
        'your'
    ],
    noun: [
        'question',
        'code',
        'idea',
        'website',
        'intelligence',
        'stupidity',
        'remark',
        'person',
        'documentation',
        'duplicate'
    ],
    adjective: [
        'stupid',
        'silly',
        'ludicrous',
        'mean',
        'scary',
        'evil',
        'crazy',
        'bigoted',
        'irrelevant',
        'pathetic',
        'duplicated'
    ],
    verb: [
        'is'
    ],
    text: [],
    newWord: []
};
const usernames = [
    '10x Dev',
    'Noobie Crusher',
    'Urcodeissh*t',
    'Usuck',
    '100x Dev',
    'Normie Hater',
    '20x Dev'
];
function pickRand(arr, avoid) {
    const pool = arr.filter((x)=>JSON.stringify(x) !== JSON.stringify(avoid));
    const choice = pool[parseInt(pool.length * Math.random() + '')];
    return choice;
}
function generate(treebanks, tokens, start, limit, avoid) {
    if (limit <= 0) {
        return '';
    }
    if (start in treebanks) {
        const tb = pickRand(treebanks[start], avoid);
        if (tb) return tb.map((x)=>generate(treebanks, tokens, x, limit - 1, x)).reduce((a, b)=>a + b, '');
    }
    if (start in tokens) {
        const t = pickRand(tokens[start], avoid);
        if (t) return t;
    }
    return start;
}
function sentencesOf(text) {
    const sentences = text.split(/\.|\?|\!|\,/).filter((x)=>x.trim());
    const result = sentences.map((x)=>x.trim());
    return result;
}
function wordsOf(text) {
    return text.replace(/\.|\?|\!|\,/g, ' ').toLowerCase().split(/\s+/);
}
function makeAnswer(question, usernames, treebanks, tokens, limit) {
    const freshTokens = {
        ...tokens,
        text: [
            ...tokens.text,
            ...sentencesOf(question)
        ],
        newWord: wordsOf(question)
    };
    const answer = generate(treebanks, freshTokens, 'sentence', limit);
    const answerer = pickRand(usernames);
    return {
        answer,
        answerer
    };
}
document.getElementById('input-question').oninput = ()=>{
    const question = document.getElementById('input-question').textContent;
    const ans = makeAnswer(question, usernames, treebanks, tokens, 10);
    console.log('question=', question);
    console.log('ans=', ans);
};

