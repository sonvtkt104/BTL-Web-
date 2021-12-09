package Model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import Entity.Cadres;
import Entity.Citizen;
import Entity.CityA2;
import Entity.CommuneB1;
import Entity.DistrictA3;

public class ModelCitizen {
	private static DAO dao = new DAO();

	public static String convertVillageIDToStringAddress(int villageID) {
		return null;
	}
	
	public static String getPooByCommuneID(int communeID) {
		String poo = "";
		CommuneB1 communeA3 = dao.getCommuneByCommuneID(String.valueOf(communeID));
		poo += communeA3.getRank() + " " + communeA3.getNameCommune() + " - ";
		DistrictA3 districtA2 = dao.getDistrictByDistrictID(communeA3.getDistrictID());
		poo += districtA2.getRank() + " " + districtA2.getNameDistrict() + " - ";
		CityA2 cityA1 = dao.getCityByCityID(communeA3.getCityID());
		poo += cityA1.getRank() + " " + cityA1.getNameCity();
		return poo;
	}
	
	public static List<Citizen> filterCitizenByCadres(String numberID) {
		return dao.getAllCitizenByLikeVillageID(numberID);
	}
	
	
	public static List<Citizen> filterCitizenByPage(int left, int right, List<Citizen> oldList) {
		List<Citizen> list = new ArrayList<>();
		right = (oldList.size() < 25) ? oldList.size() : right;
		for(int i=left; i<right; i++) {
			list.add(oldList.get(i));
		}
		
		return list;
	}
	
	public static String convertListToJSON(List<Citizen> list) {
		String[] array = new String[list.size()];
		int index = 0;
		for (Citizen c : list) {
			array[index++] = c.toJSON();
		}
		
		return Arrays.toString(array);
	}
	
}
