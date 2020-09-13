const fetch = require("node-fetch");
const jsdom = require("jsdom");

const HACKER_NEWS_URL = "https://news.ycombinator.com/news";
const THREAD_URL = "https://news.ycombinator.com/item";

async function getPageHTML(pageNumber) {
    const response = await fetch(`${HACKER_NEWS_URL}?p=${pageNumber}`);
    return response.text();
}

async function getThreadHTML(threadID) {
    const response = await fetch(`${THREAD_URL}?id=${threadID}`);
    return response.text();
}

// Returns a list of thread IDs on the given page
async function threads(pageNumber) {
    const pageHTMLText = await getPageHTML(pageNumber);
    const dom = domparser.parseFromString(pageHTMLText, "text/html");
    const table = dom.window.document.getElementById("hnmain");

    const threads = table.tBodies[0].rows[2].cells[0].childNodes[0].tBodies[0].rows;
    const threadIDs = [];

    for (const thread of threads) {
        if (thread.className === "athing") {
            threadIDs.push(thread.id);
        }
    }

    return threadIDs;
}

// Returns a list of comment strings for the given thread ID
async function comments(threadID) {
    const threadHTMLText = await getThreadHTML(threadID);
    const dom = domparser.parseFromString(threadHTMLText, "text/html");
    const table = dom.window.document.getElementById("hnmain");

    const commentStrings = [];

    const comments = table.tBodies[0].rows[2].cells[0].childNodes[4].tBodies[0].rows;
    for (const comment of comments) {
        if (comment.className === "athing comtr ") {
            const a = comment.cells[0].childNodes[1].tBodies[0].rows[0].cells[2].childNodes[2].childNodes;
            for (const b of a) {
                if (b.className === "commtext c00") {
                    const rawComment = b.textContent.replace("reply\n", "");
                    commentStrings.push(rawComment);
                }
            }
        }
    }
    return commentStrings;
}


comments(24458489);



