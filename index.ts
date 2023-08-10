/// <reference lib="dom" />

import { tokens, treebanks, usernames } from "./config.ts"
import { makeAnswer } from "./stuff.ts"

document.getElementById('input-question')!.oninput = () => {
    const question = document.getElementById('input-question')!.textContent!
    const ans = makeAnswer(question, usernames, treebanks, tokens, 10)
    console.log('question=', question)
    console.log('ans=', ans)

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