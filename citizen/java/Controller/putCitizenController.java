package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Entity.Citizen;
import Json.JSONObject;
import Model.DAO;

@WebServlet(urlPatterns = {"/home/input"})
public class putCitizenController extends HttpServlet {
	
	private static final long serialVersionUID = -8077246765896657750L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
		DAO dao = new DAO();
		HttpSession session = req.getSession();
		PrintWriter out = resp.getWriter();
		JSONObject obj = dao.convertDataBodyToJSON(req.getReader());
		int ordinal = dao.getAllCitizen().size() + 1;
		String name = obj.getString("name");
		String dob = obj.getString("dob");//year-month-day
		String numberID = obj.getString("numberID");
		String gender = obj.getBoolean("gender") ? "Nữ" : "Nam";
		String poo = obj.getString("poo");
		String permanent = obj.getString("permanent");
		String temporary = obj.getString("temporary");
		String ethnicGroup = obj.getString("ethnicGroup");
		String eduLevel = obj.getString("eduLevel");
		String job = obj.getString("job");
		
		
		Citizen citizen = new Citizen(ordinal, numberID, name, dob, gender, poo, permanent, 
								temporary, ethnicGroup, eduLevel, job, eduLevel, job);
		System.out.println(citizen.toJSON());
		String result = "true";
		out.print("{\"result\": \""+ result +"\"}");
	}
	
}
