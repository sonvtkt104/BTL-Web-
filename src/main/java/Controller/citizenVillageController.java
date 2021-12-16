package Controller;

import Entity.Cadres;
import Entity.Citizen;
import Model.DAO;
import Model.ModelCitizen;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = {"/home/citizenvillage"})
public class citizenVillageController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json; charset=UTF-8");
        DAO dao = new DAO();
        HttpSession session = req.getSession();
        PrintWriter out = resp.getWriter();
        //B1: Kiểm tra quyền truy cập
        Cadres cadres = (Cadres) session.getAttribute("account");
        if(cadres != null && cadres.getRank().equals("B2")) {
            List<Citizen> list = new ArrayList<>();
            list = ModelCitizen.filterCitizenByCadres(cadres.getNumberID());
            //B2: Kiểm tra dữ liệu đầu vào
            int count = Integer.parseInt(req.getParameter("count"));
            int page = Integer.parseInt(req.getParameter("page"));
            String villageID = cadres.getNumberID();
            String search = req.getParameter("search");
            String typeSort = req.getParameter("type");
            String valueSort = req.getParameter("value");

            String data = ModelCitizen.filterGeneralCitizen(villageID, search, typeSort, valueSort, count, page, list);
            out.print(data);

        } else {
            out.println("<script type=\"text/javascript\">");
            out.println("alert('Bạn không có quyền truy cập trang này!!');");
            out.println("location='/citizen_war_exploded';");
            out.println("</script>");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
