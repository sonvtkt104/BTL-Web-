function Submit() {
    let linkAPI = "/citizen/authorication";
    fetch(linkAPI, {
        method: 'POST',
        headers: {
        	"Content-type": "application/json",
        },
        body: "{\n\"username\": \"" + document.getElementById("user").value + 
                "\",\n\"password\": \"" + document.getElementById("pass").value + "\"\n}",
    }).then(resp => {
        if(resp.status == 200) {
            return resp.text();
        }
    }).then(data => {
        if(data == "true") {
        	window.location.replace("/citizen/home");
        } else {
        	alert("Sai mật khẩu");
        	location = '/citizen';
        }
    });
}