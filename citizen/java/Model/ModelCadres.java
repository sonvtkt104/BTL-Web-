package Model;

import java.util.ArrayList;
import java.util.List;

import Entity.Cadres;
import Entity.CityA1;
import Entity.CommuneA3;
import Entity.DistrictA2;

public class ModelCadres {
	private static DAO dao = new DAO();
	
	public static String convertRankToAddress(String username) {
		String address = "";
		if (username != null) {
			Cadres cadres = dao.getCadresByUsername(username);
			
			String rank = cadres.getRank();
			int numberID = cadres.getNumberID() == null ? -1 : Integer.parseInt(cadres.getNumberID());
			switch(rank) {
				case "A1":
					CityA1 cityA1 = dao.getCityByCityID(numberID);
					address = cityA1.getRank() + " " + cityA1.getNameCity();
					break;
				case "A2":
					DistrictA2 districtA2 = dao.getDistrictByDistrictID(numberID);
					CityA1 cityA1A2 = dao.getCityByCityID(districtA2.getCityID());
					address = districtA2.getRank() + " " + districtA2.getNameDistrict() + " - " 
								+ cityA1A2.getRank() + " " + cityA1A2.getNameCity();
					break;
				case "A3":
					CommuneA3 communeA3 = dao.getCommuneByCommuneID(String.valueOf(numberID));
					DistrictA2 districtA2A3 = dao.getDistrictByDistrictID(communeA3.getDistrictID());
					CityA1 cityA1A2A3 = dao.getCityByCityID(communeA3.getCityID());
					address = communeA3.getRank() + " " + communeA3.getNameCommune() + " - " + 
					districtA2A3.getRank() + " " + districtA2A3.getNameDistrict() + " - " + 
							cityA1A2A3.getRank() + " " + cityA1A2A3.getNameCity();
					break;
			}
		} else {
			address = "Không tìm thấy địa chỉ!!";
		}
		
		return address;
	}
	
	public static List<Cadres> getAllLowerCadresByCadres(Cadres cadres) {
		List<Cadres> list = new ArrayList<>();
		
		switch (cadres.getRank()) {
			case "A1":
				
				break;
		}
		
		return list;
	}
	
}
