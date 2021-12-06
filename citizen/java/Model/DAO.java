package Model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.regex.Pattern;

import com.mysql.cj.util.EscapeTokenizer;

import Entity.Cadres;
import Entity.Citizen;
import Entity.CityA1;
import Entity.CommuneA3;
import Entity.DistrictA2;
import Entity.VillageB1;

public class DAO {
	private PreparedStatement ps = null;
	private ResultSet rs = null;
	public static LocalDateTime currenTime = LocalDateTime.now();
	public static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
	
	public List<CityA1> getAllCity() {
		List<CityA1> list = new ArrayList<>();
		String query = "SELECT * FROM citizen.city_a1;";
		
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CityA1(rs.getInt(1), rs.getString(2), rs.getInt(3), rs.getString(4), rs.getInt(5)));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<DistrictA2> getAllDistrict() {
		List<DistrictA2> list = new ArrayList<>();
		String query = "select d.ordinal, d.nameDistrict, d.districtID, d.rank, d.cityID, ca1.nameCity from citizen.district_a2 as d "
						+ "inner join citizen.city_a1 as ca1 where d.cityID = ca1.cityID;";
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new DistrictA2(rs.getInt(1), 
										rs.getString(2), 
										rs.getInt(3), 
										rs.getString(4), 
										rs.getInt(5), 
										rs.getString(6),
										0));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<CommuneA3> getALLCommune() {
		List<CommuneA3> list = new ArrayList<>();
		String query = "SELECT * FROM citizen.commune_a3;";
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CommuneA3(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getInt(4), 
										null,
										rs.getInt(5), 
										null,
										rs.getString(6), 
										0));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		List<CityA1> listA1s = getAllCity();
		List<DistrictA2> listA2s = getAllDistrict();
		
		for (CommuneA3 commune : list) {
			for(int i=0; i<listA1s.size(); i++) {
				if(commune.getCityID() == listA1s.get(i).getCityID()) {
					commune.setNameCity(listA1s.get(i).getNameCity());
				}
			}
			for(int i=0; i<listA2s.size(); i++) {
				if(commune.getDistrictID() == listA2s.get(i).getDistrictID()) {
					commune.setNameDistrict(listA2s.get(i).getNameDistrict());
				}
			}
		}
		
		
		return list;
	}
	
	public Cadres getCadresByUsername(String username) {
		Cadres cadres = null;
		try {
			String query = "select * from citizen.account where username = ?";
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			ps.setString(1, username);
			rs = ps.executeQuery();
			while(rs.next()) {
				cadres = new Cadres(rs.getString(1), 
									rs.getString(2), 
									rs.getString(3), 
									rs.getString(4), 
									rs.getString(5), 
									rs.getString(6), 
									rs.getString(7), 
									rs.getBoolean(8), 
									rs.getString(9), 
									rs.getString(10));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cadres;
	}
	
	public int putAccountToSQL(VillageB1 villageB1) {
		int i=0;
		try {
			String query = "INSERT INTO citizen.village_b1 (ordinal, nameVillage, villageID, communeID, districtID, cityID, rank, population) "
							+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			ps.setInt(1, villageB1.getOrdinal());
			ps.setString(2, villageB1.getNameVillage());
			ps.setInt(3, villageB1.getVillageID());
			ps.setString(4, villageB1.getCommuneID());
			ps.setInt(5, villageB1.getDistrictID());
			ps.setInt(6, villageB1.getCityID());
			ps.setString(7, villageB1.getRank());
			ps.setInt(8, villageB1.getPopulation());
			
			i = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		
		return i;
	}

	public CityA1 getCityByCityID(int cityID) {
		CityA1 cityA1 = null;
		Connection connection = null;
		try {
			String query = "select * from citizen.city_a1 where cityID = ?";
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setInt(1, cityID);
			rs = ps.executeQuery();
			while(rs.next()) {
				cityA1 = new CityA1(rs.getInt(1), 
									rs.getString(2), 
									rs.getInt(3), 
									rs.getString(4), 
									rs.getInt(5));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if(connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return cityA1;
	}
	
	public DistrictA2 getDistrictByDistrictID(int districtID) {
		DistrictA2 districtA2 = null;
		Connection connection = null;
		try { 
			String query = "SELECT * FROM citizen.district_a2 where districtID = ?;";
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setInt(1, districtID);
			rs = ps.executeQuery();
			while(rs.next()) {
				districtA2 = new DistrictA2(rs.getInt(1),
											rs.getString(2),
											rs.getInt(3),
											rs.getString(4),
											rs.getInt(5));
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			if(connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return districtA2;
	}
	
	public CommuneA3 getCommuneByCommuneID(String communeID) {
		CommuneA3 communeA3 = null;
		Connection connection = null;
		String query = "SELECT * FROM citizen.commune_a3 where communeID = ?;";
		try { 
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setString(1, communeID);
			rs = ps.executeQuery();
			while(rs.next()) {
				communeA3 = new CommuneA3(rs.getInt(1),
											rs.getString(2),
											rs.getString(3),
											rs.getInt(4),
											rs.getInt(5),
											rs.getString(6));
			}
		}catch (SQLException e) {
			System.out.println(e.getMessage());
		}finally {
			if(connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return communeA3;
	}
	
	public List<Citizen> getAllCitizen() {
		List<Citizen> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.infomation;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Citizen(rs.getString(1), 
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getInt(10),
										rs.getString(11)));
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return list;
	}
	
	
	public Set<Citizen> createNameCitizen(){
		List<String> listmiddleMale = new ArrayList<>();
		List<String> listmiddleFemale = new ArrayList<>();
		Set<Citizen> generalList = new HashSet<>();
		
		Set<String> listCitizen = new HashSet<>();
		String[] namesMale = {"Anh", "Bách", "Bảo", "Công", "Cường", "Đức", "Dũng", "Dương", "Đạt", "Duy",
				"Hải", "Hiếu", "Hoàng", "Huy", "Hùng", "Khải", "Khang", "Khánh", "Khoa", "Khôi", "Kiên", "Lâm",
				"Long", "Lộc", "Minh", "Nam", "Nghĩa", "Ngọc", "Nguyên", "Nhân", "Hoàn", "Phi", "Phong", "Phúc",
				"Quân", "Quang", "Quốc", "Tâm", "Thái", "Thành", "Thiên", "Thịnh", "Trung", "Tuấn", "Sơn", "Tùng", 
				"Việt", "Vinh", "Uy", "Gia"};//9
		String[] middlesMale = {"An", "Bảo", "Công", "Duy", "Gia", "Hải", "Hạo", "Hiếu", "Hoàng", "Hùng", "Hương", "Hữu", 
				"Huy", "Ngọc", "Nguyên", "Phong", "Phước", "Quân", "Quang", "Quốc", "Qúy", "Thiên", "Tiến", "Vĩ", "Vũ", "Xuân"};//7
		String[] surs = {"Bạch", "Cao", "Đàm", "Đào", "Đinh", "Đậu", "Đoàn", "Đống", "Đường",
				"Hạ", "Hà", "Hoàng", "Hướng", "Khương", "Khổng", "Lại", "Lý", "Mã", "Mai", "Mộc",
				"Nghiêm", "Vương", "Vi", "Vạn", "Trương", "Trịnh", "Triệu", "Phí"};//7
//		
//		String[] namesFemale = {"Anh", "Bích", "Châu", "Chi", "Diệp", "Điệp", "Đoan", "Dung", "Duyên", "Giang", "Hà", "Hạ", "Hân", "Hạnh", 
//				"Hoa", "Huế", "Hường", "Khánh", "Khuê", "Lan", "Linh", "Loan", "Mai", "My", "Minh", "Nga", "Ngân", "Ngọc", "Nhi", "Nhiên", "Như", 
//				"Nhung", "Oanh", "Quyên", "Quỳnh", "Tâm", "Thảo", "Thu", "Thư", "Thủy", "Trang", "Trà", "Uyên", "Vy", "Yến"};
//		String[] middlesFemale = {"Ái", "An", "Anh", "Ánh", "Bạch", "Băng", "Bảo", "Bích", "Cẩm", "Chi", "Dạ", "Diễm", "Diệp", 
//				"Diệu", "Duyên", "Gia", "Hà", "Hạ", "Hải", "Hiền", "Hạnh", "Hoa", "Hoài", "Hồng", "Huệ", "Hương", "Huyền", "Khánh", "Kiều", 
//				"Kim", "Lan", "Lệ", "Liên", "Linh", "Ly", "Mai", "Minh", "Mỹ", "Ngân", "Ngọc", "Nguyệt", "Nhã", "Nhật", "Như", "Phương", "Quế", 
//				"Quỳnh", "Thanh", "Thảo", "Thư", "Thu", "Thúy", "Thùy", "Thủy", "Uyên", "Vân", "Yến"};
 		String[] ethnic = {"Phật giáo", "Đạo giáo", "Tin Lành", "Không", "Hồi giáo", "Không", "Không", "Không", "Không", "Không", "Không"};
 		
		Set<String> nameSetMale = new HashSet<>();
		Set<String> nameSetFemale = new HashSet<>();
		
		Map<String, String> mapMale = new HashMap<>();
		Map<String, String> mapFemale = new HashMap<>();
		
		Set<Citizen> set = new HashSet<>();
		for(int i=0; i<middlesMale.length; i++) {
			listmiddleMale.add(middlesMale[i]);
//			for(int j=i+1; j<middlesMale.length; j++) {
//				if(!middlesMale[i].equals(middlesMale[j])) {
//					listmiddleMale.add(middlesMale[i] + " " + middlesMale[j]);
//				}
//			}
		}
//		for(int i=0; i<middlesFemale.length; i++) {
//			listmiddleFemale.add(middlesFemale[i]);
//			for(int j=i+1; j<middlesFemale.length; j++) {
//				if(!middlesFemale[i].equals(middlesFemale[j])) {
//					listmiddleFemale.add(middlesFemale[i] + " " + middlesFemale[j]);
//				}
//			}
//		}
		
		for(int i=0; i<surs.length; i++) {
			String fullname = "";
			fullname += surs[i];
			for(int j=0; j<listmiddleMale.size(); j++) {
				if(!fullname.contains(listmiddleMale.get(j))) {
					fullname += " " + listmiddleMale.get(j);
					mapMale.put(fullname, listmiddleMale.get(j));
					fullname = surs[i];
				}
			}
		}
		
		for (String string : mapMale.keySet()) {
			String fullname = string;
			for(int i=0; i<namesMale.length; i++) {
				if(!string.contains(namesMale[i])) {
					fullname += " " + namesMale[i];
					listCitizen.add(fullname);
				}
				fullname = string;
			}
		}
		
//		for(int i=0; i<surs.length; i++) {
//			String fullname = "";
//			fullname += surs[i];
//			for(int j=0; j<listmiddleFemale.size(); j++) {
//				if(!fullname.contains(listmiddleFemale.get(j))) {
//					fullname += " " + listmiddleFemale.get(j);
//					mapFemale.put(fullname, listmiddleFemale.get(j));
//					fullname = surs[i];
//				}
//			}
//		}
//		
//		for (String string : mapFemale.keySet()) {
//			String fullname = string;
//			for(int i=0; i<namesFemale.length; i++) {
//				if(!string.contains(namesFemale[i])) {
//					fullname += " " + namesFemale[i];
//					listCitizen.add(fullname);
//				}
//				fullname = string;
//			}
//		}
		
		List<VillageB1> listB1 = getAllVillage();
		int ordinal = 0;
		System.out.println(listCitizen.size());
		for (String name : listCitizen) {
			ordinal++;
			int r = (name.hashCode() < 0 ? name.hashCode()*(-1) : name.hashCode());
			int phone = 988000000;
			int numberID = 100121363;
			phone += ordinal;
			numberID += ordinal;
			String dob = getDateRandom(1950, 2003);
			String email = convertAccentToUnisigned(name).split(" ")[2].toLowerCase()
							+ String.format("%07d", ordinal) + "@gmail.com";
			String gender = (r%2 == 1) ? "Nam" : "Nữ";
			String ethnicGroup = ethnic[r%ethnic.length];
			String nation = "Việt Nam";
			int villageID = r%listB1.size() + 1;
			String time = getDateRandom(2019, 2021) + " " + createTimeRandom();
			Citizen citizen = new Citizen(String.valueOf(ordinal), name, "0" + phone, "000" + numberID, dob, gender, 
											ethnicGroup, nation, null, villageID, time);
			generalList.add(citizen);
		}
		
		return generalList;
	}
	
	public int putDataToSQL(Citizen citizen) {
		int i=0;
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "INSERT INTO citizen.infomation (ordinal, name, dob, gender, numberID, numberPhone, ethnicGroup, "
							+ "nation, address, villageID, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
			ps = connection.prepareStatement(query);
			ps.setInt(1, citizen.getOrdinalInt());
			ps.setString(2, citizen.getName());
			ps.setString(3, citizen.getDob());
			ps.setString(4, citizen.getGender());
			ps.setString(5, citizen.getNumberID());
			ps.setString(6, citizen.getNumberPhone());
			ps.setString(7, citizen.getEthnicGroup());
			ps.setString(8, citizen.getNation());
			ps.setString(9, citizen.getAddress());
			ps.setInt(10, citizen.getVillageID());
			ps.setString(11, citizen.getTime());
			
			i = ps.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return i;
	}
	
	public int deleDataFromSQL(String username) {
		int i=0;
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "DELETE FROM citizen.account WHERE (username = ?);";
			ps = connection.prepareStatement(query);
			ps.setString(1, username);
			
			i = ps.executeUpdate();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return i;
	}
	
	public List<DistrictA2> getAllDistrictByCityID(int cityID) {
		List<DistrictA2> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.district_a2 where cityID = ?;";
			ps = connection.prepareStatement(query);
			ps.setInt(1, cityID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new DistrictA2(rs.getInt(1), 
						rs.getString(2), rs.getInt(3), rs.getString(4), rs.getInt(5)));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if(connection!=null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list;
	}
	
	public List<CommuneA3> getAllCommuneByDistrictID(int districtID) {
		List<CommuneA3> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.commune_a3 where districtID = ?;";
			ps = connection.prepareStatement(query);
			ps.setInt(1, districtID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CommuneA3(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getInt(4), rs.getInt(5), rs.getString(6)));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			if(connection!=null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list;
	}
	
	public List<Cadres> getAllCadres() {
		List<Cadres> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.account order by ordinal asc;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Cadres(rs.getString(1), 
									rs.getString(2), 
									rs.getString(3), 
									rs.getString(4), 
									rs.getString(5), 
									rs.getString(6), 
									rs.getString(7), 
									rs.getBoolean(8), 
									rs.getString(9), 
									rs.getString(10)));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if(connection!=null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list;
	}
	public List<VillageB1> getAllVillage() {
		List<VillageB1> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.village_b1;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new VillageB1(rs.getInt(1), 
										rs.getString(2), 
										rs.getInt(3), 
										rs.getString(4), 
										rs.getInt(5), 
										rs.getInt(6), 
										rs.getString(7), 
										rs.getInt(8)));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if(connection!=null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return list;
	}
	
	public String getDateRandom(int left, int right) {
		GregorianCalendar gc = new GregorianCalendar();
        int year = randBetween(left, right);
        gc.set(gc.YEAR, year);
        int dayOfYear = randBetween(1, gc.getActualMaximum(gc.DAY_OF_YEAR));
        gc.set(gc.DAY_OF_YEAR, dayOfYear);
     
    	return gc.get(gc.DAY_OF_MONTH) + "/" + (gc.get(gc.MONTH) + 1) + "/" + (gc.get(gc.YEAR) + 1);	
	}
	public static String convertAccentToUnisigned(String s) {
		String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
		Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
		s = pattern.matcher(temp).replaceAll("");
		s = s.replace("Đ", "D");
		return s;
	}
	
	public static String createTimeRandom() {
		final Random random = new Random();
		final int millisInDay = 24*60*60*1000;
		Time time = new Time((long)random.nextInt(millisInDay));
		return time.toString();
	}
	
	public int randBetween(int start, int end) {
        return start + (int)Math.round(Math.random() * (end - start));
    }
	
	public boolean isNumeric(String str) { 
		  try {  
		    Integer.parseInt(str);
		    return true;
		  } catch(NumberFormatException e){  
		    return false;  
		  }  
	}
	
	public List<VillageB1> createVillage() {
		List<VillageB1> list = new ArrayList<>();
		List<DistrictA2> listA2s = new ArrayList<>();
		//Hà Nội
		int[] array = {1, 2, 3, 4, 5, 6, 7};
		//Ba Đình, Hoàn Kiếm, Tây Hà, Long Biên, Cầu Giaáy, Hai Bà Trưng
		String[] names = {"A", "B", "C", "D"};
		List<CommuneA3> listA3s = new ArrayList<>();
		for (int i : array) {
			for(int j=0; j<getAllCommuneByDistrictID(i).size(); j++) {
				listA3s.add(getAllCommuneByDistrictID(i).get(j));
			}
		}
		int count = 0;
		for (CommuneA3 communeA3 : listA3s) {
			for(int i=0; i<names.length; i++) {
				count++;
				int ordinal = count;
				String nameVillage = names[i] + String.format("%04d", ordinal);
				int villageID = count;
				VillageB1 villageB1 = new VillageB1(ordinal, nameVillage, villageID, communeA3.getCommuneID(), 
										communeA3.getDistrictID(), communeA3.getCityID(), "Đường", 0);
				list.add(villageB1);
			}
		}
		int val = 0;
		for (VillageB1 v : list) {
			try {
				String query = "insert into citizen.village_b1 (ordinal, nameVillage, villageID, communeID, districtID, cityID, rank) "
								+ "	values (?, ?, ?, ?, ?, ?, ?);";
				ps = ConnectionJDBC.getJDBC().prepareStatement(query);
				ps.setInt(1, v.getOrdinal());
				ps.setString(2, v.getNameVillage());
				ps.setInt(3, v.getVillageID());
				ps.setString(4, v.getCommuneID());
				ps.setInt(5, v.getDistrictID());
				ps.setInt(6, v.getCityID());
				ps.setString(7, v.getRank());
				
				val += ps.executeUpdate();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}
		
		return list;
	}
	
	public static void main(String[] args) {
		DAO dao = new DAO();
		long startTime = System.nanoTime();
		List<Cadres> list = dao.getAllCadres();
		String[] array = new String[100];
		int index = 0;
		for (Cadres cadres : list) {
			if(cadres.getOrdinalInt() <= 100) {
				array[index++] = cadres.toJSON();
			}
		}
		System.out.println(Arrays.toString(array));
		
		
		long endTime   = System.nanoTime();
		long totalTime = (long) ((endTime - startTime)/Math.pow(10, 6));
		System.out.println(totalTime + "ms");
	}

}
