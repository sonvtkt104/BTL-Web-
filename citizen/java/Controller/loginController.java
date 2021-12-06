package Controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import Entity.Cadres;

@WebServlet(urlPatterns = {""})
public class loginController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");
		HttpSession session = req.getSession();
		Cadres cadres = (Cadres) session.getAttribute("account");
		
		if(cadres == null) {
			req.getRequestDispatcher("Login.jsp").forward(req, resp);
		} else {
			resp.sendRedirect("/citizen/home");
		}
	}
	
}
