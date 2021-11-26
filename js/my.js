const btnExpandInput = document.querySelector("#menu .drop_input");
const btnDropAccount = document.querySelector("#container .account");
const elementExpand = document.querySelector("#menu i.expand");
const elementDropAccount = document.querySelector("#container .drop_account");

const btnNavigations = document.querySelectorAll("#menu .btn_navi");
const elementContent = document.querySelectorAll("#container > div");

for(const b of btnNavigations) {
    b.onclick = function() {
        for(i=0; i<btnNavigations.length; i++) {
            if(b === btnNavigations[i]) {
                btnNavigations[i].classList.add("open");
                elementContent[i+1].classList.add("open");
                if(i==0 || i==3 || i==4) {
                    btnExpandInput.classList.remove("open");
                    elementExpand.classList.remove("rotate");
                    document.querySelector("#menu .input > span").classList.remove("open");
                }
            } else {
                btnNavigations[i].classList.remove("open");
                elementContent[i+1].classList.remove("open");
            }
        }
    }
}

function expandInput() {
    if(btnExpandInput.className.indexOf("open") != -1) {
        btnExpandInput.classList.remove("open");
        elementExpand.classList.remove("rotate");
        document.querySelector("#menu .input > span").classList.remove("open");
    } else {
        btnExpandInput.classList.add("open");
        elementExpand.classList.add("rotate");
        document.querySelector("#menu .input > span").classList.add("open");
        for(i=0; i<btnNavigations.length; i++) {
            if(i!=1 || i!=2) {
                btnNavigations[i].classList.remove("open");
            }
        }
    }
}

const btnOptionLists = document.querySelectorAll(".view_content .action > div");
const elementDropOptionLists = document.querySelectorAll(".view_content .action ul");

window.addEventListener('click', function(e) {
    for(i=0; i<btnOptionLists.length; i++) {
        if(btnOptionLists[i].contains(e.target)) {
            if(elementDropOptionLists[i].className.indexOf("open") != -1){
                elementDropOptionLists[i].classList.remove("open");
            } else {
                elementDropOptionLists[i].classList.add("open");
            }
        } else {
            elementDropOptionLists[i].classList.remove("open");
        }
    }
    if(btnDropAccount.contains(e.target)) {
        if(elementDropAccount.className.indexOf("open") != -1) {
            elementDropAccount.classList.remove("open");
        } else {
            elementDropAccount.classList.add("open");
        }
    } else {
        elementDropAccount.classList.remove("open");
    }
})

