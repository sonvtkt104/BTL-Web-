const btnExpandInput = document.querySelector("#menu .drop_input");
const btnDropAccount = document.querySelector("#container .account");
const elementExpand = document.querySelector("#menu i.expand");
const elementDropAccount = document.querySelector("#container .drop_account");

const btnNavigations = document.querySelectorAll("#menu .btn_navi");
const elementContent = document.querySelectorAll("#container > div");

for (const b of btnNavigations) {
    b.onclick = function () {
        for (i = 0; i < btnNavigations.length; i++) {
            if (b === btnNavigations[i]) {
                btnNavigations[i].classList.add("open");
                elementContent[i + 1].classList.add("open");
                document.getElementById("menu").classList.remove("toggle_menu"); //responsive menu
                if (i == 0 || i == 3 || i == 4) {
                    btnExpandInput.classList.remove("open");
                    elementExpand.classList.remove("rotate");
                    document.querySelector("#menu .input > span").classList.remove("open");
                }
            } else {
                btnNavigations[i].classList.remove("open");
                elementContent[i + 1].classList.remove("open");
            }
        }
    }
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
        html += '<div class="bottom">';
        html += '<h5>Người dùng</h5><p>Tên cán bộ: <span >Đàm Tam Khoa</span></p>';
        html += '<p>SDT: <span>0123456789</span></p><p>Email: <span>khoadamtam@gmail.com</span></p></div></div>';
        html += '<div class="right"><h4>Tài khoản</h4>';
        html += '<div><label for="">User: </label> <input type="text" value="khoadamtam2001"></div>';
        html += '<div><label>Password: </label> <input type="text" value="123456"></div>';
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
        html += '<div class="bottom">';
        html += '<h5>Người dùng</h5><p>Tên cán bộ: <span >Đàm Tam Khoa</span></p>';
        html += '<p>SDT: <span>0123456789</span></p><p>Email: <span>khoadamtam@gmail.com</span></p></div></div>';
        html += '<div class="right">';
        html += '<div><label>Ngày bắt đầu: </label> <input type="datetime-local"></div>';
        html += '<div><label for="">Đến</label></div>';
        html += '<div><label>Ngày kết thúc: </label> <input type="datetime-local"></div>';
        html += '<div class="submit_grant"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
        html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
        $(this).parent().parent().parent().parent().after(html);
    }
})

// Edit tài khoản
$(".view_content .edit_user").click(function () {
    /**
     * Fetch lấy thông tin xong đổ vào mã bên dưới
     */
    if ($(this).parent().parent().parent().parent().next().prop("class") == "edit") {
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
        html += '<p>Mã vùng: <span class="code">01</span></p>'
        html += '<p>Trạng thái: <span class="static">Kich hoat</span></p>';
        html += '<div class="bottom">';
        html += '<h5>Người dùng</h5><p>Tên cán bộ: <span >Đàm Tam Khoa</span></p>';
        html += '<p>SDT: <span>0123456789</span></p><p>Email: <span>khoadamtam@gmail.com</span></p></div></div>';
        html += '<div class="right"><h4>Tài khoản</h4>';
        html += '<div><label for="">User: </label> <input type="text" value="khoadamtam2001"></div>';
        html += '<div><label>Password: </label> <input type="text" value="123456"></div>';
        html += '<div class="submit_edit"><label for=""><input type="button" value="Đồng ý"></label></div></div></div>';
        html += '<label class="exit"><i class="fas fa-times"></i></label></td></tr>';
        $(this).parent().parent().parent().parent().after(html);
    }
})

//CountDown
const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    endCountDown = "06/01/2022 12:00:00";

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
        let html = '<tr class="detail"><td colspan="7"><h3>Thông tin chi tiết</h3>';
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