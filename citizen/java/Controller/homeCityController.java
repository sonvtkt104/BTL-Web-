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

import Entity.DistrictA3;
import Entity.VillageB2;
import Json.JSONObject;
import Model.DAO;

@WebServlet(urlPatterns = {"/home/APIcity"})
public class homeCityController extends HttpServlet {
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
			String cityID = obj.getString("cityID");
			System.out.println(cityID);
			int index = 0;
			List<DistrictA3> list = dao.getAllDistrictByType(cityID, "cityID");
			String[] dataJSON = new String[list.size()];
			for (DistrictA3 d : list) {
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
