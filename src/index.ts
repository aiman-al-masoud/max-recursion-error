/// <reference lib="dom" />

import { tokens, treebanks, usernames } from "./config.ts"
import { formatAnswer, makeAnswer } from "./core.ts"
import { range } from "./utils.ts"

const state = {
    tokens,
    treebanks,
    usernames,
    downvotes: 0,
}

document.getElementById('input-question')!.oninput = () => {
    const question = document.getElementById('input-question')!.textContent!

    const time = new Date().getTime()
    const answers = range(5).map(_ => makeAnswer(question, state.usernames, state.treebanks, state.tokens, 10, time))
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

    document.querySelector('.question-timestamp')!.innerHTML = new Date(time).toDateString()

    if (state.downvotes % 50 === 0) alert('your question got banned')

}
