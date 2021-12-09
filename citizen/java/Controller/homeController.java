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
import Entity.CityA2;
import Model.DAO;
import Model.ModelCadres;
import Model.ModelCitizen;

@WebServlet(urlPatterns = {"/home"})
public class homeController extends HttpServlet{
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter out = resp.getWriter();
		HttpSession session = req.getSession();
		DAO dao = new DAO();
		int count = 25;
		
		if(session.getAttribute("account") != null) {
			Cadres cadres = (Cadres) session.getAttribute("account");
			List<Cadres> listCadres = ModelCadres.getAllLowerCadresByCadres(cadres);
			List<Citizen> listCitizen = (cadres.getRank().equals("A1")) ? 
					dao.getAllCitizen() : ModelCitizen.filterCitizenByCadres(cadres.getNumberID());;
			switch (cadres.getRank()) {
				case "A1":
					req.setAttribute("listcity", dao.getAllCity());
					break;
				case "A2":
					req.setAttribute("listdistrict", dao.getAllDistrictByType(cadres.getNumberID(), "cityID"));
					break;
				case "A3":
					req.setAttribute("listcommune", dao.getAllCommuneByType(cadres.getNumberID(), "districtID"));
					break;
				case "B1":
					req.setAttribute("listvillage", dao.getAllVillageByType(cadres.getNumberID(), "communeID"));
					break;	
			}
			
			req.setAttribute("count", count);
			req.setAttribute("sizecadres", listCadres.size());
			req.setAttribute("sizecitizen", listCitizen.size());
			req.setAttribute("listcadres", ModelCadres.filterCadresByPage(0, count, listCadres));
			req.setAttribute("listcitizen", ModelCitizen.filterCitizenByPage(0, count, listCitizen));
			req.getRequestDispatcher("Home.jsp").forward(req, resp);
		} else {
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Vui lòng đăng nhập');");
			out.println("location='/citizen';");
			out.println("</script>");
		}
	}
}
