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

import Entity.Cadres;
import Entity.CityA1;
import Model.DAO;

@WebServlet(urlPatterns = {"/home"})
public class homeController extends HttpServlet{
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter out = resp.getWriter();
		HttpSession session = req.getSession();
		DAO dao = new DAO();
		
		if(session.getAttribute("account") != null) {
			List<CityA1> listCity = dao.getAllCity();
			List<Cadres> listCadres = dao.getAllCadres();
			Cadres cadres = (Cadres) session.getAttribute("account");
			
			
			req.setAttribute("sizecadres", listCadres.size());
			req.setAttribute("listcadres", listCadres);
			req.setAttribute("listcity", listCity);
			req.getRequestDispatcher("Home.jsp").forward(req, resp);
		} else {
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Vui lòng đăng nhập');");
			out.println("location='/citizen';");
			out.println("</script>");
		}
	}
}
