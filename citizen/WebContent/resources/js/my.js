const btnExpandInput = document.querySelector("#menu .drop_input");
const btnDropAccount = document.querySelector("#container .account");
const elementExpand = document.querySelector("#menu i.expand");
const elementDropAccount = document.querySelector("#container .drop_account");


// Xử lí sự kiện của menu bên trái
const btnNavigations = document.querySelectorAll("#menu .btn_navi");
const elementContent = document.querySelectorAll("#container > div");

for(const b of btnNavigations) {
    b.onclick = function() {
        for(i=0; i<btnNavigations.length; i++) {
            if(b === btnNavigations[i]) {
                btnNavigations[i].classList.add("open");
                elementContent[i+1].classList.add("open");
                if(i==2) {
                    addPage(document.querySelector(".view .content_bot div"), true);
                    addPage(document.querySelector(".person_info .content_bot div"), false);
                } 
                if(i==3) {
                    addPage(document.querySelector(".person_info .content_bot div"), true);
                    addPage(document.querySelector(".view .content_bot div"), false);
                }
            } else {
                btnNavigations[i].classList.remove("open");
                elementContent[i+1].classList.remove("open");
            }
        }
    }
}


// xử lí sự kiện khi click vào tùy chọn cấp quyền truy cập
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


//fetch

const selectSearchCity = document.querySelector(".view .search_city");
const selectSearchDistrict = document.querySelector(".view .search_district");
const selectSearchCommune = document.querySelector(".view .search_commune");

selectSearchCity.onchange = function() {
	while(selectSearchDistrict.hasChildNodes()) {
		selectSearchDistrict.removeChild(selectSearchDistrict.firstChild);
	}
	while(selectSearchCommune.hasChildNodes()) {
		selectSearchCommune.removeChild(selectSearchCommune.firstChild);
	}
	addElementSelect(selectSearchDistrict, 0, "Tất cả");
	addElementSelect(selectSearchCommune, 0, "Tất cả");
    let linkAPI = "/citizen/home/APIcity";
    fetch(linkAPI, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: "{\n\t\"cityID\":" + selectSearchCity.options[selectSearchCity.selectedIndex].value + "\n}",
    }).then(resp => {
        if(resp.status == 200) {
            return resp.json();
        }
    }).then(data => {
		console.log(data);
        for(let d of data) {
            addElementSelect(selectSearchDistrict, d.districtID, d.nameDistrict);
        }
    });
}

selectSearchDistrict.onchange = function() {
	while(selectSearchCommune.hasChildNodes()) {
		selectSearchCommune.removeChild(selectSearchCommune.firstChild);
	}
	addElementSelect(selectSearchCommune, 0, "Tất cả");
    let linkAPI = "/citizen/home/APIdistrict";
    fetch(linkAPI, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: "{\n\t\"districtID\":" + selectSearchDistrict.options[selectSearchDistrict.selectedIndex].value + "\n}",
    }).then(resp => {
        if(resp.status == 200) {
            return resp.json();
        }
    }).then(data => {
		console.log(data);
        for(let d of data) {
            addElementSelect(selectSearchCommune, d.communeID, d.nameCommune);
        }
    });
}

function addElementSelect(element, value, text) {
    const elementOption = document.createElement("option");
    elementOption.value = value;
    elementOption.innerHTML = text;
    element.appendChild(elementOption);
}

const selectCountCadres = document.querySelector(".view .content_top_count");
selectCountCadres.onchange = function() {
	let linkAPI = "/citizen/home/APIcount?" + "count=" + selectCountCadres.options[selectCountCadres.selectedIndex].value;
    fetch(linkAPI).then(resp => {
        if(resp.status == 200) {
            return resp.json();
        }
    }).then(data => {
		console.log(data);
    });
}


// xử lí phân trang
let htmlPage = "<ul class = \"paging\">\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'left')\"><span><i class=\"fas fa-chevron-left\"></i></span></li>\r\n"
+ "                        <li class = \"btn_page active\" onclick=\"clickBtnPagingView(this, 1)\"><span>1</span></li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 2)\"><span>2</span></li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 3)\"><span>3</span></li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 4)\"><span>4</span></li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 5)\"><span>5</span></li>\r\n"
+ "                        <li class = \"btn_page_middle\">.....</li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 640)\"><span>640</span></li>\r\n"
+ "                        <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'right')\"><span><i class=\"fas fa-chevron-right\"></i></span></li>\r\n"
+ "                    </ul>";

function addPage(element, isno) {
    if(isno) {
        element.innerHTML = htmlPage;
    } else {
        element.innerHTML = "";
    }
}
let countPageAppear = 5;
let isBefore = true;

function createBtnPage(element, value, classname, elementBefore) {
    const liPage = document.createElement("li");
    liPage.className = classname;
    const spanPage = document.createElement("span");
    spanPage.innerHTML = value;
    liPage.setAttribute("onclick", "clickBtnPagingView(this, "+ value +")");
    liPage.appendChild(spanPage);
    element.insertBefore(liPage, elementBefore);
}

function createPageMiddle(e) {
    const element = document.createElement("li");
    element.className = "btn_page_middle";
    element.innerHTML = "....";
    e.appendChild(element);
}

function clickBtnPagingView(e, value) {
    const btnPagingActive = document.querySelector(".content_bot .btn_page.active");
    const btnPagingMiddle = document.querySelector(".content_bot .btn_page_middle");
    const btnPaging = document.querySelectorAll(".content_bot .btn_page");
    const elementPaging = document.querySelector(".content_bot .paging");

    btnPagingActive.classList.remove("active");
    e.classList.add("active");
    let count = 0;
    for(i=0; i<document.querySelectorAll(".content_bot .paging li").length; i++) {
        if(document.querySelectorAll(".content_bot .paging li")[i] === btnPagingMiddle) {
            count = i;
        }
    }
    console.log(isBefore);
    if(value >= totalPage - countPageAppear + 1 && isBefore) {
        isBefore = false;
        for(i=1; i<count; i++) {
            elementPaging.removeChild(btnPaging[i]);
        }
        createBtnPage(elementPaging, 1, "btn_page", btnPagingMiddle);
        for(i=1; i<countPageAppear; i++) {
            if(totalPage + i - countPageAppear == value) {
                createBtnPage(elementPaging, value, "btn_page active", btnPaging[count]);
            } else {
                createBtnPage(elementPaging, totalPage + i - countPageAppear, "btn_page", btnPaging[count]);
            }
        }
    } else {
        if(!isBefore && value == 1){
            isBefore = true;
            for(i=2; i<6; i++) {
                elementPaging.removeChild(btnPaging[i]);
            }
            for(i=2; i<=countPageAppear; i++) {
                createBtnPage(elementPaging, i, "btn_page", btnPagingMiddle);
            }
        }
        const btnPagingFirst = btnPaging[1];
        let result = value - btnPagingFirst.firstChild.innerHTML;
        if(result == 3) {
            createBtnPage(elementPaging, value + result - 1, "btn_page", btnPagingMiddle);
            elementPaging.removeChild(btnPagingFirst);
        } else if(result == 4) {
            let index = 0;
            while(index < 2) {
                index++;
                createBtnPage(elementPaging, value + index, "btn_page", btnPagingMiddle);
            }
            elementPaging.removeChild(btnPagingFirst);
            elementPaging.removeChild(btnPaging[2]);
        }

        if(value > 1) {
            const btnPagingBeforeMiddle = btnPaging[count - 1];
            let result2 = btnPagingBeforeMiddle.firstChild.innerHTML - value;
            
            if(result2 == 3 && value - result2 + 1 != 0) {
                createBtnPage(elementPaging, value - result2 + 1, "btn_page", btnPagingFirst);
                elementPaging.removeChild(btnPagingBeforeMiddle);
            } else if(result2 == 4) {
                let index = 2;
                while(index != 0) {
                    index--;
                    console.log(index);
                    if(value - index - 1 > 0) {
                        createBtnPage(elementPaging, value - index - 1, "btn_page", e);   
                        elementPaging.removeChild(btnPaging[count - index - 1]);
                    }
                }
            }
        }
    }
}


function clickBtnArrow(e, arrow) {
    const btnPagingActive = document.querySelector(".content_bot .btn_page.active");
    const btnPagingMiddle = document.querySelector(".content_bot .btn_page_middle");
    const btnPaging = document.querySelectorAll(".content_bot .btn_page");
    const elementPaging = document.querySelector(".content_bot .paging");
    let count = 0;
    for(i=0; i<document.querySelectorAll(".content_bot .paging li").length; i++) {
        if(document.querySelectorAll(".content_bot .paging li")[i] === btnPagingMiddle) {
            count = i;
        }
    }
    if(arrow == 'left') {
        btnPagingActive.classList.remove("active");
        if(isBefore) {
            for(i=1; i<count; i++) {
                elementPaging.removeChild(btnPaging[i]);
            }
            createBtnPage(elementPaging, 1, "btn_page active", btnPagingMiddle);
            for(i=2; i<=countPageAppear; i++) {
                createBtnPage(elementPaging, i, "btn_page", btnPagingMiddle);
            }
        } else {
            isBefore = true;
            for(i=1; i<6; i++) {
                elementPaging.removeChild(btnPaging[i]);
            }
            createBtnPage(elementPaging, 1, "btn_page active", btnPagingMiddle);
            for(i=2; i<=countPageAppear; i++) {
                createBtnPage(elementPaging, i, "btn_page", btnPagingMiddle);
            }
        }
    } else {
        btnPagingActive.classList.remove("active");
        if(isBefore) {
            for(i=2; i<count; i++) {
                elementPaging.removeChild(btnPaging[i]);
            }
            for(i=1; i<countPageAppear; i++) {
                createBtnPage(elementPaging, totalPage + i - countPageAppear, "btn_page", btnPaging[6]);
            }
            isBefore = false;
        } else {
            btnPagingActive.classList.remove("active");
        }
        btnPaging[6].classList.add("active");
    }
}

