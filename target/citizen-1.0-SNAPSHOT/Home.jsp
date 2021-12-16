<%@page import="Entity.Citizen"%>
<%@page import="java.util.List"%>
<%@page import="Entity.Cadres"%>
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
            <li class = "home" onclick="clickTest()">
                <span class = "btn_navi open" onclick = "clickTabMenu(this, 'home')"><i class="fas fa-home"></i>Trang chủ</span>
            <li class = "input">
                <span class = "btn_navi" onclick = "clickTabMenu(this, 'input')">
                    <i class="fas fa-edit"></i>Nhập liệu
                </span>
            </li>
            <li class = "view">
                <span class = "btn_navi" onclick = "clickTabMenu(this, 'cadres')">
                    <i class="fas fa-street-view"></i>Cấp quyền truy cập
                </span>
            </li>
            <li class="info_user">
                <span class = "btn_navi" onclick = "clickTabMenu(this, 'citizen')">
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
                <p>${sessionScope.account.username }<i class="fas fa-chevron-down"></i></p>
            </span>
            <div class = "drop_account">
                <p>Welcome!</p>
                <a href="#" class = "hover"><i class="far fa-user"></i>Tài khoản của tôi</a>
                <a href="#" class = "hover"><i class="far fa-life-ring"></i>Trợ giúp</a>
                <a href="/citizen_war_exploded/logout" class = "hover"><i class="fas fa-power-off"></i>Đăng xuất</a>
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
                    <div class = "name">
                        <label for="name">Họ và tên </label>
                        <input type="text" name = "name" id = "name">
                    </div>
                    <div class = "dob">
                        <label for="dob">Ngày sinh </label>
                        <input type="date" name="dob" id="dob">
                    </div>
                    <div class = "numberID">
                        <label for="numberID">Số CMND</label>
                        <input type="text" name = "numberID" id = "numberID">
                    </div>
                    <div class = "gender">
                        <label for="female">Giới tính</label>
                        <div>
                            <input type="radio" name="female" id="female">
                            <label for="female">Nữ</label>
                            <input type="radio" name="female" id="male">
                            <label for="male">Nam</label>
                        </div>
                    </div>
                    <div class = "poo">
                        <label for="poo">Quê quán</label>
                        <input type="text" name = "poo" id = "poo">
                    </div>
                    <div class = "permanent">
                        <label for="permanent">Địa chỉ thường trú</label>
                        <input type="text" name = "permanent" id = "permanent">
                    </div>
                    <div class="temporary">
                        <label for="temporary">Địa chỉ tạm trú</label>
                        <input type="text" name="temporary" id="temporary">
                    </div>
                    <div class="ethnicGroup">
                        <label for="ethnicGroup">Tôn giáo</label>
                        <input type="text" name="ethnicGroup" id="ethnicGroup">
                    </div>
                    <div class="eduLevel">
                        <label for="eduLevel">Trình độ văn hóa</label>
                        <input type="text" name="eduLevel" id="eduLevel">
                    </div>
                    <div class="job">
                        <label for="job">Nghề nghiệp</label>
                        <input type="text" name="job" id="job">
                    </div>
                    <div class = "submit" onclick = "submitFromPutCitizen()">
                        <button type="submit">Nhập</button>
                    </div>
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
                <p>Danh sách cán bộ ${managecadres }</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Cấp quyền truy cập</span>
            </div>
            <div class="view_content">
                <div class="grant_time">
                    <div class="left">
                        <div><h3>Thời gian điều tra</h3></div>
                        <div>
                            <p>START: <span>01/11/2021 12:00:00</span></p>
                            <p>END: <span>01/06/2021 12:00:00</span></p>
                        </div>
                    </div>
                    <div id="countdown">
                        <ul>
                            <li><span id="days"></span>days</li>
                            <li><span id="hours"></span>Hours</li>
                            <li><span id="minutes"></span>Minutes</li>
                            <li><span id="seconds"></span>Seconds</li>
                        </ul>
                    </div>
                </div>
            	<div class = "content_top">
            		<%
            			String rank = "${sessionScope.account.rank }";
            		%>
                    <div class = "content_select" ${sessionScope.account.rank == 'A0' ? 'style=\"flex-basis: 100%;\"' : 'style="flex-basis: 75%;"' }>
                        <div class = "count">
                            <label>Số lượng</label>
                            <select class="content_top_count">
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>
                        </div>
                        <div class="search_select">
                        </div>
                    </div>
                    <div class="add_user">
                        <button><i class="fas fa-plus"></i>Thêm người dùng</button>
                        <div class="add_user_detail">
                            <h2>Thêm tài khoản</h2>
                            <div>
                                <label for="">Địa phận:</label>
                                <input type="text" name="" id="">
                            </div>
                            <div>
                                <label for="">Mã vùng: </label>
                                <input type="text">
                            </div>
                            <p>Thông tin cá nhân</p>
                            <div>
                                <label for="">Tên cán bộ: </label>
                                <input type="text">
                            </div>
                            <div><label for="">Email:</label><input type="text"></div>
                            <div><label for="">SĐT: </label><input type="text"></div>
                            <input type="button" value="Thêm">
                            <button><i class="fas fa-times"></i></button>
                        </div>
                    </div>
                    <div class="search" ${sessionScope.account.rank == 'A0' ? 'style=\"flex-basis: 100%; margin-top: 20px;\"' : 'style="flex-basis: 25%;"' }>
                        <label for="view_search">Tìm kiếm</label>
                        <input type="text" name="view_search" id="view_search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>STT
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Tài khoản
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Mật khẩu</th>
                            <th>Cấp bậc
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Khu vực quản lí</th>
                            <th>Trạng thái</th>
                            <th>Thời gian cấp quyền
                                <span>
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<% 
                    		List<Cadres> listCadres = (List<Cadres>) request.getAttribute("listcadres");
                        	int sizecadres = listCadres.size() >= 25 ? 25 : listCadres.size();
                        	for(int i=0; i<sizecadres; i++) {
                        		String status = (listCadres.get(i).isStatus()) ? "Tự do" : "Khóa";
                        	
                    	%>
                   		<tr>
                            <td><%=(i+1) %></td>
                            <td class = "view_username"><%=listCadres.get(i).getUsername() %></td>
                            <td class = "view_password">
                                <p><%=listCadres.get(i).getPassword() %></p>
                            </td>
                            <td><%=listCadres.get(i).getRank() %></td>
                            <td><%=listCadres.get(i).getManageArea() %></td>
                            <td><%=status %></td>
                            <td><%=listCadres.get(i).getAccessTime() %></td>
                            <td class = "action">
                                <div>
                                    <i class="fas fa-ellipsis-h"></i>
                                    <ul class = "">
                                        <li class="grant_user"><i class="fas fa-street-view"></i>Cấp quyền</li>
                                        <li class="edit_user"><i class="far fa-edit"></i>Sửa đổi</li>
                                        <li class="delete_user"><i class="far fa-trash-alt"></i>Xóa</li>
                                        <li class="detail_user"><i class="fas fa-user-tag"></i>Thông tin</li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <%} %>
                    </tbody>
                </table>
                <div class="content_bot">
                    <p>Biểu diễn <span class = "count_left">1</span> đến <span class = "count_right"><%=sizecadres %></span> của <span class = "size">${sizecadres }</span> cán bộ</p>
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
                <p>Danh sách người dân ${managearea }</p>
                <span>CitizenV<i class="fas fa-chevron-right"></i>Thông tin người dân</span>
            </div>
            <div class="info_list">
                <div class = "content_top">
                    <div class = "content_select" ${sessionScope.account.rank == 'A1' ? 'style=\"flex-basis: 100%;\"' : 'style="flex-basis: 75%;"' }>
                        <div class = "count">
                            <label>Số lượng</label>
                            <select class="content_top_count">
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>
                        </div>
                        <div class="search_select">
                        	<c:if test = "${sessionScope.account.rank == 'A1' }">
		                    	<label>Tỉnh/Thành phố</label>
		                        <select class="search_city">
		                        	<option value="0">Tất cả</option>
			                        <c:forEach items = "${listcity }" var = "o">
			                        	<option value="${o.cityID }">${o.nameCity }</option>
			                        </c:forEach>
		                        </select>
		                    </c:if>
		                    <c:if test = "${sessionScope.account.rank == 'A2' || sessionScope.account.rank == 'A1' }">
		                    	<label>Quận/Huyện</label>
		                        <select class="search_district">
		                            <option value="0">Tất cả</option>
		                            <c:forEach items = "${listdistrict }" var = "o">
			                        	<option value="${o.districtID }">${o.nameDistrict }</option>
			                        </c:forEach>
		                        </select>
		                    </c:if>
		                    <c:if test = "${sessionScope.account.rank == 'A3' || sessionScope.account.rank == 'A2' || sessionScope.account.rank == 'A1' }">
		                    	<label>Xã/Phường</label>
		                        <select class="search_commune">
		                            <option value="0">Tất cả</option>
		                            <c:forEach items = "${listcommune }" var = "o">
			                        	<option value="${o.communeID }">${o.nameCommune }</option>
			                        </c:forEach>
		                        </select>
		                    </c:if>
		                    <c:if test = "${sessionScope.account.rank == 'B1' || sessionScope.account.rank == 'A3' || sessionScope.account.rank == 'A2' || sessionScope.account.rank == 'A1' }">
		                    	<label>Đường/Thôn</label>
		                    	<select class="search_village">
		                            <option value="0">Tất cả</option>
		                            <c:forEach items = "${listvillage }" var = "o">
			                        	<option value="${o.villageID }">${o.nameVillage }</option>
			                        </c:forEach>
		                        </select>
		                    </c:if>
                        </div>
                    </div>
                    <div class="search" ${sessionScope.account.rank == 'A1' ? 'style=\"flex-basis: 100%; margin-top: 20px;\"' : 'style="flex-basis: 25%;"' }>
                        <label>Tìm kiếm</label>
                        <input type="text" name="view_search" id="view_search">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và tên
                                <span class = "sort_name" onclick="sortCitizen(this, 'name')">
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Ngày sinh
                                <span class = "sort_dob" onclick="sortCitizen(this, 'dob')">
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>CMND
                                <span class = "sort_id" onclick="sortCitizen(this, 'id')">
                                    <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
                                </span>
                            </th>
                            <th>Địa chỉ thường trú</th>
                            <th>Tôn giáo</th>
                            <th>Trình độ văn hóa</th>
                            <th>Nghề nghiệp</th>
                            <th>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                    	<%
                    		List<Citizen> listCitizens = (List<Citizen>) request.getAttribute("listcitizen");
                        	for(int i=0; i<listCitizens.size(); i++) {
                    	%>
	                    	<tr>
	                            <td><%=i+1 %></td>
	                            <td class = "info"><%=listCitizens.get(i).getName() %></td>
	                            <td><%=listCitizens.get(i).getDob() %></td>
	                            <td><%=listCitizens.get(i).getNumberID() %></td>
	                            <td class = "info_list_address">
	                                <p><%=listCitizens.get(i).getPermanent() %></p>
	                            </td>
	                            <td><%=listCitizens.get(i).getEthnicGroup() %></td>
	                            <td><%=listCitizens.get(i).getEduLevel() %></td>
	                            <td><%=listCitizens.get(i).getJob() %></td>
                                <td class = "action">
                                    <div class="list_action">
                                        <i class="fas fa-ellipsis-h"></i>
                                        <ul class = "">
                                            <li class="edit_person"><i class="far fa-edit"></i>Sửa đổi</li>
                                            <li class="delete_person"><i class="far fa-trash-alt"></i>Xóa</li>
                                            <li class="detail_person"><i class="fas fa-user-tag"></i>Thông tin</li>
                                        </ul>
                                    </div>
                                </td>
	                        </tr>
                        <%} %>
                    </tbody>
                </table>
                <div class="content_bot">
                    <p>Biểu diễn <span class = "count_left">1</span> đến <span class = "count_right">${count }</span> của <span class = "size">${sizecitizen }</span> người dân</p>
                    
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
    </div>
    <%
    	int size = (int) request.getAttribute("sizecadres");
    	int sizecitizen = (int) request.getAttribute("sizecitizen");
    	int totalPage = size/25 + 1;
    	int totalPageCitizen = sizecitizen/25 + 1;
    %>
    <script>
		let totalPage = 0;
		let totalPageCitizen = parseInt("<%=totalPageCitizen %>");
		let totalPageCadres = parseInt("<%=totalPage %>");
		let rank = "${sessionScope.account.rank }";
		let varPromisePageCitizen = null;
		let varPromisePageCadres = null;
		let isCadresOrCitizen = true;
		let onclickCadres = 0;
		let onclickCitizen = 0;
        let accessDateTimeCadres = "${sessionScope.account.accessTime }";
		//true la cadres false la citizen
		
		let valueSortCitizen = 'default';
		let typeSortCitizen = 'default'; 
	</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="resources/js/my.js"></script>
</body>
</html>