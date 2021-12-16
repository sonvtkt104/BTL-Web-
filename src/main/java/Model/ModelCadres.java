package Model;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import Entity.Cadres;
import Entity.CityA2;
import Entity.CommuneB1;
import Entity.DistrictA3;
import Entity.VillageB2;

//thực hiện tất cả các sự chuyển đối từ dữ liệu của client
//liên quan tới các cán bộ
public class ModelCadres {
	private static DAO dao = new DAO();
	
	public static String convertNumberIDToAddress(Cadres cadres) {
		String address = "";
			
		String rank = cadres.getRank();
		String numberID = cadres.getNumberID();
		switch(rank) {
			case "A1":
				address = "cả nước";
				break;
			case "A2":
				CityA2 cityA1 = dao.getCityByCityID(numberID);
				address = cityA1.getRank() + " " + cityA1.getNameCity();
				break;
			case "A3":
				DistrictA3 districtA2 = dao.getDistrictByDistrictID(numberID);
				CityA2 cityA1A2 = dao.getCityByCityID(districtA2.getCityID());
				address = districtA2.getRank() + " " + districtA2.getNameDistrict() + " - " 
							+ cityA1A2.getRank() + " " + cityA1A2.getNameCity();
				break;
			case "B1":
				CommuneB1 communeA3 = dao.getCommuneByCommuneID(String.valueOf(numberID));
				DistrictA3 districtA2A3 = dao.getDistrictByDistrictID(communeA3.getDistrictID());
				CityA2 cityA1A2A3 = dao.getCityByCityID(communeA3.getCityID());
				address = communeA3.getRank() + " " + communeA3.getNameCommune() + " - " + districtA2A3.getRank() + " " + 
							districtA2A3.getNameDistrict() + " - " + cityA1A2A3.getRank() + " " + cityA1A2A3.getNameCity();
				break;
		}
		
		return address;
	}
	
	public static List<Cadres> getAllLowerCadresByCadres(Cadres cadres) {
		List<Cadres> list = new ArrayList<>();
		
		switch (cadres.getRank()) {
			case "A1":
				list.addAll(dao.getAllCadresByRank("A2"));
				break;
			case "A2":
				List<DistrictA3> listA3s = dao.getAllDistrictByType(cadres.getNumberID(), "cityID");
				List<String> listI = new ArrayList<>();
				for (DistrictA3 d : listA3s) {
					listI.add(d.getDistrictID());
				}
				list.addAll(dao.getAllCadresByRALID("A3", listI));
				break;
			case "A3":
				List<CommuneB1> listB1s = dao.getAllCommuneByType(cadres.getNumberID(), "districtID");
				List<String> listII = new ArrayList<>();
				for (CommuneB1 c : listB1s) {
					listII.add(c.getCommuneID());
				}
				list.addAll(dao.getAllCadresByRALID("B1", listII));
				break;
			case "B1":
				List<VillageB2> listB2s = dao.getAllVillageByType(cadres.getNumberID(), "communeID");
				List<String> listIII = new ArrayList<>();
				for (VillageB2 v : listB2s) {
					listIII.add(v.getVillageID());
				}
				list.addAll(dao.getAllCadresByRALID("B2", listIII));
				break;
		}
		
		return list;
	}
	
	public static List<Cadres> filterCadresByCityID(List<Cadres> oldList, String cityID) {
		List<String> listI = new ArrayList<>();
		listI.add(cityID);
		List<Cadres> list = dao.getAllCadresByRALID("A1", listI);
		List<DistrictA3> listA2s = dao.getAllDistrictByType(cityID, "cityID");
		List<CommuneB1> listA3s = dao.getAllCommuneByType(cityID, "cityID");
		List<VillageB2> listB1s = dao.getAllVillageByType(cityID, "cityID");
		List<String> listII = new ArrayList<>();
		for (DistrictA3 districtA2 : listA2s) {
			listII.add(districtA2.getDistrictID());
		}
		list.addAll(dao.getAllCadresByRALID("A2", listII));
		
		List<String> listIII = new ArrayList<>();
		for (CommuneB1 c : listA3s) {
			listIII.add(c.getCommuneID());
		}
		list.addAll(dao.getAllCadresByRALID("A3", listIII));
		List<String> listIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B1", listIIII));
		
		List<String> listIIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B2", listIIIII));
		
		return list;
	}
	
	public static List<Cadres> filterCadresByDistrictID(List<Cadres> oldList, String districtID) {
		List<String> listI = new ArrayList<>();
		listI.add(districtID);
		List<Cadres> list = dao.getAllCadresByRALID("A2", listI);
		List<CommuneB1> listA3s = dao.getAllCommuneByType(districtID, "districtID");
		List<VillageB2> listB1s = dao.getAllVillageByType(districtID, "districtID");
		
		List<String> listIII = new ArrayList<>();
		for (CommuneB1 c : listA3s) {
			listIII.add(c.getCommuneID());
		}
		list.addAll(dao.getAllCadresByRALID("A3", listIII));
		List<String> listIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B1", listIIII));
		List<String> listIIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B2", listIIIII));
		
		return list;
	}
	
	public static List<Cadres> filterCadresByCommuneID(List<Cadres> oldList, String communeID) {
		List<String> listI = new ArrayList<>();
		listI.add(communeID);
		List<Cadres> list = dao.getAllCadresByRALID("A3", listI);
		List<VillageB2> listB1s = dao.getAllVillageByType(communeID, "communeID");
		
		List<String> listIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B1", listIIII));
		List<String> listIIIII = new ArrayList<>();
		for (VillageB2 v : listB1s) {
			listIIIII.add(v.getVillageID());
		}
		list.addAll(dao.getAllCadresByRALID("B2", listIIIII));
		
		return list;
	}

	// lọc cán bộ ứng với số trang client yêu cầu
	public static List<Cadres> filterCadresByPage(int left, int right, List<Cadres> oldList) {
		List<Cadres> list = new ArrayList<>();
		right = (oldList.size() < 25) ? oldList.size() : right;
		for(int i=left; i<right; i++) {
			list.add(oldList.get(i));
		}
		
		return list;
	}

	//chuyển 1 danh sách cán bộ sang JSON
	public static String convertListToJSON(List<Cadres> list) {
		String[] array = new String[list.size()];
		int index = 0;
		for (Cadres c : list) {
			array[index++] = c.toJSON();
		}
		
		return Arrays.toString(array);
	}

	//băm mật khẩu
	public static String hashPassword(String password) {
		String hashPass = null;
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] encodedhash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
			
		    StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
		    for (int i = 0; i < encodedhash.length; i++) {
		        String hex = Integer.toHexString(0xff & encodedhash[i]);
		        if(hex.length() == 1) {
		            hexString.append('0');
		        }
		        hexString.append(hex);
		    }
		    hashPass = hexString.toString();
		} catch (NoSuchAlgorithmException e) {
			System.out.println(e.getMessage());
		}
		return hashPass;
	}
	
	// thực hiện việc kiểm tra xem cán bộ còn thời gian cấp quyền hay không
	//true la co quyen //false la khong
	public static boolean checkAccessTimeCadres(Cadres cadres) {
		boolean isno = true;
		
		LocalDateTime currenTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
		String nowDay = formatter.format(currenTime.now());
		String timeDay = cadres.getAccessTime();
		int year = Integer.parseInt(timeDay.split("-")[0]) - Integer.parseInt(nowDay.split("-")[2]);
		int month = Integer.parseInt(timeDay.split("-")[1]) - Integer.parseInt(nowDay.split("-")[1]);
		int day = Integer.parseInt(timeDay.split("-")[2]) - Integer.parseInt(nowDay.split("-")[0]);
		
		isno = year > 0 || (year == 0 && (month > 0 || (month == 0 && (day >= 0))));
		
		return isno;
	}

	//có chức năng tìm cấp dưới
	public static String searchLowerCadres(Cadres cadres) {
		String rank = null;
		switch (cadres.getRank()) {
			case "A1":
				rank = "A2";
				break;
			case "A2":
				rank = "A3";
				break;
			case "A3":
				rank = "B1";
				break;
			case "B1":
				rank = "B2";
				break;
		}

		return rank;
	}
}
