package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Entity.Cadres;
import Entity.Citizen;
import Json.JSONObject;
import Model.DAO;
import Model.ModelCadres;
import Model.ModelCitizen;

@WebServlet(urlPatterns = {"/home/APIcadres"})
public class homeCadresController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private int defaultCount = 25;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
		DAO dao = new DAO();
		HttpSession session = req.getSession();
		PrintWriter out = resp.getWriter();
		JSONObject obj = dao.convertDataBodyToJSON(req.getReader());
		int count = Integer.valueOf(obj.getString("count"));
		int page = Integer.valueOf(obj.getString("page"));
		
		Cadres cadres = (Cadres) session.getAttribute("account");
		List<Cadres> list = ModelCadres.getAllLowerCadresByCadres(cadres);
		
		int countPage = list.size()/count + 1;
		int countleft = 1;
		int countright = count;
		if(page < countPage) {
			countleft = (page-1)*count;
			countright = page*count;
		} else if(page == countPage) {
			countleft = (page-1)*count ;
			countright = list.size();
		} else {
			
		}
		List<Cadres> newList = ModelCadres.filterCadresByPage(countleft, countright, list);
		String dataJSON = ModelCadres.convertListToJSON(newList);
		
		out.print("{\n"
				+ "\t\"countPage\": " + countPage + ",\n"
				+ "\t\"countleft\": " + countleft + ",\n"
				+ "\t\"countright\": " + countright + ",\n"
				+ "\t\"size\": " + list.size() + ",\n"
				+ "\t\"dataresponse\": " + dataJSON + "\n"
				+ "}");
			
//		} else {
//			out.println("<script type=\"text/javascript\">");
//			out.println("alert('Vui lòng đăng nhập');");
//			out.println("location='/citizen';");
//			out.println("</script>");
//		}
	}

}
