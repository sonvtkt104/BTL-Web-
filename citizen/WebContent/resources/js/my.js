const btnExpandInput = document.querySelector("#menu .drop_input");
const btnDropAccount = document.querySelector("#container .account");
const elementExpand = document.querySelector("#menu i.expand");
const elementDropAccount = document.querySelector("#container .drop_account");


// Xử lí sự kiện của menu bên trái
function clickTabMenu(element, type) {
	const btnNavigations = document.querySelector("#menu .btn_navi.open");
	const elementContentOpen = document.querySelector("#container > div.open");
	const elementContent = document.querySelectorAll("#container > div");
	btnNavigations.classList.remove("open");
	let i = 0;
	switch(type) {
		case 'home':
			i = 1;
			break;
		case 'input':
			i = 2;
			break;
		case 'cadres':
			totalPage = totalPageCadres;
			isCadresOrCitizen = true;
			if(onclickCadres == 0) {
				varPromisePageCadres = handlePage(totalPage, true, false);
			}
			onclickCadres++;
            addPage(document.querySelector(".view .content_bot div"), true, handlePage(totalPage, true, false));
            addPage(document.querySelector(".person_info .content_bot div"), false, handlePage(totalPage, false, false));
			i = 3;
			break;
		case 'citizen':
			totalPage = totalPageCitizen;
			isCadresOrCitizen = false;
			if(onclickCitizen == 0) {
				varPromisePageCitizen = handlePage(totalPage, true, false);
			}
			onclickCitizen++;
            addPage(document.querySelector(".person_info .content_bot div"), true, handlePage(totalPage, false, false));
            addPage(document.querySelector(".view .content_bot div"), false, handlePage(totalPage, true, false));
			i = 4;
			break;
	}
	element.classList.add("open");
	elementContentOpen.classList.remove("open");
	elementContent[i].classList.add("open");
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
const selectSearchCity = document.querySelector(".person_info .search_city");
const selectSearchDistrict = document.querySelector(".person_info .search_district");
const selectSearchCommune = document.querySelector(".person_info .search_commune");
const selectSearchVillage = document.querySelector(".person_info .search_village");
console.log(selectSearchCommune);
if(selectSearchCity != null) {
	selectSearchCity.onchange = function() {
		while(selectSearchDistrict.hasChildNodes()) {
			selectSearchDistrict.removeChild(selectSearchDistrict.firstChild);
		}
		while(selectSearchCommune.hasChildNodes()) {
			selectSearchCommune.removeChild(selectSearchCommune.firstChild);
		}
		while(selectSearchVillage.hasChildNodes()) {
			selectSearchVillage.removeChild(selectSearchVillage.firstChild);
		}
		addElementSelect(selectSearchDistrict, 0, "Tất cả");
		addElementSelect(selectSearchCommune, 0, "Tất cả");
		addElementSelect(selectSearchVillage, 0, "Tất cả");
		fetch("/citizen/home/APIcity", {
	        method: 'POST',
	        headers: {
	            "Content-type": "application/json",
	        },
	        body: "{\n\t\"cityID\": \"" + selectSearchCity.options[selectSearchCity.selectedIndex].value + "\"\n}",
		    }).then(resp => {
		        if(resp.status == 200) {
		            return resp.json();
		        }
		    }).then(data => {
				for(let d of data) {
		            addElementSelect(selectSearchDistrict, d.districtID, d.nameDistrict);
		    }
	    });
		let dataBody = getDataCitizen(rank);
		console.log(dataBody);
		fetchCitizen("/citizen/home/APIcitizen", dataBody, true);
	}
}

if(selectSearchDistrict != null) {
	console.log(1);
	selectSearchDistrict.onchange = function() {
		while(selectSearchCommune.hasChildNodes()) {
			selectSearchCommune.removeChild(selectSearchCommune.firstChild);
		}
		while(selectSearchVillage.hasChildNodes()) {
			selectSearchVillage.removeChild(selectSearchVillage.firstChild);
		}
		addElementSelect(selectSearchCommune, 0, "Tất cả");
		addElementSelect(selectSearchVillage, 0, "Tất cả");
		fetch("/citizen/home/APIdistrict", {
	    method: 'POST',
	        headers: {
	            "Content-type": "application/json",
	        },
	        body: "{\n\t\"districtID\": \"" + selectSearchDistrict.options[selectSearchDistrict.selectedIndex].value + "\"\n}",
	    }).then(resp => {
	        if(resp.status == 200) {
	            return resp.json();
	        }
	    }).then(data => {
			for(let d of data) {
	            addElementSelect(selectSearchCommune, d.communeID, d.nameCommune);
			}
	 	});
		let dataBody = getDataCitizen(rank);
		console.log(dataBody);
		fetchCitizen("/citizen/home/APIcitizen", dataBody, true);
	}
}
if(selectSearchCommune != null) {
	selectSearchCommune.onchange = function() {
		while(selectSearchVillage.hasChildNodes()) {
			selectSearchVillage.removeChild(selectSearchVillage.firstChild);
		}
		addElementSelect(selectSearchVillage, 0, "Tất cả");
		fetch("/citizen/home/APIcommune", {
        method: 'POST',
	        headers: {
	            "Content-type": "application/json",
	        },
	        body: "{\n\t\"communeID\": \"" + selectSearchCommune.options[selectSearchCommune.selectedIndex].value + "\"\n}",
	    }).then(resp => {
	        if(resp.status == 200) {
	            return resp.json();
	        }
	    }).then(data => {
			for(let d of data) {
	            addElementSelect(selectSearchVillage, d.villageID, d.nameVillage);
			}
	 	});
		let dataBody = getDataCitizen(rank);
		console.log(dataBody);
		fetchCitizen("/citizen/home/APIcitizen", dataBody, true);
	}
}

if(selectSearchVillage != null) {
	selectSearchVillage.onchange = function() {
		const search = document.querySelector(".person_info .search input");
		let dataBody = getDataCitizen(rank);
		fetchCitizen("/citizen/home/APIcitizen", dataBody, true);
	}
}

function addElementSelect(element, value, text) {
    const elementOption = document.createElement("option");
    elementOption.value = value;
    elementOption.innerHTML = text;
    element.appendChild(elementOption);
}

const selectCountCadres = document.querySelector(".view .content_top_count");
selectCountCadres.onchange = function() {
	let linkAPI = "/citizen/home/APIcadres";
	let dataBody;
	const page = document.querySelector(".content_bot .btn_page.active");
	const search = document.querySelector(".view .search input");
	dataBody = new InfoCadres(selectCountCadres.options[selectCountCadres.selectedIndex].value, 
									"0", "0", "0", "0",
									"1", search.value);
	fetchCadres(linkAPI, dataBody, true);
}
const selectCountCitizen = document.querySelector(".person_info .content_top_count");
selectCountCitizen.onchange = function() {
	let linkAPI = "/citizen/home/APIcitizen";
	let dataBody = getDataCitizen(rank);
	dataBody.count = this.options[this.selectedIndex].value;
	fetchCitizen(linkAPI, dataBody, true);
}

function InfoCadres(count, cityID, districtID, 
    				communeID, villageID, page, search) {
        this.count = count;
        this.cityID = cityID;
        this.districtID = districtID;
        this.communeID = communeID;
        this.villageID = villageID;
        this.page = page;
        this.search = search;
}

function fetchCadres(linkAPI, dataBody, isno) {
	fetch(linkAPI, {
    method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(dataBody),
    }).then(resp => {
        if(resp.status == 200) {
            return resp.json();
        }
    }).then(data => {
		//cap nhat trang
		if(isno) {
			totalPage = data.countPage;
			addPage(document.querySelector(".person_info .content_bot div"), false, handlePage(totalPage, true, true));
	        addPage(document.querySelector(".view .content_bot div"), true, handlePage(totalPage, true, true));	
			varPromisePageCadres = handlePage(totalPage, true, true);
		}

		document.querySelector(".view .content_bot .count_left").innerHTML = data.countleft + 1;
		document.querySelector(".view .content_bot .count_right").innerHTML = data.countright;
		document.querySelector(".view .content_bot .size").innerHTML = data.size;
		
		updateTableView(data.dataresponse, data.countleft, data.countright, 'cadres');
 	});
}


function fetchCitizen(linkAPI, dataBody, isno) {
	console.log(JSON.stringify(dataBody));
	fetch(linkAPI, {
    method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(dataBody),
    }).then(resp => {
        if(resp.status == 200) {
            return resp.json();
        }
    }).then(data => {
		//cap nhat trang
		if(isno) {
			totalPage = data.countPage;
			addPage(document.querySelector(".person_info .content_bot div"), true, handlePage(totalPage, false, true));
	        addPage(document.querySelector(".view .content_bot div"), false, handlePage(totalPage, true, true));	
			varPromisePageCitizen = handlePage(totalPage, true, true);
		}

		document.querySelector(".person_info .content_bot .count_left").innerHTML = data.countleft + 1;
		document.querySelector(".person_info .content_bot .count_right").innerHTML = data.countright;
		document.querySelector(".person_info .content_bot .size").innerHTML = data.size;
		
		updateTableView(data.dataresponse, data.countleft, data.countright, 'citizen');
 	});
}


function updateTableView(data, countleft, countright, type) {
	if(type == 'cadres') {
		document.querySelector(".view table tbody").innerHTML = "";
		let html1 = "";
		for(let d of data) {
			let stt = (d.status) ? "Tự do" : "Khóa";
			countleft++;
			html1 += "<tr>\r\n"
			+ "	                            <td>"+ countleft +"</td>\r\n"
			+ "	                            <td>"+ d.username +"</td>\r\n"
			+ "	                            <td>"+ d.password +"</td>\r\n"
			+ "	                            <td>"+ d.rank +"</td>\r\n"
			+ "	                            <td>"+ d.managearea +"</td>\r\n"
			+ "	                            <td>"+ stt +"</td>\r\n"
			+ "	                            <td>"+ d.accesstime +"</td>\r\n"
			+ "	                            <td class = \"action\">\r\n"
			+ "	                                <div>\r\n"
			+ "	                                    <i class=\"fas fa-ellipsis-h\"></i>\r\n"
			+ "	                                    <ul class = \"\">\r\n"
			+ "	                                        <li><a href=\"#\"><i class=\"fas fa-street-view\"></i>Cấp quyền</a></li>\r\n"
			+ "	                                        <li><a href=\"#\"><i class=\"far fa-edit\"></i>Sửa đổi</a></li>\r\n"
			+ "	                                        <li><a href=\"#\"><i class=\"far fa-trash-alt\"></i>Xóa</a></li>\r\n"
			+ "	                                        <li><a href=\"#\"><i class=\"fas fa-user-tag\"></i>Thông tin</a></li>\r\n"
			+ "	                                    </ul>\r\n"
			+ "	                                </div>\r\n"
			+ "	                            </td>\r\n"
			+ "	                        </tr>";
		}
		
		document.querySelector(".view table tbody").innerHTML = html1;
	} else {
		document.querySelector(".person_info table tbody").innerHTML = "";
		let html1 = "";
		for(let d of data) {
			countleft++;
			html1 += "<tr>\r\n"
						+ "	                            <td>"+ countleft +"</td>\r\n"
						+ "	                            <td class = \"info\">"+ d.name +"</td>\r\n"
						+ "	                            <td>"+ d.dob +"</td>\r\n"
						+ "	                            <td>"+ d.numberID +"</td>\r\n"
						+ "	                            <td class = \"info_list_address\">\r\n"
						+ "	                                <p>"+ d.permanent +"</p>\r\n"
						+ "	                            </td>\r\n"
						+ "	                            <td>"+ d.ethnicGroup +"</td>\r\n"
						+ "	                            <td>"+ d.eduLevel +"</td>\r\n"
						+ "	                            <td>"+ d.job +"</td>\r\n"
						+ "	                            <td><i class=\"fas fa-ellipsis-h\"></i></td>\r\n"
						+ "	                        </tr>";
		}
		document.querySelector(".person_info table tbody").innerHTML = html1;
	}
} 

function getDataCitizen(rank) {
	const selectSearchCity = document.querySelector(".person_info .search_city");
	const selectSearchDistrict = document.querySelector(".person_info .search_district");
	const selectSearchCommune = document.querySelector(".person_info .search_commune");
	const selectSearchVillage = document.querySelector(".person_info .search_village");
	const selectCountCitizen = document.querySelector(".person_info .content_top_count");
	
	let data = {
		cityID: (selectSearchCity != null) ? selectSearchCity.value : "0",
		districtID: (selectSearchDistrict != null) ? selectSearchDistrict.value : "0",
		communeID: (selectSearchCommune != null) ? selectSearchCommune.value : "0",
		villageID: (selectSearchVillage != null) ? selectSearchVillage.value : "0",
		page: 1, 
		count: (selectCountCitizen != null) ? selectCountCitizen.value : "25",
		search: ""
	}
	switch(rank) {
		case 'A2':
			data.cityID = "0";
			break;
		case 'A3':
			data.cityID = "0";
			data.districtID = "0";
			break;
		case 'B1':
			data.cityID = "0";
			data.districtID = "0";
			data.communeID = "0";
			break;
	}
	return data;
}


function clickBtnPagingView(e, value) {
    const btnPagingActive = document.querySelector(".content_bot .btn_page.active");
    const btnPagingMiddle = document.querySelector(".content_bot .btn_page_middle");
    const btnPaging = document.querySelectorAll(".content_bot .btn_page");
    const elementPaging = document.querySelector(".content_bot .paging");

	const search = document.querySelector(".view .search input");
	if(isCadresOrCitizen) {
		let dataBodyCadres = new InfoCadres(document.querySelector(".view .content_top_count").value, 
								"0", "0", "0", "0",
								value + "", search.value);
								
		fetchCadres("/citizen/home/APIcadres", dataBodyCadres, false);	
	} else {
		let dataBodyCitizen = getDataCitizen(rank);
		dataBodyCitizen.page = value;
		fetchCitizen("/citizen/home/APIcitizen", dataBodyCitizen, false);
	}

    btnPagingActive.classList.remove("active");
    e.classList.add("active");
    let count = 0;
	if(totalPage > countPageAppear) {
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
	        if(result == 3 && !isBefore) {
	            isBefore = true;
	            for(i=2; i<6; i++) {
	                elementPaging.removeChild(btnPaging[i]);
	            }
	            for(i=2; i<=countPageAppear; i++) {
	                if(value == i) {
	                    createBtnPage(elementPaging, value, "btn_page active", btnPagingMiddle);
	                } else {
	                    createBtnPage(elementPaging, i, "btn_page", btnPagingMiddle);
	                }
	            }
	        } else if(result == 3 && isBefore) {
	            createBtnPage(elementPaging, value + result - 1, "btn_page", btnPagingMiddle);
	            elementPaging.removeChild(btnPagingFirst);
	        } else if(result == 4 && isBefore) {
	            let index = 0;
	            while(index < 2) {
	                index++;
	                createBtnPage(elementPaging, value + index, "btn_page", btnPagingMiddle);
	            }
	            elementPaging.removeChild(btnPagingFirst);
	            elementPaging.removeChild(btnPaging[2]);
	        } else {
	            
	        }
	    }
	} else {
		btnPagingActive.classList.remove("active");
		e.classList.add("active");
	}
	
	if(isCadresOrCitizen) {
		varPromisePageCadres = document.querySelector(".view .content_bot div").innerHTML;
	} else {
		varPromisePageCitizen = document.querySelector(".person_info .content_bot div").innerHTML;
		console.log(varPromisePageCitizen);
	}
}
function clickBtnArrow(e, arrow) {
    const btnPagingActive = document.querySelector(".content_bot .btn_page.active");
    const btnPagingMiddle = document.querySelector(".content_bot .btn_page_middle");
    const btnPaging = document.querySelectorAll(".content_bot .btn_page");
    const elementPaging = document.querySelector(".content_bot .paging");
    let count = 0;
	let index = (totalPage > 7) ? 6 : totalPage;
	let val = (arrow == 'left') ? btnPaging[1].firstChild.innerHTML : btnPaging[index].firstChild.innerHTML;
	if(isCadresOrCitizen) {
		const search = document.querySelector(".view .search input");
		let dataBodyCadres = new InfoCadres(document.querySelector(".view .content_top_count").value, 
									"0", "0", "0", "0",
									val + "", search.value);
		console.log(dataBodyCadres);
		fetchCadres("/citizen/home/APIcadres", dataBodyCadres, false);	
	} else {
		let dataBodyCitizen = getDataCitizen(rank);
		dataBodyCitizen.page = val;
		fetchCitizen("/citizen/home/APIcitizen", dataBodyCitizen, false);
	}
	if(totalPage > countPageAppear) {
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
	} else {
		btnPagingActive.classList.remove("active");
		if(arrow == 'left') {
			btnPaging[1].classList.add("active");
		} else {
			btnPaging[totalPage].classList.add("active");
		}
	}
	if(isCadresOrCitizen) {
		varPromisePageCadres = document.querySelector(".view .content_bot div").innerHTML;
	} else {
		varPromisePageCitizen = document.querySelector(".person_info .content_bot div").innerHTML;
		console.log(varPromisePageCitizen);
	}
}


// xử lí phân trang
function handlePage(totalPage, type, update) {
	let htmlPage;
	if(totalPage > 7) {
		htmlPage = "<ul class = \"paging\">\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'left')\"><span><i class=\"fas fa-chevron-left\"></i></span></li>\r\n"
					+ "                        <li class = \"btn_page active\" onclick=\"clickBtnPagingView(this, 1)\"><span>1</span></li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 2)\"><span>2</span></li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 3)\"><span>3</span></li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 4)\"><span>4</span></li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, 5)\"><span>5</span></li>\r\n"
					+ "                        <li class = \"btn_page_middle\">.....</li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnPagingView(this, "+ totalPage +")\"><span>"+ totalPage +"</span></li>\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'right')\"><span><i class=\"fas fa-chevron-right\"></i></span></li>\r\n"
					+ "                    </ul>";
	
	} else {
		htmlPage = "<ul class = \"paging\">\r\n"
					+ "                        <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'left')\"><span><i class=\"fas fa-chevron-left\"></i></span></li>\r\n"
					+ "                        <li class = \"btn_page active\" onclick=\"clickBtnPagingView(this, 1)\"><span>1</span></li>\r\n";
		for(i=2; i<=totalPage; i++) {
			htmlPage += "<li class = \"btn_page\" onclick=\"clickBtnPagingView(this, "+ i +")\"><span>"+ i +"</span></li>\r\n";
		}
		
		htmlPage += "                    <li class = \"btn_page\" onclick=\"clickBtnArrow(this, 'right')\"><span><i class=\"fas fa-chevron-right\"></i></span></li>\r\n"
					+ "                    </ul>";
	}
	
	if(type) {
		htmlPage = (onclickCadres > 1) ? varPromisePageCadres : htmlPage;
	} else {
		htmlPage = (onclickCitizen > 1) ? varPromisePageCitizen : htmlPage;
	}
	return htmlPage;	
}


function addPage(element, isno, htmlPage) {
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


//nhập liệu
const elementInput = document.querySelector(".input_general .input_content_grid");
function submitFromPutCitizen() {
	let dataBody = {
		name: document.querySelector(".input_general #name").value,
		dob: document.querySelector(".input_general #dob").value,
		numberID: document.querySelector(".input_general #numberID").value,
		gender: document.querySelector(".input_general #female").checked,
		ethnicGroup: document.querySelector(".input_general #ethnicGroup").value,
		poo: document.querySelector(".input_general #poo").value,
		permanent: document.querySelector(".input_general #permanent").value,
		temporary: document.querySelector(".input_general #temporary").value,
		job: document.querySelector(".input_general #job").value,
		eduLevel: document.querySelector(".input_general #eduLevel").value
	}
	fetch("/citizen/home/input", {
		method: 'POST',
		    headers: {
		        "Content-type": "application/json",
		    },
		    body: JSON.stringify(dataBody),
		}).then(resp => {
		    if(resp.status == 200) {
		        return resp.json();
		    }
		}).then(data => {
			console.log(data.result);
	});
}

