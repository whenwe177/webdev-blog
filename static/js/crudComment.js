const inProduction = false;
const PRODUCTION_URL = inProduction ? "https://webdev-blog-alexandercb.herokuapp.com/" : "http://127.0.0.1:8000/";

const allCommentPage = document.querySelector(".comments");
const addComment = document.querySelector("#add-comment");
const allEditForms = document.querySelectorAll(".form--edit");
const overlay = document.querySelector(".overlay");

function addListenerToElements(elementClass, callback) {
    const allElements = document.querySelectorAll(elementClass);
    allElements.forEach((element) => callback(element));
}

function listenDeleteButton (button) {
    const overlay = document.querySelector(".overlay");
    if(overlay.classList.contains("active")) return;
    
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
        
        overlay.classList.toggle("active");
        
        const modal = button.parentElement.parentElement;

        const parent = modal.parentElement.parentElement.parentElement;

        modal.remove();
        parent.remove();
    }

    button.addEventListener("click", fetchDelete);
}


function listenShowEditForm (button) {
    const overlay = document.querySelector(".overlay");
    const commentId = button.dataset.commentId;
    const formModal = document.querySelector(`.modal[data-comment-id="${commentId}"]`);
    
    const showForm = (event) => {  
        formModal.classList.toggle("show");
        overlay.classList.toggle("active");
    }

    button.addEventListener("click", showForm);

}

function listenShowDeleteForm (button) {
    const overlay = document.querySelector(".overlay");
    const commentId = button.dataset.commentId;
    const formModal = document.querySelector(`.modal-delete[data-comment-id="${commentId}"]`);
    const showForm = (event) => {  
        formModal.classList.toggle("show");
        overlay.classList.toggle("active");
    }

    button.addEventListener("click", showForm);

}

function listenCloseModal (button) {
    const overlay = document.querySelector(".overlay");
    const commentId = button.dataset.commentId;
    const formModal = document.querySelector(`.modal[data-comment-id="${commentId}"]`);

    const closeForm = (event) => {  
        formModal.classList.remove("show");
        overlay.classList.remove("active");
    }

    button.addEventListener("click", closeForm);

}

function listenCloseModalDelete (button) {
    const overlay = document.querySelector(".overlay");
    const commentId = button.dataset.commentId;
    const formModal = document.querySelector(`.modal-delete[data-comment-id="${commentId}"]`);

    const closeForm = (event) => {  
        formModal.classList.remove("show");
        overlay.classList.remove("active");
    }

    button.addEventListener("click", closeForm);

}

function listenEditComment(form) {
    const overlay = document.querySelector(".overlay");
    
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
        overlay.classList.toggle("active");
        
    }

    form.addEventListener("submit", submitEditForm);
}

addListenerToElements(".btn--delete", listenDeleteButton);
addListenerToElements(".btn--modal-show", listenShowEditForm);
addListenerToElements(".btn--delete-show", listenShowDeleteForm);
addListenerToElements(".form--edit", listenEditComment);
addListenerToElements(".btn--close-modal", listenCloseModal);
addListenerToElements(".btn--close-modal--delete", listenCloseModalDelete);



addComment.addEventListener("submit", async (event) => {

    const overlay = document.querySelector(".overlay");
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
    addListenerToElements(".btn--delete-show", listenShowDeleteForm);
    addListenerToElements(".form--edit", listenEditComment);
    addListenerToElements(".btn--close-modal", listenCloseModal);
    addListenerToElements(".btn--close-modal--delete", listenCloseModalDelete);
    
});


