function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function changeFromFirstToSecond() {
    buttonToClick.classList.add("missing");
    buttonToClick.addEventListener("animationend", (event) => event.target.remove());

    await timeout(500);
    myName.classList.add("missing");
    myName.addEventListener("animationend", (event) => event.target.remove());

    await timeout(500);
    profileDiv1.classList.add("on-screen");

    await timeout(100);
    displayProfile.classList.add("on-screen");

    await timeout(1000);
    const title = displayProfile.querySelector("#mid-text-dp");
    title.classList.add("on-screen");

    await timeout(300);
    const smallText = displayProfile.querySelector("#small-text-dp");
    smallText.classList.add("on-screen");

    await timeout(500);

    const buttonInterested = displayProfile.querySelector("#interest-button");
    buttonInterested.addEventListener("click", openSecondPage);
    buttonInterested.classList.add("on-screen");
    
}

async function openSecondPage(event) {
    const title = displayProfile.querySelector("#mid-text-dp");
    title.classList.remove("on-screen");

    await timeout(300);
    const smallText = displayProfile.querySelector("#small-text-dp");
    smallText.classList.remove("on-screen");

    await timeout(500);

    const buttonInterested = displayProfile.querySelector("#interest-button");
    buttonInterested.classList.remove("on-screen");

    await timeout(500);
    whatIDo.classList.add("on-screen");

    await timeout(1000);
    profileDiv2.classList.add("on-screen");

    await timeout(1000);

    const titleNew = whatIDo.querySelector("#mid-text-wid");
    titleNew.classList.add("on-screen");

    await timeout(300);

    const smallTextNew = whatIDo.querySelector("#small-text-wid");
    smallTextNew.classList.add("on-screen");

    await timeout(500);

    const buttonNew = whatIDo.querySelector("#what-next-button");
    buttonNew.addEventListener("click", displayPortfolio);
    buttonNew.classList.add("on-screen");


}

async function displayPortfolio(event) {
    const buttonNew = whatIDo.querySelector("#what-next-button");
    buttonNew.removeEventListener("click", displayPortfolio);
    buttonNew.classList.remove("on-screen");

    await timeout(500);

    const smallTextNew = whatIDo.querySelector("#small-text-wid");
    smallTextNew.classList.remove("on-screen");
    
    await timeout(300);
    
    const titleNew = whatIDo.querySelector("#mid-text-wid");
    titleNew.classList.remove("on-screen");

    const whole = document.querySelector(".whole");
    whole.classList.add("on-screen");

    await timeout(1000);
    const textOverflow = document.querySelector(".text-overflow");
    textOverflow.classList.add("play");

    const projects = document.querySelector(".display-proj");
    projects.classList.add("on-screen");

    const allProjects = document.querySelectorAll(".project");

    await timeout(500);
    console.log(allProjects);
    for (let project of allProjects) {
        project.classList.add("on-screen");
        await timeout(500);
    }

}

const buttonToClick = document.querySelector("#button-to-click");
const myName = document.querySelector(".clip-path-text.poppins");
const displayProfile = document.querySelector(".display-profile");
const profileDiv1 = document.querySelector(".profile-div-1");
const profileDiv2 = document.querySelector(".profile-div-2");
const whatIDo = document.querySelector(".what-i-do");

buttonToClick.addEventListener("click", changeFromFirstToSecond);