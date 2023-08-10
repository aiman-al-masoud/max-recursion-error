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
        ],
        [
            'noun-phrase',
            ' must ',
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
            '<i>',
            '"',
            'text',
            '"',
            '</i>'
        ]
    ],
    link: [
        [
            '<a href="">https://max-recursion-error.com/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '</a>'
        ],
        [
            '<a href="">https://docs.python.org/3/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '</a>'
        ],
        [
            '<a href="">https://developer.mozilla.org/en-US/docs/',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '-',
            'newWord',
            '</a>'
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
        'you',
        'question',
        'code',
        'idea',
        'website',
        'intelligence',
        'stupidity',
        'remark',
        'person',
        'documentation',
        'duplicate',
        'Python',
        'C++',
        'Java',
        'bullshit'
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
        'duplicated',
        'deprecated'
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
function makeAnswer(question, usernames, treebanks, tokens, limit, timestamp) {
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
        answerer,
        timestamp
    };
}
function formatAnswer(ans) {
    return `<div class="answer">
                <p class="answer-details">Answered by <span class="username answerer">${ans.answerer}</span> on <span
                        class="timestamp answer-timestamp">${new Date(ans.timestamp).toDateString()}</span></p>
                <div class="answer-content">
                    <p id="output-answer">${ans.answer}</p>
                </div>
            </div>`;
}
const state = {
    tokens,
    treebanks,
    usernames,
    downvotes: 0
};
document.getElementById('input-question').oninput = ()=>{
    const question = document.getElementById('input-question').textContent;
    const time = new Date().getTime();
    const answers = [
        1,
        2,
        3,
        4,
        5
    ].map((_)=>makeAnswer(question, state.usernames, state.treebanks, state.tokens, 10, time));
    const anwersHtml = answers.map((x)=>formatAnswer(x));
    const answersDiv = document.querySelector('.answers');
    answersDiv.innerHTML = '';
    anwersHtml.forEach((x)=>{
        const elem = document.createElement('div');
        elem.innerHTML = x;
        answersDiv.appendChild(elem);
    });
    state.downvotes -= parseInt(50 * Math.random() + '');
    document.querySelector('.vote-count').textContent = state.downvotes + '';
    console.log(document.querySelector('.question-timestamp'));
    document.querySelector('.question-timestamp').innerHTML = new Date(time).toDateString();
    if (state.downvotes % 50 === 0) alert('your question got banned');
};

