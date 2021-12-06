package Controller;

import java.io.BufferedReader;
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
import Json.JSONObject;
import Model.DAO;
import Model.ModelCadres;

@WebServlet(urlPatterns = {"/authorication"})
public class authoricationController extends HttpServlet {
	private DAO dao = new DAO();
	private ModelCadres modelCadres = new ModelCadres();
	
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html; charset=UTF-8");
		resp.addHeader("Access-Control-Allow-Origin", "*");
		PrintWriter out = resp.getWriter();
		
		String data = "";
	    BufferedReader reader = req.getReader();
	    String line;
	    while ((line = reader.readLine()) != null) {
	        data += line;
	    }
	    
	    System.out.println(data);
		JSONObject obj = new JSONObject(data);
		String username = obj.getString("username");
		String password = obj.getString("password");
		Cadres cadres = dao.getCadresByUsername(username);
		HttpSession session = req.getSession();
		
		if(password.equals(cadres.getPassword())) {
			session.setAttribute("account", cadres);
			session.setMaxInactiveInterval(1000*60);
			out.print("true");
		} else {
			out.print("false");
		}
	}

}
