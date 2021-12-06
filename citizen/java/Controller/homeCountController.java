package Controller;

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

import Entity.Cadres;
import Model.DAO;

@WebServlet(urlPatterns = {"/home/APIcount"})
public class homeCountController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json; charset=UTF-8");
		DAO dao = new DAO();
		HttpSession session = req.getSession();
		PrintWriter out = resp.getWriter();
		
		if(session.getAttribute("account") != null) {
			int count = (req.getParameter("count") == null) ? -1 : Integer.valueOf(req.getParameter("count"));
			String[] dataJSON = new String[count];
			List<Cadres> list = dao.getAllCadres();
			
			for(int i=0; i<count; i++) {
				dataJSON[i] = list.get(i).toJSON();
			}
			
			out.print(Arrays.toString(dataJSON));
		} else {
			out.println("<script type=\"text/javascript\">");
			out.println("alert('Vui lòng đăng nhập');");
			out.println("location='/citizen';");
			out.println("</script>");
		}
	}

}
