function sentencesOf(text = '') {
    const sentences = text.split(/\.|\?|\!/).filter(x => x.trim())
    const result = sentences.map(x => x.trim())
    return result
}

function linkize(prefix = '', sentence = '') {
    const words = sentence.replace(/\W+/, '').split(/\s+/)
    const name = words.reduce((a, b) => a + '-' + b)
    const link = `${prefix}${parseInt(100000 * Math.random())}/${name}`
    const htmlLink = `<a href="/">${link}</a>`
    return htmlLink
}

function soLinkize(sentence = '') {
    return linkize('https://stackoverflow.com/questions/', sentence)
}

function docLinkize(sentence = '') {
    return linkize('https://docs.python.org/', sentence)
}

function randChoice(arr = []) {
    return arr[parseInt(arr.length * Math.random())]
}

function so1(summary = ['']) {
    return `
    This question is irrelevant.    
    You say "<i>${randChoice(summary)}"</i>, but then it is obvious that <i>"${randChoice(summary)}"</i>.
    You don't provide any specific code, you just say that <i>"${randChoice(summary)}"</i>.
    How on earth do you expect to get an answer?
    Btw, clearly a duplicate of ${soLinkize(randChoice(summary))}.
    `
}

function so2(summary = ['']) {
    return `
    I quote you: <i>"${randChoice(summary)}"</i>
    
    What?
    This question sucks.
    You suck.
    What does <i>"${randChoice(summary)}"</i> even mean?
    Please go read the documentation at ${docLinkize(randChoice(summary))}
    `
}

function so3(summary = ['']) {
    return `
    This is a duplicate of ${soLinkize(randChoice(summary))} and ${soLinkize(randChoice(summary))}.

    The question has been closed, because it's unnecessary.
    You are unnecessary.

    <i>"${randChoice(summary)}"</i>, so what?    
    `
}

function stackoverflowize(templates = [() => ''], summary = ['']) {
    return randChoice(templates)(summary)
}

const templates = [
    so1,
    so2,
    so3,
]

const answerers = [
    '10x Dev',
    'Noobie Crusher',
    'Urcodeissh*t',
    'Usuck',
    '100x Dev',
]


document.getElementById('input-question').oninput = () => {
    const question = document.getElementById('input-question').textContent
    const sentences = sentencesOf(question)
    document.getElementById('output-answer').innerHTML = stackoverflowize(templates, sentences)
    document.querySelector('.vote-count').textContent = -parseInt(1000 * Math.random())
    document.querySelector('.question-timestamp').textContent = new Date().toDateString()
    document.querySelector('.answer-timestamp').textContent = new Date().toDateString()
    document.querySelector('.question-title').textContent = sentences[0]
    document.querySelector('.answerer').textContent = randChoice(answerers)
}

document.querySelector('.upvote-button').onclick = () => {
    alert("You cannot upvote your own question! You don't have enough experience!!!")
}

document.querySelector('.downvote-button').onclick = () => {
    document.querySelector('.vote-count').textContent = -parseInt(1000 * Math.random())
}