const btnDropAccount = document.querySelector("#container .account");
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
			if(onclickCadres === 0) {
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
			if(onclickCitizen === 0) {
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
const actionInfoList = document.querySelectorAll(".info_list .action > div");
const elementDropActionInfoList = document.querySelectorAll(".info_list .action ul");

window.addEventListener('click', function(e) {
    for(i=0; i<btnOptionLists.length; i++) {
        if(btnOptionLists[i].contains(e.target)) {
            if(elementDropOptionLists[i].className.indexOf("open") !== -1){
                elementDropOptionLists[i].classList.remove("open");
            } else {
                elementDropOptionLists[i].classList.add("open");
            }
        } else {
            elementDropOptionLists[i].classList.remove("open");
        }
    }
	for (i = 0; i < actionInfoList.length; i++) {
		if (actionInfoList[i].contains(e.target)) {
			if (elementDropActionInfoList[i].className.indexOf("open") != -1) {
				elementDropActionInfoList[i].classList.remove("open");
			} else {
				elementDropActionInfoList[i].classList.add("open");
			}
		} else {
			elementDropActionInfoList[i].classList.remove("open");
		}
	}
    if(btnDropAccount.contains(e.target)) {
        if(elementDropAccount.className.indexOf("open") !== -1) {
            elementDropAccount.classList.remove("open");
        } else {
            elementDropAccount.classList.add("open");
        }
    } else {
        elementDropAccount.classList.remove("open");
    }

	// Đóng khung thông tin, sửa tài khoản, cấp quyền của Trang cấp quyền truy cập
	$(".exit").click(function () {
		$(".edit").remove();
		$(".grant").remove();
		$(".detail").remove();
	})
	// Ân váo nút Đồng ý cấp quyền
	$(".view_content .submit_grant input").click(function () {
		alert("Cấp quyền thành công")
		/**
		 * Fetch------
		 */
		$(".grant").remove();
	})
	// Ân váo nút Đồng ý Sửa đổi User
	$(".view_content .submit_edit input").click(function () {
		alert("Sửa thành công")
		/**
		 * Fetch---------
		 */
		$(".edit").remove();
	})
	//Ấn vào nút đồng ý Sửa đổi thông tin người dân
	$(".info_list .submit_edit input").click(function () {
		alert("Sửa thành công");
		/**
		 * Fetch-------------
		 */
		$(".info_list .edit").remove();
	})
})

// // Responsive Menu
// document.getElementById("menu_responsive").onclick = function () {
// 	if (document.getElementById("menu_responsive").checked === true) {
// 		document.getElementById("menu").classList.toggle("toggle_menu");
// 	}
// 	else {
// 		document.getElementById("menu").classList.toggle("toggle_menu");
// 	}
// }

//Xoa tai khoan
const deleteUser = document.querySelectorAll(".view_content .delete_user");
for (let i of deleteUser) {
	i.onclick = function () {
		var result = confirm("Are you sure you want to delete?");
		if (result) {
			console.log("da xoa");
			/**
			 * fetch -----------------
			 */
		}
	}
}

//Chi tiet thong tin tài khoản
$(".view_content .detail_user").click(function () {
	/**
	 * Fetch lấy thông tin xong đổ vào mã bên dưới
	 */
	let obj = {
		username: $(this).parent().parent().parent().parent().children(".view_username").html()
	}
	fetch("/citizen_war_exploded/home/APIcadres", {
		method: 'POST',
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(obj),
	}).then(resp => {
		if(resp.status === 200) {
			return resp.json();
		}
	}).then(data => {
		//nhận data và tạo element
		if ($(this).parent().parent().parent().parent().next().prop("class") === "detail") {
			$(".detail").remove();
		} else {
			$(".edit").remove();
			$(".grant").remove();
			$(".detail").remove();
			let html = '<tr class="detail">';
			html += '<td colspan="8">';
			html += '<h3>Thông tin chi tiết</h3>';
			html += '<div class="detail_info">';
			html += '<div class="left">';
			html += '<h4>Hà Nội</h4>';
			html += '<p>Mã vùng: <span class="code">'+ data.numberID +'</span></p>'
			html += '<p>Trạng thái: <span class="static">'+ data.status +'</span></p>';
			html += '<p>Chức vụ: <span class="rank">'+ data.rank +'</span></p>';
			html += '<p>Thời gian cấp quyền: <span class="accesstime">'+ data.accesstime +'</span></p></div>';
			html += '<div class="right"><h4>Tài khoản</h4>';
			html += '<div><label for="">Tên tài khoản: </label> <input type="text" value="'+ data.username +'"></div>';
			html += '<div><label>Mật khẩu: </label> <input type="text" value="'+ data.password +'"></div>';
			html += '<div><label>Ngày khởi tạo: </label> <input type="date" value="2021-11-11"></div></div></div>';
			html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
			$(this).parent().parent().parent().parent().after(html);
		}
	});
})

// Cấp quyền user
$(".view_content .grant_user").click(function () {
	/**
	 * Fetch lấy thông tin xong đổ vào mã bên dưới
	 */
	let obj = {
		username: $(this).parent().parent().parent().parent().children(".view_username").html()
	}
	fetch("/citizen_war_exploded/home/APIcadres", {
		method: 'POST',
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(obj),
	}).then(resp => {
		if(resp.status === 200) {
			return resp.json();
		}
	}).then(data => {
		//nhận data và tạo element
		if ($(this).parent().parent().parent().parent().next().prop("class") === "grant") {
			$(".grant").remove();
		} else {
			$(".edit").remove();
			$(".detail").remove();
			$(".grant").remove();
			let html = '<tr class="grant">';
			html += '<td colspan="8">';
			html += '<h3>Cấp quyền</h3>';
			html += '<div class="grant_info">';
			html += '<div class="left">';
			html += '<h4>Hà Nội</h4>';
			html += '<p>Mã vùng: <span class="code">'+ data.numberID +'</span></p>'
			html += '<p>Trạng thái: <span class="static">'+ data.status +'</span></p>';
			html += '<p>Chức vụ: <span class="rank">'+ data.rank +'</span></p>';
			html += '<p>Thời gian cấp quyền: <span class="accesstime">'+ data.accesstime +'</span></p></div>';
			html += '<div class="right">';
			html += '<div><label>Ngày bắt đầu: </label> <input type="datetime-local"></div>';
			html += '<div><label for="">Đến</label></div>';
			html += '<div><label>Ngày kết thúc: </label> <input type="datetime-local"></div>';
			html += '<div class="submit_grant"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
			html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
			$(this).parent().parent().parent().parent().after(html);
		}
	});
})

// Edit tài khoản
$(".view_content .edit_user").click(function () {
	/**
	 * Fetch lấy thông tin xong đổ vào mã bên dưới
	 */
	let obj = {
		username: $(this).parent().parent().parent().parent().children(".view_username").html()
	}
	fetch("/citizen_war_exploded/home/APIcadres", {
		method: 'POST',
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(obj),
	}).then(resp => {
		if(resp.status === 200) {
			return resp.json();
		}
	}).then(data => {
		//nhận data và tạo element
		if ($(this).parent().parent().parent().parent().next().prop("class") === "edit") {
			$(".edit").remove();
		} else {
			$(".edit").remove();
			$(".grant").remove();
			$(".detail").remove();
			let html = '<tr class="edit">';
			html += '<td colspan="8">';
			html += '<h3>Sửa tài khoản</h3>';
			html += '<div class="edit_info">';
			html += '<div class="left">';
			html += '<h4>Hà Nội</h4>';
			html += '<p>Mã vùng: <span class="code">'+ data.numberID +'</span></p>'
			html += '<p>Trạng thái: <span class="static">'+ data.status +'</span></p>';
			html += '<p>Chức vụ: <span class="rank">'+ data.rank +'</span></p>';
			html += '<p>Thời gian cấp quyền: <span class="accesstime">'+ data.accesstime +'</span></p></div>';
			html += '<div class="right"><h4>Tài khoản</h4>';
			html += '<div><label>Mật khẩu cũ: </label> <input type="text" value=""></div>';
			html += '<div><label>Mật khẩu mới: </label> <input type="text"></div>';
			html += '<div><label>Nhập lại mật khẩu mới: </label> <input type="text"></div>';
			html += '<div class="submit_edit"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
			html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
			$(this).parent().parent().parent().parent().after(html);
		}
	});
})

//CountDown
//mm-dd-yyyy
let accessDateCadres = accessDateTimeCadres.split(" ")[0];
let accessTimeCadres = accessDateTimeCadres.split(" ")[1];
console.log(accessDateTimeCadres)
const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24
const endCountDown = accessDateCadres.split("-")[1] + "/" + accessDateCadres.split("-")[2] + "/" + accessDateCadres.split("-")[0]
					+ " " + accessTimeCadres;

const countDown = new Date(endCountDown).getTime();
var start = setInterval(function () {
	const now = new Date().getTime(),
		distance = countDown - now;
		if (distance < 0) {
			document.getElementById("headline").innerText = "Hết thời gian điều tra";
			clearInterval(start);
		} else {
			document.getElementById("days").innerText = Math.floor(distance / (day)),
			document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
			document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
			document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
		}
}, 0);


// Cấp tài khoản user
document.querySelector(".add_user > button").onclick = function () {
	document.querySelector(".add_user_detail").style.display = 'flex';
}
document.querySelector(".add_user_detail > button").onclick = function () {
	document.querySelector(".add_user_detail").style.display = 'none';
}

// Add tài khoản mới
$(".add_user_detail > input").click(function() {
	document.querySelector(".add_user_detail").style.display = 'none';
	alert("Thêm tài khoản thành công");
	/**
	 * Fetch
	 */
})

// Xóa thông tin người dân
$(".delete_person").click(function () {
	var result = confirm("Are you sure you want to delete?");
	if (result) {
		console.log("da xoa");
		/**
		 * fetch -----------------
		 */
	}
})

//Sửa thông tin người dân
$(".info_list .edit_person").click(function () {
	/**
	 * Fetch lấy thông tin xong đổ vào mã bên dưới
	 */
	if ($(this).parent().parent().parent().parent().next().prop("class") == "edit") {
		$(".edit").remove();
	} else {
		$(".edit").remove();
		$(".detail").remove();
		let html = '<tr class="edit"><td colspan="7"><h3>Sửa thông tin người dân</h3>';
			html += '<div class="edit_info"><div class="left">';
			html += '<p>Mã đơn vị quản lý: <span class="code">0101</span></p>';
			html += '<p>Đơn vị quản lý: <span class="static">Xã Khai Thái</span></p>';
			html += '<div class="bottom"><h5>Liên hệ</h5>';
			html += '<p>Địa chỉ: <span >Thôn Vĩnh Thượng</span></p><p>SĐT: <span>0123456789</span></p>';
			html += '<p>Email: <span>khoadamtam@gmail.com</span></p></div></div>' ;
			html += '<div class="right"><h4>Thông tin</h4>'
			html += '<div><label>Họ tên: </label> <input type="text" value="Đàm Tam Khoa"></div>';
			html += '<div><label for="">Ngày sinh </label><input type="date" value="2001-11-11"></div>';
			html += '<div><label>Giới tính: </label> <input type="text" value="Nam"></div>';
			html += '<div><label>Số CCCD: </label> <input type="text" value="001202442284"></div>';
			html += '<div><label>Tôn giáo: </label> <input type="text" value="Không"></div>';
			html += '<div class="address poo"><label>Quê quán: </label>';
			html += '<input type="text" value=""></div>';
			html += '<div class="address permanent"><label>Địa chỉ thường trú: </label>';
			html +=  '<select name="" id=""><option value="">Hà Nội</option></select>';
			html += '<select name="" id=""><option value="">Phú Xuyên</option></select>';
			html += '<select name="" id=""><option value="">Khai Thái</option></select>';
			html += '<select name="" id=""><option value="">Vĩnh Thượng</option></select></div>';
			html += '<div class="address temporary"><label>Địa chỉ tạm trú: </label>';
			html +=  '<select name="" id=""><option value="">Hà Nội</option></select>';
			html += '<select name="" id=""><option value="">Phú Xuyên</option></select>';
			html += '<select name="" id=""><option value="">Khai Thái</option></select>';
			html += '<select name="" id=""><option value="">Vĩnh Thượng</option></select></div>';
			html += '<div><label>Học vấn: </label> <input type="text" value="12/12"></div>';
			html += '<div><label>Nghề nghiệp: </label> <input type="text" value="Sinh viên"></div>';
			html += '<div class="submit_edit"><label for=""><input type="button" value="Đồng ý"></label></div>';
			html += '</div></div><label class="exit"><i class="fas fa-times"></i></label></td></tr>';

		$(this).parent().parent().parent().parent().after(html);
	}
})

//Xem thông tin chi tiết người dân
$(".info_list .detail_person").click(function () {
	/**
	 * Fetch lấy thông tin xong đổ vào mã bên dưới
	 */
	if ($(this).parent().parent().parent().parent().next().prop("class") == "detail") {
		$(".detail").remove();
	} else {
		$(".edit").remove();
		$(".detail").remove();
		let html = '<tr class="detail"><td colspan="7"><h3>Thông tin chi tiết</h3>';
			html += '<div class="detail_info"><div class="left">';
			html += '<p>Mã đơn vị quản lý: <span class="code">0101</span></p>';
			html += '<p>Đơn vị quản lý: <span class="static">Xã Khai Thái</span></p>';
			html += '<div class="bottom"><h5>Liên hệ</h5>';
			html += '<p>Địa chỉ: <span >Thôn Vĩnh Thượng</span></p><p>SĐT: <span>0123456789</span></p>';
			html += '<p>Email: <span>khoadamtam@gmail.com</span></p></div></div>';
			html += '<div class="right"><h4>Thông tin</h4>'
			html += '<div><label>Họ tên: </label> <input type="text" value="Đàm Tam Khoa"></div>';
			html += '<div><label for="">Ngày sinh </label><input type="date" value="2001-11-11"></div>';
			html += '<div><label>Giới tính: </label> <input type="text" value="Nam"></div>';
			html += '<div><label>Số CCCD: </label> <input type="text" value="001202442284"></div>';
			html += '<div><label>Tôn giáo: </label> <input type="text" value="Không"></div>';
			html += '<div><label>Quê quán: </label> <input type="text" value="Khai Thái - Phú Xuyên - Hà Nội"></div>';
			html += '<div><label>Địa chỉ thường trú: </label> <input type="text" value="Vĩnh Thượng - Khai Thái - Phú Xuyên - Hà Nội"></div>';
			html += '<div><label>Địa chỉ tạm trú: </label> <input type="text" value="Vĩnh Thượng - Khai Thái - Phú Xuyên - Hà Nội"></div>';
			html += '<div><label>Học vấn: </label> <input type="text" value="12/12"></div>';
			html += '<div><label>Nghề nghiệp: </label> <input type="text" value="Sinh viên"></div>';
			html += '</div></div><label class="exit"><i class="fas fa-times"></i></label></td></tr>';

		$(this).parent().parent().parent().parent().after(html);
	}
})

/*========================================================================*/
/*========================================================================*/
/*========================================================================*/
/*========================================================================*/

//fetch
const selectSearchCity = document.querySelector(".person_info .search_city");
const selectSearchDistrict = document.querySelector(".person_info .search_district");
const selectSearchCommune = document.querySelector(".person_info .search_commune");
const selectSearchVillage = document.querySelector(".person_info .search_village");
console.log(selectSearchCommune);

//admin rank = A1
if(selectSearchCity != null) {
	selectSearchCity.onchange = function() {
		// xử lí chọn thành phố và fetch nhận các huyện trong thành phố
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
		fetch("/citizen_war_exploded/home/APIcity", {
	        method: 'POST',
	        headers: {
	            "Content-type": "application/json",
	        },
	        body: "{\n\t\"cityID\": \"" + selectSearchCity.options[selectSearchCity.selectedIndex].value + "\"\n}",
		    }).then(resp => {
		        if(resp.status === 200) {
		            return resp.json();
		        }
		    }).then(data => {
				for(let d of data) {
		            addElementSelect(selectSearchDistrict, d.districtID, d.nameDistrict);
		    }
	    });

		//xử lí fetch để nhận dân cư trong thành phố
		let dataBody = getDataCitizen(rank);
		fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBody, true);
	}
}

//city rank = A2
if(selectSearchDistrict != null) {
	selectSearchDistrict.onchange = function() {
		while(selectSearchCommune.hasChildNodes()) {
			selectSearchCommune.removeChild(selectSearchCommune.firstChild);
		}
		while(selectSearchVillage.hasChildNodes()) {
			selectSearchVillage.removeChild(selectSearchVillage.firstChild);
		}
		addElementSelect(selectSearchCommune, 0, "Tất cả");
		addElementSelect(selectSearchVillage, 0, "Tất cả");
		fetch("/citizen_war_exploded/home/APIdistrict", {
	    method: 'POST',
	        headers: {
	            "Content-type": "application/json",
	        },
	        body: "{\n\t\"districtID\": \"" + selectSearchDistrict.options[selectSearchDistrict.selectedIndex].value + "\"\n}",
	    }).then(resp => {
	        if(resp.status === 200) {
	            return resp.json();
	        }
	    }).then(data => {
			for(let d of data) {
	            addElementSelect(selectSearchCommune, d.communeID, d.nameCommune);
			}
	 	});
		let dataBody = getDataCitizen(rank);
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBody, true);
				break;
			case 'A2':
				delete dataBody.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBody, true);
				break;
		}
	}
}

//rank = A3
if(selectSearchCommune != null) {
	selectSearchCommune.onchange = function() {
		while(selectSearchVillage.hasChildNodes()) {
			selectSearchVillage.removeChild(selectSearchVillage.firstChild);
		}
		addElementSelect(selectSearchVillage, 0, "Tất cả");
		fetch("/citizen_war_exploded/home/APIcommune", {
			method: 'POST',
				headers: {
					"Content-type": "application/json",
				},
				body: "{\n\t\"communeID\": \"" + selectSearchCommune.options[selectSearchCommune.selectedIndex].value + "\"\n}",
			}).then(resp => {
				if(resp.status === 200) {
					return resp.json();
				}
			}).then(data => {
				for(let d of data) {
					addElementSelect(selectSearchVillage, d.villageID, d.nameVillage);
				}
	 	});
		let dataBody = getDataCitizen(rank);
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBody, true);
				break;
			case 'A2':
				delete dataBody.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBody, true);
				break;
			case 'A3':
				delete dataBody.cityID;
				delete dataBody.districtID;
				fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBody, true);
				break;
		}
	}
}

if(selectSearchVillage != null) {
	selectSearchVillage.onchange = function() {
		let dataBody = getDataCitizen(rank);
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBody, true);
				break;
			case 'A2':
				delete dataBody.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBody, true);
				break;
			case 'A3':
				delete dataBody.cityID;
				delete dataBody.districtID;
				fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBody, true);
				break;
			case 'B1':
				delete dataBody.cityID;
				delete dataBody.districtID;
				delete dataBody.communeID;
				fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBody, true);
				break;
		}
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
	let linkAPI = "/citizen_war_exploded/home/APIcadres";
	let dataBody;
	const page = document.querySelector(".content_bot .btn_page.active");
	const search = document.querySelector(".view .search input");
	dataBody = new InfoCadres(selectCountCadres.options[selectCountCadres.selectedIndex].value, 
									"0", "0", "0", "0",
									"1", search.value);
	fetchCadres(linkAPI, dataBody, true);
}
//thực hiện việc đổi số lượng hiển thị trên bảng dân số
const selectCountCitizen = document.querySelector(".person_info .content_top_count");
selectCountCitizen.onchange = function() {
	let dataBody = getDataCitizen(rank);
	dataBody.count = this.options[this.selectedIndex].value;
	dataBody.type = typeSortCitizen;
	dataBody.value = valueSortCitizen;
	switch (rank) {
		case 'A1':
			fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBody, true);
			break;
		case 'A2':
			delete dataBody.cityID;
			fetchCitizen("/citizen_war_exploded/home/citizencity", dataBody, true);
			break;
		case 'A3':
			delete dataBody.cityID;
			delete dataBody.districtID;
			fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBody, true);
			break;
		case 'B1':
			delete dataBody.cityID;
			delete dataBody.districtID;
			delete dataBody.communeID;
			fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBody, true);
			break;
		case 'B2':
			delete dataBody.cityID;
			delete dataBody.districtID;
			delete dataBody.communeID;
			delete dataBody.villageID;
			fetchCitizen("/citizen_war_exploded/home/citizenvillage", dataBody, true);
			break;
	}
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
        if(resp.status === 200) {
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
function convertObjToQueryString(obj) {
	var str = [];
	for (var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
}
function fetchCitizen(linkAPI, dataBody, isno) {
	linkAPI += '?' + convertObjToQueryString(dataBody);
	fetch(linkAPI, {
		method: 'GET',
    }).then(resp => {
        if(resp.status === 200) {
            return resp.json();
        }
    }).then(data => {
    	console.log(data);
		// cap nhat trang
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

//cập nhật lại bảng dân số
function updateTableView(data, countleft, countright, type) {
	if(type === 'cadres') {
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

// tạo đối tượng dữ liệu citizen
function getDataCitizen(rank) {
	const selectSearchCity = document.querySelector(".person_info .search_city");
	const selectSearchDistrict = document.querySelector(".person_info .search_district");
	const selectSearchCommune = document.querySelector(".person_info .search_commune");
	const selectSearchVillage = document.querySelector(".person_info .search_village");
	const selectCountCitizen = document.querySelector(".person_info .content_top_count");
	const elementInputSearchCitizen = document.querySelector(".person_info .search input");
	
	let data = {
		cityID: (selectSearchCity != null) ? selectSearchCity.value : "0",
		districtID: (selectSearchDistrict != null) ? selectSearchDistrict.value : "0",
		communeID: (selectSearchCommune != null) ? selectSearchCommune.value : "0",
		villageID: (selectSearchVillage != null) ? selectSearchVillage.value : "0",
		page: 1, 
		count: (selectCountCitizen != null) ? selectCountCitizen.value : "25",
		search: elementInputSearchCitizen.value,
		type: 'default',
		value: 'default'
	}
	return data;
}

//thực hiện việc phân trang
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
								
		fetchCadres("/citizen_war_exploded/home/APIcadres", dataBodyCadres, false);
	} else {
		let dataBodyCitizen = getDataCitizen(rank);
		dataBodyCitizen.page = value;
		dataBodyCitizen.type = typeSortCitizen;
		dataBodyCitizen.value = valueSortCitizen;
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBodyCitizen, false);
				break;
			case 'A2':
				delete dataBodyCitizen.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBodyCitizen, false);
				break;
			case 'A3':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBodyCitizen, false);
				break;
			case 'B1':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBodyCitizen, false);
				break;
			case 'B2':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				delete dataBodyCitizen.villageID;
				fetchCitizen("/citizen_war_exploded/home/citizenvillage", dataBodyCitizen, false);
				break;
		}
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
	            if(totalPage + i - countPageAppear === value) {
	                createBtnPage(elementPaging, value, "btn_page active", btnPaging[count]);
	            } else {
	                createBtnPage(elementPaging, totalPage + i - countPageAppear, "btn_page", btnPaging[count]);
	            }
	        }
	    } else {
	        if(!isBefore && value === 1){
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
	        if(result === 3 && !isBefore) {
	            isBefore = true;
	            for(i=2; i<6; i++) {
	                elementPaging.removeChild(btnPaging[i]);
	            }
	            for(i=2; i<=countPageAppear; i++) {
	                if(value === i) {
	                    createBtnPage(elementPaging, value, "btn_page active", btnPagingMiddle);
	                } else {
	                    createBtnPage(elementPaging, i, "btn_page", btnPagingMiddle);
	                }
	            }
	        } else if(result === 3 && isBefore) {
	            createBtnPage(elementPaging, value + result - 1, "btn_page", btnPagingMiddle);
	            elementPaging.removeChild(btnPagingFirst);
	        } else if(result === 4 && isBefore) {
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
	let val = (arrow === 'left') ? btnPaging[1].firstChild.innerHTML : btnPaging[index].firstChild.innerHTML;
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
		dataBodyCitizen.type = typeSortCitizen;
		dataBodyCitizen.value = valueSortCitizen;
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBodyCitizen, false);
				break;
			case 'A2':
				delete dataBodyCitizen.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBodyCitizen, false);
				break;
			case 'A3':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBodyCitizen, false);
				break;
			case 'B1':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBodyCitizen, false);
				break;
			case 'B2':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				delete dataBodyCitizen.villageID;
				fetchCitizen("/citizen_war_exploded/home/citizenvillage", dataBodyCitizen, false);
				break;
		}
	}
	if(totalPage > countPageAppear) {
		for(i=0; i<document.querySelectorAll(".content_bot .paging li").length; i++) {
	        if(document.querySelectorAll(".content_bot .paging li")[i] === btnPagingMiddle) {
	            count = i;
	        }
	    }
	    if(arrow === 'left') {
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
		if(arrow === 'left') {
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
		    if(resp.status === 200) {
		        return resp.json();
		    }
		}).then(data => {
			console.log(data.result);
	});
}


//thực hiện việc tìm người dân
const elementInputSearchCitizen = document.querySelector(".person_info .search input");
elementInputSearchCitizen.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
		let dataBodyCitizen = getDataCitizen(rank);
		dataBodyCitizen.search = elementInputSearchCitizen.value;
		switch (rank) {
			case 'A1':
				fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBodyCitizen, true);
				break;
			case 'A2':
				delete dataBodyCitizen.cityID;
				fetchCitizen("/citizen_war_exploded/home/citizencity", dataBodyCitizen, true);
				break;
			case 'A3':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBodyCitizen, true);
				break;
			case 'B1':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBodyCitizen, true);
				break;
			case 'B2':
				delete dataBodyCitizen.cityID;
				delete dataBodyCitizen.districtID;
				delete dataBodyCitizen.communeID;
				delete dataBodyCitizen.villageID;
				fetchCitizen("/citizen_war_exploded/home/citizenvillage", dataBodyCitizen, true);
				break;
		}
    }
});

//sự kiện sắp xếp người dân theo kiểu
function sortCitizen(element, type) {
    switch(type) {
        case 'name':
            typeSortCitizen = 'name';
            break;
		case 'dob':
            typeSortCitizen = 'dob';
            break;
    }
	if(valueSortCitizen === 'default' || valueSortCitizen === 'bot') {
		valueSortCitizen = 'top';
		element.childNodes[1].classList.add('open');
		element.childNodes[2].classList.remove('open');
	} else if(valueSortCitizen === 'top') {
		valueSortCitizen = 'bot';
		element.childNodes[1].classList.remove('open');
		element.childNodes[2].classList.add('open');
	}
	let dataBodyCitizen = getDataCitizen(rank);
	dataBodyCitizen.type = typeSortCitizen;
	dataBodyCitizen.value = valueSortCitizen;
	switch (rank) {
		case 'A1':
			fetchCitizen("/citizen_war_exploded/home/citizenadmin", dataBodyCitizen, true);
			break;
		case 'A2':
			delete dataBodyCitizen.cityID;
			fetchCitizen("/citizen_war_exploded/home/citizencity", dataBodyCitizen, true);
			break;
		case 'A3':
			delete dataBodyCitizen.cityID;
			delete dataBodyCitizen.districtID;
			fetchCitizen("/citizen_war_exploded/home/citizendistrict", dataBodyCitizen, true);
			break;
		case 'B1':
			delete dataBodyCitizen.cityID;
			delete dataBodyCitizen.districtID;
			delete dataBodyCitizen.communeID;
			fetchCitizen("/citizen_war_exploded/home/citizencommune", dataBodyCitizen, true);
			break;
		case 'B2':
			delete dataBodyCitizen.cityID;
			delete dataBodyCitizen.districtID;
			delete dataBodyCitizen.communeID;
			delete dataBodyCitizen.villageID;
			fetchCitizen("/citizen_war_exploded/home/citizenvillage", dataBodyCitizen, true);
			break;
	}
}



