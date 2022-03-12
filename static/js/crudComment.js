const inProduction = false;
const PRODUCTION_URL = inProduction ? "https://webdev-blog-alexandercb.herokuapp.com/" : "http://127.0.0.1:8000/";

const allCommentPage = document.querySelector(".comments");
const addComment = document.querySelector("#add-comment");
const allEditForms = document.querySelectorAll(".form--edit");

function addListenerToElements(elementClass, callback) {
    const allElements = document.querySelectorAll(elementClass);
    allElements.forEach((element) => callback(element));
}

const listenDeleteButton = (button) => {
    const targetUrl = button.parentElement.action;

    const fetchDelete = async (event) => {
        event.preventDefault();
        
        response = await fetch(targetUrl, {
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: {
                 
            },
            credentials: "same-origin",
        });

        if (response.status !== 200) {
            return;
        }

        const parent = button.parentElement.parentElement;
        parent.remove();
    }

    button.addEventListener("click", fetchDelete);
}


const listenShowEditForm = (button) => {

    const commentId = button.dataset.commentId;
    const formModal = document.querySelector(`.modal[data-comment-id="${commentId}"]`);

    const showForm = (event) => {   
        formModal.classList.toggle("show");
    }

    button.addEventListener("click", showForm);

}

const listenEditComment = (form) => {
    const textArea = form.firstElementChild;
    const initialContent = textArea.value;

    const submitEditForm = async (event) => {
        event.preventDefault();

        if (textArea.value === initialContent) {
            return;
        }

        response = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "content" : textArea.value,
            })
        });

        jsonResponse = await response.json();
        newContent = jsonResponse["comment"].content;
        
        modal = form.parentElement;

        const commentDiv = document.querySelector(`.card--comment[data-comment="${modal.dataset.commentId}"]`);
        
        const commentArticle = commentDiv.children[0];
        const commentContent = commentArticle.children[0];

        commentContent.innerText = newContent;
        modal.classList.toggle("show");
        
    }

    form.addEventListener("submit", submitEditForm);
}

addListenerToElements(".btn--delete", listenDeleteButton);
addListenerToElements(".btn--modal-show", listenShowEditForm);
addListenerToElements(".form--edit", listenEditComment);



addComment.addEventListener("submit", async (event) => {
    event.preventDefault();

    const targetUrl = addComment.action;
    const textArea = document.querySelector("#content");

    response = await fetch(targetUrl, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "content" : textArea.value
        })
    })

    jsonResponse = await response.json();
    comments = jsonResponse["commentList"];
    allCommentPage.innerHTML = comments;
    addListenerToElements(".btn--delete", listenDeleteButton);
    addListenerToElements(".btn--modal-show", listenShowEditForm);
    addListenerToElements(".form--edit", listenEditComment);
    
});


