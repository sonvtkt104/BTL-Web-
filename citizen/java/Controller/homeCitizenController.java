package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

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

@WebServlet(urlPatterns = {"/home/APIcitizen"})
public class homeCitizenController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private int defaultCount = 25;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
		DAO dao = new DAO();
		HttpSession session = req.getSession();
		PrintWriter out = resp.getWriter();
		JSONObject obj = dao.convertDataBodyToJSON(req.getReader());
		Cadres cadres = (Cadres) session.getAttribute("account");
		
		List<Citizen> list = new ArrayList<>();
		list = ModelCitizen.filterCitizenByCadres(cadres.getNumberID()); 
		
		int count = Integer.valueOf(obj.getString("count"));
		int page = obj.getInt("page");
		String cityID = obj.getString("cityID");
		String districtID = obj.getString("districtID");
		String communeID = obj.getString("communeID");
		String villageID = obj.getString("villageID");
		
		list = (!cityID.equals("0")) ? ModelCitizen.filterCitizenByCadres(cityID) : list;
		list = (!districtID.equals("0")) ? ModelCitizen.filterCitizenByCadres(districtID) : list;
		list = (!communeID.equals("0")) ? ModelCitizen.filterCitizenByCadres(communeID) : list;
		list = (!villageID.equals("0")) ? ModelCitizen.filterCitizenByCadres(villageID) : list;
		
		int size = list.size();
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
		list = ModelCitizen.filterCitizenByPage(countleft, countright, list);
		String dataJSON = ModelCitizen.convertListToJSON(list);
		
		out.print("{\n"
				+ "\t\"countPage\": " + countPage + ",\n"
				+ "\t\"countleft\": " + countleft + ",\n"
				+ "\t\"countright\": " + countright + ",\n"
				+ "\t\"size\": " + size + ",\n"
				+ "\t\"dataresponse\": " + dataJSON + "\n"
				+ "}");
			
	}
}
