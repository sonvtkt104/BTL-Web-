package Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Entity.CommuneB1;
import Model.DAO;
import Model.json.JSONObject;

@WebServlet(urlPatterns = {"/home/APIdistrict"})
public class homeDistrictController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
		HttpSession session = req.getSession();
		PrintWriter out = resp.getWriter();
		DAO dao = new DAO();
		
		if(session.getAttribute("account") != null) {
			BufferedReader br = req.getReader();
			String line;
			String data = "";
			while((line = br.readLine()) != null) {
				data += line;
			}
			JSONObject obj = new JSONObject(data);
			String districtID = obj.getString("districtID");
			int index = 0;
			List<CommuneB1> list = dao.getAllCommuneByType(districtID, "districtID");
			String[] dataJSON = new String[list.size()];
			for (CommuneB1 d : list) {
				dataJSON[index] = d.toJSON();
				index++;
			}
			
			out.print(Arrays.toString(dataJSON));
		} else {
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Bạn không có quyền truy cập');");
			out.println("location='/citizen';");
			out.println("</script>");
		}
	}

}
