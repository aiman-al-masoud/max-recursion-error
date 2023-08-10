/// <reference lib="dom" />

import { tokens, treebanks, usernames } from "./config.ts"
import { formatAnswer, makeAnswer } from "./stuff.ts"

const state = {
    tokens,
    treebanks,
    usernames,
    downvotes: 0,
}

document.getElementById('input-question')!.oninput = () => {
    const question = document.getElementById('input-question')!.textContent!

    const time = new Date().getTime()
    const answers = [1, 2, 3, 4, 5].map(_ => makeAnswer(question, state.usernames, state.treebanks, state.tokens, 10, time))
    const anwersHtml = answers.map(x => formatAnswer(x))

    const answersDiv = document.querySelector('.answers')!
    answersDiv.innerHTML = ''

    anwersHtml.forEach(x => {
        const elem = document.createElement('div')
        elem.innerHTML = x
        answersDiv.appendChild(elem)
    })

    state.downvotes -= parseInt((50 * Math.random()) + '')
    document.querySelector('.vote-count')!.textContent = state.downvotes + ''

    console.log(document.querySelector('.question-timestamp'))
    document.querySelector('.question-timestamp')!.innerHTML = new Date(time).toDateString()


    if (state.downvotes % 50 === 0) alert('your question got banned')

    // document.getElementById('output-answer')!.innerHTML = stackoverflowize(templates, sentences)
    // document.querySelector('.vote-count')!.textContent = -parseInt(1000 * Math.random())
    // document.querySelector('.question-timestamp')!.textContent = new Date().toDateString()
    // document.querySelector('.answer-timestamp')!.textContent = new Date().toDateString()
    // document.querySelector('.question-title')!.textContent = sentences[0]
    // document.querySelector('.answerer')!.textContent = randChoice(answerers)
}

// document.querySelector('.upvote-button')!.onclick = () => {
//     alert("You cannot upvote your own question! You don't have enough experience!!!")
// }

// document.querySelector('.downvote-button')!.onclick = () => {
//     document.querySelector('.vote-count').textContent = -parseInt(1000 * Math.random())
// }