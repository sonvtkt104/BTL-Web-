<%@page import="Entity.Cadres"%>
<%@page import="Model.ModelCadres"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CitizenV</title>
    <link rel="stylesheet" href="resources/css/home.css">
    <link rel="stylesheet" href="resources/css/all.min.css">
</head>
<body>
    <div id = "menu">
        <div class = "logo">
            <a href="">citizenv</a>
        </div>
        <ul class = "navigation">
            <li class = "home">
                <span class = "btn_navi open"><i class="fas fa-home"></i>Trang chủ</span>
            <li class = "input">
                <span class = "btn_navi">
                    <i class="fas fa-edit"></i>Nhập liệu
                </span>
            </li>
            <li class = "view">
                <span class = "btn_navi">
                    <i class="fas fa-street-view"></i>Cấp quyền truy cập
                </span>
            </li>
            <li class="info_user">
                <span class = "btn_navi">
                    <i class="fas fa-users"></i>Thông tin người dân
                </span>
            </li>
        </ul>
    </div>
    <div id = "container">
        <div class="header">
            <span class = "notification">
                <i class="far fa-bell"></i>
                <span class = "count">1</span>
            </span>
            <span class = "account">
                <img src="resources/img/avatar.jpg" alt="_self">
                <p>${sessionScope.account.name }<i class="fas fa-chevron-down"></i></p>
            </span>
            <div class = "drop_account">
                <p>Welcome!</p>
                <a href="#" class = "hover"><i class="far fa-user"></i>Tài khoản của tôi</a>
                <a href="#" class = "hover"><i class="far fa-life-ring"></i>Trợ giúp</a>
                <a href="/citizen/logout" class = "hover"><i class="fas fa-power-off"></i>Đăng xuất</a>
            </div>
        </div>
        <div class = "home open">
            <div class = "home_header">
                <p>Trang chủ</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Trang chủ</span>
            </div>
            <!-- phần canvas vẽ biểu đồ -->
            <div class = "home_statistical">
            
            </div>
            <div class = "home_recent">
                <p>Số liệu nhập gần đây</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thông tin</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian nhập</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1</td>
                            <td class = "info">
                                <img src="resources/img/avatar.jpg" alt="">
                                <span>
                                    <p>Mark Zugkerburg</p>
                                    <p>markzugkerburg@gmail.com</p>
                                </span>
                            </td>
                            <td>0123456789</td>
                            <td>Hà Nội</td>
                            <td>20/11/2021 10:09:00</td>
                            <td>---</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="home_footer">
                <p>Created by <a href="">name@gmail.com</a></p>
                <ul>
                    <li><a href="#">Thông tin về chúng tôi</a></li>
                    <li><a href="#">Trợ giúp</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>

        <div class="input_general">
            <div class = "input_header">
                <p>Nhập thông tin</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Nhập liệu<i class="fas fa-chevron-right"></i>Nhập thông tin</span>
            </div>
            <div class="input_content">
                <div class = "input_content_grid">
                    <h1>Phiếu khai báo thông tin cá nhân</h1>
                    <form action="#">
                        <div class = "name">
                            <label for="@">Tên </label>
                            <input type="text" name = "name" id = "name">
                        </div>
                        <div class = "surname">
                            <label for="@">Họ </label>
                            <input type="text" name = "surname" id = "surname">
                        </div>
                        <div class = "date">
                            <label for="@">Ngày sinh </label>
                            <input type="date" name="date" id="date">
                        </div>
                        <div class = "sex">
                            <label for="sex">Giới tính</label>
                            <div>
                                <input type="radio" name="sex" id="female">
                                <label for="female">Nữ</label>
                                <input type="radio" name="sex" id="male">
                                <label for="male">Nam</label>
                            </div>
                        </div>
                        <div class = "phone">
                            <label for="@">Số điện thoại</label>
                            <input type="text" name = "phone" id = "phone">
                        </div>
                        <div class = "cmt">
                            <label for="@">Số CMND</label>
                            <input type="text" name = "cmt" id = "cmt">
                        </div>
                        <div class = "my_img">
                            <label for="@">Ảnh thẻ</label>
                            <input type="file" name = "my_img" id = "my_img" aria-label="File browser example">
                        </div>
                        <div class="address">
                            <label for="@">Địa chỉ thường trú</label>
                            <input type="text" name="address" id="address">
                        </div>
                        <div class="address_live">
                            <label for="@">Địa chỉ hiện nay</label>
                            <input type="text" name="address_live" id="address_live">
                        </div>
                        <div class = "more">
                            <label for="@">Mô tả bản thân</label>
                            <textarea name="more" id="more"></textarea>
                        </div>
                        <div class = "submit">
                            <button type="submit">Nhập</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="input_footer">
                <p>Created by <a href="">name@gmail.com</a></p>
                <ul>
                    <li><a href="#">Thông tin về chúng tôi</a></li>
                    <li><a href="#">Trợ giúp</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>

        <div class="view">
            <div class = "view_header">
	            <%
	            	Cadres cadres = (Cadres) session.getAttribute("account");
	            	String address = ModelCadres.convertRankToAddress(cadres.getUsername());
	            %>
                <p>Danh sách cán bộ trong <%=address %></p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Cấp quyền truy cập</span>
            </div>
            <div class="view_content">
                <div class = "content_top">
                    <div class = "count">
                        <label>Giới hạn số lượng bảng</label>
                        <select class="content_top_count" id="content_top_count">
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                    <div class="search">
                        <label for="">Tỉnh/Thành phố</label>
                        <select class="search_city" onchange="selectSearchCity(this)">
                        	<option value="0">Tất cả</option>
	                        <c:forEach items = "${listcity }" var = "o">
	                        	<option value="${o.cityID }">${o.nameCity }</option>
	                        </c:forEach>
                        </select>
                        <label for="">Quận/Huyện</label>
                        <select class="search_district">
                            <option value="10">Tất cả</option>
                        </select>
                        <label for="">Xã/Phường</label>
                        <select class="search_commune">
                            <option value="10">Tất cả</option>
                        </select>
                        <label for="@">Tìm kiếm</label>
                        <input type="text" name="view_search" id="view_search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Tên cán bộ
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Điện thoại
                            </th>
                            <th>Tài khoản
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Mật khẩu</th>
                            <th>Thời gian nhập
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<c:forEach items = "${listcadres }" var = "o" begin = "0" end = "24">
                    		<tr>
	                            <td>${o.ordinal }</td>
	                            <td>
	                                <span>
	                                    <p>${o.name }</p>
	                                    <p>${o.email }</p>
	                                </span>
	                            </td>
	                            <td>${o.numberPhone }</td>
	                            <td>${o.username }</td>
	                            <td>${o.password }</td>
	                            <td>${o.time }</td>
	                            <td class = "action">
	                                <div>
	                                    <i class="fas fa-ellipsis-h"></i>
	                                    <ul class = "">
	                                        <li><a href="#"><i class="fas fa-street-view"></i>Cấp quyền</a></li>
	                                        <li><a href="#"><i class="far fa-edit"></i>Sửa đổi</a></li>
	                                        <li><a href="#"><i class="far fa-trash-alt"></i>Xóa</a></li>
	                                        <li><a href="#"><i class="fas fa-user-tag"></i>Thông tin</a></li>
	                                    </ul>
	                                </div>
	                            </td>
	                        </tr>
                    	</c:forEach>
                    </tbody>
                </table>
                <div class="content_bot">
               		<%
                       	int size = (int) request.getAttribute("sizecadres");
                       	size = size/25;
                    %>
                    <p>Biểu diễn 1 đến 25 của ${sizecadres } cán bộ</p>
                    <div>
                    </div>
                </div>
            </div>
            <div class="view_footer">
                <p>Created by <a href="">name@gmail.com</a></p>
                <ul>
                    <li><a href="#">Thông tin về chúng tôi</a></li>
                    <li><a href="#">Trợ giúp</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>

        <div class = "person_info">
            <div class = "info_header">
                <p>Danh sách người dân</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Thông tin người dân</span>
            </div>
            <div class="info_list">
                <div class = "content_top">
                    <div class = "count">
                        <label>Giới hạn số lượng bảng</label>
                        <select name="content_top_count" id="content_top_count" onblur='this.size=0;' onchange='this.size=1;'>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="search">
                        <label for="@">Tìm kiếm</label>
                        <input type="text" name="view_search" id="view_search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Thông tin
                                <span>
                                    <i class="fas fa-long-arrow-alt-up open"></i><i class="fas fa-long-arrow-alt-down open"></i>
                                </span>
                            </th>
                            <th>Điện thoại</th>
                            <th>CMND</th>
                            <th>Địa chỉ</th>
                            <th>Thời gian nhập
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1</td>
                            <td class = "info">
                                <img src="resources/img/avatar.jpg" alt="">
                                <span>
                                    <p>Mark Zugkerburg</p>
                                    <p>markzugkerburg@gmail.com</p>
                                </span>
                            </td>
                            <td>0123456789</td>
                            <td>01234567891011</td>
                            <td class = "info_list_address">
                                <p>Vĩnh Thượng, Khai Thái, Phú Xuyên, Hà Nội</p>
                            </td>
                            <td>22/11/2021 05:35:00</td>
                            <td><i class="fas fa-ellipsis-h"></i></td>
                        </tr>
                    </tbody>
                </table>
                <div class="content_bot">
                    <p>Biểu diễn 1 đến 10 của n người dân</p>
                    <div>
                    </div>
                </div>
            </div>
            <div class="info_footer">
                <p>Created by <a href="">name@gmail.com</a></p>
                <ul>
                    <li><a href="#">Thông tin về chúng tôi</a></li>
                    <li><a href="#">Trợ giúp</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>
		<!-- 
        <div class = "info_model">
            <div class = "model_header">
                <p>Danh sách người dân</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Thông tin cá nhân<i class="fas fa-chevron-right"></i>Nguyễn Văn A</span>
            </div>
            <div class="model_content">
                <img src="resources/img/anhthe.jpeg" alt="">
                <p class="title">Phiếu điều tra dân số ban hành kèm theo quyết định của cơ quan điều tra dân số CitizenV</p>
                <p>Cơ quan đơn vị điều tra dân số CitizenV</p>
                <p>Mã đơn vị quản lí cá nhân: <strong>ABC001</strong></p>
                <p>Đơn vị quản lí cá nhân: <strong>Xã Khai Thái</strong></p>
                <h1>Thông tin của Nguyễn Văn A</h1>
                <div>
                    <label for="@">Họ tên: </label>
                    <input type="text" name="info_name" id="info_name" value="Nguyễn Văn A">
                </div>
                <div>
                    <label for="@">Ngày sinh: </label>
                    <input type="date" name="info_date" id="info_date" value="2001-11-11">
                </div>
                <div>
                    <label for="@">Giới tính: </label>
                    <input type="text" name="info_sex" id="info_sex" value="Nam">
                </div>
                <div>
                    <label for="@">Số điện thoại: </label>
                    <input type="text" name="info_phone" id="info_phone" value="012345678">
                </div>
                <div>
                    <label for="@">Số CMND: </label>
                    <input type="text" name="info_cmt" id="info_cmt" value="012345678910">
                </div>
                <div>
                    <label for="@">Địa chỉ thường chú: </label>
                    <input type="text" name="info_address" id="info_address" value="Vĩnh Thượng, Khai Thái, Phú Xuyên, Hà Nội">
                </div>
                <div>
                    <label for="@">Địa chỉ hiện nay: </label>
                    <input type="text" name="info_address_live" id="info_address_live" value="Vĩnh Thượng, Khai Thái, Phú Xuyên, Hà Nội">
                </div>
                <div>
                    <label for="@">Họ tên: </label>
                    <input type="text" name="info_name" id="info_name" value="Nguyễn Văn A">
                </div>
                <div>
                    <label for="@">Ngày sinh: </label>
                    <input type="date" name="info_date" id="info_date" value="2001-11-11">
                </div>
                <div>
                    <label for="@">Giới tính: </label>
                    <input type="text" name="info_sex" id="info_sex" value="Nam">
                </div>
                <div>
                    <label for="@">Số điện thoại: </label>
                    <input type="text" name="info_phone" id="info_phone" value="012345678">
                </div>
                <div>
                    <label for="@">Số CMND: </label>
                    <input type="text" name="info_cmt" id="info_cmt" value="012345678910">
                </div>
                <div class = "attribute">
                    <button>Tải về<i class="fas fa-cloud-download-alt"></i></button>
                    <button>In<i class="fas fa-print"></i></button>
                </div>
            </div>
            <div class="model_footer">
                <p>Created by <a href="">name@gmail.com</a></p>
                <ul>
                    <li><a href="#">Thông tin về chúng tôi</a></li>
                    <li><a href="#">Trợ giúp</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>-->
    </div>
    <script>
		let totalPage = parseInt("<%=size %>");
	</script>
	<script src="resources/js/my.js"></script>
</body>
</html>