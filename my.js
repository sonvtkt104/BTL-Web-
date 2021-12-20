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
            i = 3;
			break;
		case 'citizen':
            i = 4;
			break;
	}
	element.classList.add("open");
	elementContentOpen.classList.remove("open");
	elementContent[i].classList.add("open");
    document.querySelector("#menu").classList.toggle("toggle_menu"); // khi responsive: Ấn vào menu sẽ tự close
}

function expandInput() {
    if (btnExpandInput.className.indexOf("open") != -1) {
        btnExpandInput.classList.remove("open");
        elementExpand.classList.remove("rotate");
        document.querySelector("#menu .input > span").classList.remove("open");
    } else {
        btnExpandInput.classList.add("open");
        elementExpand.classList.add("rotate");
        document.querySelector("#menu .input > span").classList.add("open");
        for (i = 0; i < btnNavigations.length; i++) {
            if (i != 1 || i != 2) {
                btnNavigations[i].classList.remove("open");
            }
        }
    }
}

const btnOptionLists = document.querySelectorAll(".view_content .action > div");
const elementDropOptionLists = document.querySelectorAll(".view_content .action ul");

const actionInfoList = document.querySelectorAll(".info_list .action > div");
const elementDropActionInfoList = document.querySelectorAll(".info_list .action ul");

window.addEventListener('click', function (e) {
    for (i = 0; i < btnOptionLists.length; i++) {
        if (btnOptionLists[i].contains(e.target)) {
            if (elementDropOptionLists[i].className.indexOf("open") != -1) {
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

    if (btnDropAccount.contains(e.target)) {
        if (elementDropAccount.className.indexOf("open") != -1) {
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

// Responsive Menu
document.getElementById("menu_responsive").onclick = function () {
    if (document.getElementById("menu_responsive").checked === true) {
        document.getElementById("menu").classList.toggle("toggle_menu");
    }
    else {
        document.getElementById("menu").classList.toggle("toggle_menu");
    }
}

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
    if ($(this).parent().parent().parent().parent().next().prop("class") == "detail") {
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
        html += '<p>Mã vùng: <span class="code">01</span></p>'
        html += '<p>Trạng thái: <span class="static">Kich hoat</span></p>';
        html += '<p>Chức vụ: <span class="rank">A1</span></p>';
        html += '<p>Thời gian cấp quyền: <span class="accesstime">12/12/2021</span></p></div>';
        html += '<div class="right"><h4>Tài khoản</h4>';
        html += '<div><label for="">Tên tài khoản: </label> <input type="text" value="khoadamtam2001"></div>';
        html += '<div><label>Mật khẩu: </label> <input type="text" value="123456"></div>';
        html += '<div><label>Ngày khởi tạo: </label> <input type="date" value="2021-11-11"></div></div></div>';
        html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
        $(this).parent().parent().parent().parent().after(html);
    }
})

// Cấp quyền user
$(".view_content .grant_user").click(function () {
    /**
     * Fetch lấy thông tin xong đổ vào mã bên dưới
     */
    if ($(this).parent().parent().parent().parent().next().prop("class") == "grant") {
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
        html += '<p>Mã vùng: <span class="code">01</span></p>'
        html += '<p>Trạng thái: <span class="static">Kich hoat</span></p>';
        html += '<p>Chức vụ: <span class="rank">A1</span></p>';
        html += '<p>Thời gian cấp quyền: <span class="accesstime">12/12/2021</span></p></div>';
        html += '<div class="right">';
        html += '<div><label>Hạn cấp quyền: </label> <input type="datetime-local"></div>';
        html += '<div><label>Mật khẩu: </label> <input type="password"></div>';
        html += '<div class="submit_grant"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
        html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
        $(this).parent().parent().parent().parent().after(html);
    }
})

// Edit tài khoản
// $(".view_content .edit_user").click(function () {
//     /**
//      * Fetch lấy thông tin xong đổ vào mã bên dưới
//      */
//     console.log($(this).parent().parent().parent().parent().children(".view_username").html());
//     if ($(this).parent().parent().parent().parent().next().prop("class") == "edit") {
//         $(".edit").remove();
//     } else {
//         $(".edit").remove();
//         $(".grant").remove();
//         $(".detail").remove();
//         let html = '<tr class="edit">';
//         html += '<td colspan="8">';
//         html += '<h3>Sửa tài khoản</h3>';
//         html += '<div class="edit_info">';
//         html += '<div class="left">';
//         html += '<h4>Hà Nội</h4>';
//         html += '<p>Mã vùng: <span class="code">01</span></p>'
//         html += '<p>Trạng thái: <span class="static">Kich hoat</span></p>';
//         html += '<p>Chức vụ: <span class="rank">A1</span></p>';
//         html += '<p>Thời gian cấp quyền: <span class="accesstime">12/12/2021</span></p></div>';
//         html += '<div class="right"><h4>Tài khoản</h4>';
//         html += '<div><label>Mật khẩu cũ: </label> <input type="text" value=""></div>';
//         html += '<div><label>Mật khẩu mới: </label> <input type="text"></div>';
//         html += '<div><label>Nhập lại mật khẩu mới: </label> <input type="text"></div>';
//         html += '<div class="submit_edit"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
//         html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
//         $(this).parent().parent().parent().parent().after(html);
//     }
// })

//CountDown
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    endCountDown = "12/22/2021 12:00:00";
const countDown = new Date(endCountDown).getTime();
var start = setInterval(function () {
    const now = new Date().getTime(),
        distance = countDown - now;

    if (distance < 0) {
        document.getElementById("headline").innerHTML = "Hết thời gian điều tra";
        document.getElementById("countdown").style.display = 'none';
        clearInterval(start);
    } else {
        document.getElementById("days").innerHTML = Math.floor(distance / (day));
        document.getElementById("hours").innerHTML = Math.floor((distance % (day)) / (hour));
        document.getElementById("minutes").innerHTML = Math.floor((distance % (hour)) / (minute));
        document.getElementById("seconds").innerHTML = Math.floor((distance % (minute)) / second);
    }
}, 0);


// Cấp tài khoản user
document.querySelector(".add_user > button").onclick = function () {
    document.querySelector(".add_user_model").style.display = 'flex';
}
document.querySelector(".add_user_detail > button").onclick = function () {
    document.querySelector(".add_user_model").style.display = 'none';
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
        let html = '<tr class="edit"><td colspan="9"><h3>Sửa thông tin người dân</h3>';
            html += '<div class="edit_info"><div class="left"><img src="./img/anhthe.jpeg" alt="">';   
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
            html += '<div class="address"><label>Địa chỉ thường trú: </label>';      
            html +=  '<select name="" id=""><option value="">Hà Nội</option></select>';     
            html += '<select name="" id=""><option value="">Phú Xuyên</option></select>';       
            html += '<select name="" id=""><option value="">Khai Thái</option></select>';           
            html += '<select name="" id=""><option value="">Vĩnh Thượng</option></select></div>';            
            html += '<div><label for="">Ảnh: </label><input type="file"></div>';
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
        let html = '<tr class="detail"><td colspan="9"><h3>Thông tin chi tiết</h3>';
            html += '<div class="detail_info"><div class="left"><img src="./img/anhthe.jpeg" alt="">';   
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
            html += '<div class="address"><label>Địa chỉ thường trú: </label>';      
            html +=  '<select name="" id=""><option value="">Hà Nội</option></select>';     
            html += '<select name="" id=""><option value="">Phú Xuyên</option></select>';       
            html += '<select name="" id=""><option value="">Khai Thái</option></select>';           
            html += '<select name="" id=""><option value="">Vĩnh Thượng</option></select></div>';                       
            html += '</div></div><label class="exit"><i class="fas fa-times"></i></label></td></tr>';           
                               
        $(this).parent().parent().parent().parent().after(html);
    }
})
