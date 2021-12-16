package Model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import Entity.Cadres;
import Entity.Citizen;
import Entity.CityA2;
import Entity.CommuneB1;
import Entity.DistrictA3;

//thực hiện tất cả các sự chuyển đối từ dữ liệu của client
//liên quan tới các người dân
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
		return dao.getAllCitizenByLikeVillageID(numberID, "default", "default");
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
	
	public static List<Citizen> filterSearchCitizenByString(String word, List<Citizen> oldList) {
		List<Citizen> list = new ArrayList<>();
		List<Citizen> oList = oldList;
		for (Citizen citizen : oList) {
			if(citizen.getNameNotUnisign().contains(word)) {
				list.add(citizen);
			}
		}
		
		return list;
	}
	
	public static List<Citizen> sortCitizenByTypeAndValue(String type, String value, List<Citizen> oldList) {
		List<Citizen> list = oldList;
		switch (type) {
			case "name":
				if(value.equals("top")) {
					//a->z
					Collections.sort(list, new Comparator<Citizen>() {
						@Override
						public int compare(Citizen o1, Citizen o2) {
							return o1.getNameNotUnisign().compareTo(o2.getNameNotUnisign());
						}
					});
				} else {
					//z->a
					Collections.sort(list, new Comparator<Citizen>() {
						@Override
						public int compare(Citizen o1, Citizen o2) {
							return o2.getNameNotUnisign().compareTo(o1.getNameNotUnisign());
						}
					});
				}
				break;
		}
		return list;
	}
		
	public static List<Citizen> sortCitizenLiveSQL(String type, String value, String numberID) {
		List<Citizen> list = new ArrayList<>();
		switch (type) {
			case "name":
				list = dao.getAllCitizenByLikeVillageID(numberID, value, type);
				break;
		}
		return list;
	}
	public static String filterGeneralCitizen(String ID, String search, String type, String value, int count, int page,List<Citizen> oldList) {
		List<Citizen> list = oldList;
		list = ModelCitizen.filterCitizenByCadres(ID);
		list = (!search.equals("")) ? ModelCitizen.filterSearchCitizenByString(search, list) : list;
		list = (!type.equals("default")) ? ModelCitizen.sortCitizenLiveSQL(type, value, ID) : list;
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
		}
		list = ModelCitizen.filterCitizenByPage(countleft, countright, list);
		String dataJSON = ModelCitizen.convertListToJSON(list);
		String data = "{\n"
						+ "\t\"countPage\": " + countPage + ",\n"
						+ "\t\"countleft\": " + countleft + ",\n"
						+ "\t\"countright\": " + countright + ",\n"
						+ "\t\"size\": " + size + ",\n"
						+ "\t\"dataresponse\": " + dataJSON + "\n"
						+ "}";
		return data;
	}
	
}
