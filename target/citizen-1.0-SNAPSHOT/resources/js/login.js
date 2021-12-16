function Submit() {
    let linkAPI = "/citizen_war_exploded/authorication";
    let obj = {
        username: document.getElementById("user").value,
        password: document.getElementById("pass").value
    }
    fetch(linkAPI, {
        method: 'POST',
        headers: {
        	"Content-type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(resp => {
        if(resp.status === 200) {
            return resp.text();
        }
    }).then(data => {
        console.log(data === 'true');
        if(data === 'true') {
        	window.location.replace("/citizen_war_exploded/home");
        } else if(data === 'false') {
        	alert("Bạn đã nhập sai mật khẩu");
        	location = '/citizen_war_exploded';
        } else {
            console.log("Lỗi dữ liệu đầu vào");
        }
    });
}