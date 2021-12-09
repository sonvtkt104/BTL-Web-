package Model;

import java.io.BufferedReader;
import java.io.DataOutput;
import java.io.IOException;
import java.nio.file.attribute.DosFileAttributes;
import java.security.spec.PSSParameterSpec;
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

import org.apache.tomcat.jni.OS;

import Entity.Cadres;
import Entity.Citizen;
import Entity.CityA2;
import Entity.CommuneB1;
import Entity.DistrictA3;
import Entity.VillageB2;
import Json.JSONObject;

public class DAO {
	private PreparedStatement ps = null;
	private ResultSet rs = null;
	public static LocalDateTime currenTime = LocalDateTime.now();
	public static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
	
	public List<CityA2> getAllCity() {
		List<CityA2> list = new ArrayList<>();
		String query = "SELECT * FROM citizen.city_a2;";
		
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CityA2(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getInt(5)));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<DistrictA3> getAllDistrict() {
		List<DistrictA3> list = new ArrayList<>();
		String query = "select * from citizen.district_a3v2;";
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new DistrictA3(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5),
										rs.getString(6), 
										0));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<CommuneB1> getALLCommune() {
		List<CommuneB1> list = new ArrayList<>();
		String query = "SELECT * FROM citizen.commune_b1v2;";
		try {
			ps = ConnectionJDBC.getJDBC().prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CommuneB1(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(8), 
										rs.getString(5), 
										rs.getString(7),
										rs.getString(6),
										0));
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		}
//		List<CityA2> listA1s = getAllCity();
//		List<DistrictA3> listA2s = getAllDistrict();
//		
//		for (CommuneB1 commune : list) {
//			for(int i=0; i<listA1s.size(); i++) {
//				if(commune.getCityID() == listA1s.get(i).getCityID()) {
//					commune.setNameCity(listA1s.get(i).getNameCity());
//				}
//			}
//			for(int i=0; i<listA2s.size(); i++) {
//				if(commune.getDistrictID() == listA2s.get(i).getDistrictID()) {
//					commune.setNameDistrict(listA2s.get(i).getNameDistrict());
//				}
//			}
//		}
		
		
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
				cadres = new Cadres(rs.getInt(1), 
									rs.getString(2), 
									rs.getString(3), 
									rs.getBoolean(4), 
									rs.getString(5), 
									rs.getString(6), 
									rs.getString(7));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cadres;
	}

	public CityA2 getCityByCityID(String cityID) {
		CityA2 cityA1 = null;
		Connection connection = null;
		try {
			String query = "select * from citizen.city_a2 where cityID = ?";
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setString(1, cityID);
			rs = ps.executeQuery();
			while(rs.next()) {
				cityA1 = new CityA2(rs.getInt(1), 
									rs.getString(2), 
									rs.getString(3), 
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
	
	public DistrictA3 getDistrictByDistrictID(String districtID) {
		DistrictA3 districtA2 = null;
		Connection connection = null;
		try { 
			String query = "SELECT * FROM citizen.district_a3v2 where districtID = ?;";
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setString(1, districtID);
			rs = ps.executeQuery();
			while(rs.next()) {
				districtA2 = new DistrictA3(rs.getInt(1),
											rs.getString(2),
											rs.getString(3),
											rs.getString(4),
											rs.getString(5),
											rs.getString(6),
											rs.getInt(7));
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
	
	public CommuneB1 getCommuneByCommuneID(String communeID) {
		CommuneB1 communeA3 = null;
		Connection connection = null;
		String query = "SELECT * FROM citizen.commune_b1v2 where communeID = ?;";
		try { 
			connection = ConnectionJDBC.getJDBC();
			ps = connection.prepareStatement(query);
			ps.setString(1, communeID);
			rs = ps.executeQuery();
			while(rs.next()) {
				communeA3 = new CommuneB1(rs.getInt(1),
											rs.getString(2),
											rs.getString(3),
											rs.getString(4),
											rs.getString(5),
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
	
	public VillageB2 getVillageByVillageID(String villageID) {
		VillageB2 villageB2 = null;
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.village_b2 where villageID = ?;";
			ps = connection.prepareStatement(query);
			ps.setString(1, villageID);
			rs = ps.executeQuery();
			while(rs.next()) {
				villageB2 = new VillageB2(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5), 
										rs.getString(6), 
										rs.getString(7), 
										rs.getInt(8));
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
		
		return villageB2;
	}
	
	public List<Citizen> getAllCitizen() {
		List<Citizen> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.infomation;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Citizen(rs.getInt(1), 
										rs.getString(2),
										rs.getString(3),
										rs.getString(4),
										rs.getString(5),
										rs.getString(6),
										rs.getString(7),
										rs.getString(8),
										rs.getString(9),
										rs.getString(10),
										rs.getString(11),
										rs.getString(12),
										rs.getString(13)));
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
	
	public int putDataToSQL(Citizen citizen) {
		int i=0;
		Connection connection = ConnectionJDBC.getJDBC();
		
		try {
			String query = "INSERT INTO `citizen`.`infomation` (`ordinal`, `ID`, `name`, `dob`, `gender`, `poo`, "
							+ "`permanent`, `temporary`, `ethnicGroup`, `eduLevel`, `job`, `villageID`, `time`) "
							+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ;
			ps = connection.prepareStatement(query);
			ps.setInt(1, citizen.getOrdinalInt());
			ps.setString(2, citizen.getNumberID());
			ps.setString(3, citizen.getName());
			ps.setString(4, citizen.getDob());
			ps.setString(5, citizen.getGender());
			ps.setString(6, citizen.getPoo());
			ps.setString(7, citizen.getPermanent());
			ps.setString(8, citizen.getTemporary());
			ps.setString(9, citizen.getEthnicGroup());
			ps.setString(10, citizen.getEduLevel());
			ps.setString(11, citizen.getJob());
			ps.setString(12, citizen.getVillageID());
			ps.setString(13, citizen.getTime());
			
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
	
	public List<DistrictA3> getAllDistrictByType(String ID, String type) {
		List<DistrictA3> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.district_a3v2 where "+ type +" = ?;";
			ps = connection.prepareStatement(query);
			ps.setString(1, ID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new DistrictA3(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5)));
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
	
	public List<CommuneB1> getAllCommuneByType(String ID, String type) {
		List<CommuneB1> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.commune_b1v2 where "+ type +" = ?;";
			ps = connection.prepareStatement(query);
			ps.setString(1, ID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new CommuneB1(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5), 
										rs.getString(6)));
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
			String query = "select * from citizen.account;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Cadres(rs.getInt(1), 
									rs.getString(2), 
									rs.getString(3), 
									rs.getBoolean(4), 
									rs.getString(5), 
									rs.getString(6), 
									rs.getString(7)));
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
	public List<VillageB2> getAllVillage() {
		List<VillageB2> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT b2.ordinal, b2.nameVillage, b2.villageID, b.commune, b.communeID, "
						+ "b.district, b.districtID, b.nameCity, b.cityID FROM citizen.village_b2 as "
						+ "b2, citizen.commune_b1v2 as b where b.communeID = b2.communeID;";
			ps = connection.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new VillageB2(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5), 
										rs.getString(6), 
										rs.getString(7), 
										rs.getString(8),
										rs.getString(9)));
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
     
    	return gc.get(gc.DAY_OF_MONTH) + "/" + (gc.get(gc.MONTH) + 1) + "/" + (gc.get(gc.YEAR));	
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
	
	public List<Cadres> getAllCadresByRALID(String rank, List<String> listNumberID) {
		List<Cadres> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		String query = "select * from citizen.account where rank = ? and ( ";
		for (String i : listNumberID) {
			query += " numberID = \'" + i + "\' or ";
 		}
		query += " numberID = 0);";
		try {
			ps = connection.prepareStatement(query);
			ps.setString(1, rank);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Cadres(rs.getInt(1), 
									rs.getString(2), 
									rs.getString(3), 
									rs.getBoolean(4), 
									rs.getString(5), 
									rs.getString(6), 
									rs.getString(7)));
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
	
	public List<Cadres> getAllCadresByRAID(String rank, int numberID) {
		List<Cadres> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.account where rank = ? and numberID = ? ";
			ps = connection.prepareStatement(query);
			ps.setString(1, rank);
			ps.setInt(2, numberID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Cadres(rs.getInt(1), 
								rs.getString(2), 
								rs.getString(3), 
								rs.getBoolean(4), 
								rs.getString(5), 
								rs.getString(6), 
								rs.getString(7)));
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
	
	public List<Cadres> getAllCadresByRank(String rank) {
		List<Cadres> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.account where rank = ?";
			ps = connection.prepareStatement(query);
			ps.setString(1, rank);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new Cadres(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getBoolean(4), 
										rs.getString(5), 
										rs.getString(6), 
										rs.getString(7)));
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
	
	public List<VillageB2> getAllVillageByType(String ID, String type) {
		List<VillageB2> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "select * from citizen.village_b2 where "+ type +" = ?;";
			ps = connection.prepareStatement(query);
			ps.setString(1, ID);
			rs = ps.executeQuery();
			while(rs.next()) {
				list.add(new VillageB2(rs.getInt(1), 
										rs.getString(2), 
										rs.getString(3), 
										rs.getString(4), 
										rs.getString(5), 
										rs.getString(6), 
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
	
	public JSONObject convertDataBodyToJSON(BufferedReader br) {
		String line;
		String data = "";
		try {
			while((line = br.readLine()) != null) {
				data += line;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		JSONObject obj = new JSONObject(data);
		return obj;
	}
	
	public Set<Citizen> createNameCitizen(){
		List<String> listmiddleMale = new ArrayList<>();
		List<String> listmiddleFemale = new ArrayList<>();
		Set<Citizen> generalList = new HashSet<>();
		
		Set<String> listCitizen = new HashSet<>();
//		String[] namesMale = {"Anh", "Nghĩa", "Ngọc", "Nguyên", "Nhân", "Hoàn", "Phi", "Phong", "Phúc",
//							"Quân", "Quang", "Quốc", "Tâm", "Thái", "Thành", "Thiên", "Thịnh", "Trung", "Tuấn", "Sơn", "Tùng", 
//							"Việt", "Vinh", "Uy", "Gia","Bách", "Bảo", "Công", "Cường", "Đức", "Dũng", "Dương", "Đạt", "Duy",
//							"Hải", "Hiếu", "Hoàng", "Huy", "Hùng", "Khải", "Khang", "Khánh", "Khoa", "Khôi", "Kiên", "Lâm",
//							"Long", "Lộc", "Minh", "Nam"};//9
//		String[] middlesMale = {"An", "Bảo", "Công", "Duy", "Gia", "Hải", "Hạo", "Hiếu", "Hoàng", "Hùng", "Hương", "Hữu", 
//				"Huy", "Ngọc", "Nguyên", "Phong", "Phước", "Quân", "Quang", "Quốc", "Qúy", "Thiên", "Tiến", "Vĩ", "Vũ", "Xuân"};//7
		String[] surs = {"Nguyễn", "Lê", "Đào", "Đàm", "Phạm", "Lê", "Lý", "Trần"};//7
		
		String[] namesFemale = {"Anh", "Như", "Thảo", "Thu", "Dung", "Duyên", "Giang", "Hà", "Nhung", "Yến", "Hạnh", 
				"Hoa", "Huế", "Hường", "Khánh", "Thủy", "Lan", "Linh", "Loan", "Mai", "Quỳnh", "Trang", "Nga", "Ngân", "Ngọc"};
//		"Nhi", "Nhiên", "Bích", "Châu", "Chi", "Diệp", 
//		"Hạ", "Oanh", "Quyên", "My", "Tâm", "Điệp", "Đoan", "Thư", "Khuê", "Minh", "Trà", "Uyên", "Vy", "Hân"
		String[] middlesFemale = {"Ngân", "Ngọc", "Nguyệt", "Như", "Phương",
				"Quỳnh", "Thanh", "Thảo", "Thư", "Thu", "Thúy", "Thùy", "Thủy", "Uyên", "Vân", "Yến"};
		//"Quế", "Nhã", "Nhật","Mỹ", 
		String[] ethnic = {"Phật giáo", "Đạo giáo", "Tin Lành", "Không", "Hồi giáo", "Không", "Không", "Không", "Không", "Không", "Không"};
		String[] jobs = {"Học sinh", "Sinh viên"};
		
		Set<String> nameSetMale = new HashSet<>();
		Set<String> nameSetFemale = new HashSet<>();
		
		Map<String, String> mapMale = new HashMap<>();
		Map<String, String> mapFemale = new HashMap<>();
		
		Set<Citizen> set = new HashSet<>();
//		for(int i=0; i<middlesMale.length; i++) {
//			listmiddleMale.add(middlesMale[i]);
//			for(int j=i+1; j<middlesMale.length; j++) {
//				if(!middlesMale[i].equals(middlesMale[j])) {
//					listmiddleMale.add(middlesMale[i] + " " + middlesMale[j]);
//				}
//			}
//		}
		for(int i=0; i<middlesFemale.length; i++) {
//			listmiddleFemale.add(middlesFemale[i]);
			for(int j=i+1; j<middlesFemale.length; j++) {
				if(!middlesFemale[i].equals(middlesFemale[j])) {
					listmiddleFemale.add(middlesFemale[i] + " " + middlesFemale[j]);
				}
			}
		}
		
//		for(int i=0; i<surs.length; i++) {
//			String fullname = "";
//			fullname += surs[i];
//			for(int j=0; j<listmiddleMale.size(); j++) {
//				if(!fullname.contains(listmiddleMale.get(j))) {
//					fullname += " " + listmiddleMale.get(j);
//					mapMale.put(fullname, listmiddleMale.get(j));
//					fullname = surs[i];
//				}
//			}
//		}
//		
//		for (String string : mapMale.keySet()) {
//			String fullname = string;
//			for(int i=0; i<namesMale.length; i++) {
//				if(!string.contains(namesMale[i])) {
//					fullname += " " + namesMale[i];
//					listCitizen.add(fullname);
//				}
//				fullname = string;
//			}
//		}
		
		for(int i=0; i<surs.length; i++) {
			String fullname = "";
			fullname += surs[i];
			for(int j=0; j<listmiddleFemale.size(); j++) {
				if(!fullname.contains(listmiddleFemale.get(j))) {
					fullname += " " + listmiddleFemale.get(j);
					mapFemale.put(fullname, listmiddleFemale.get(j));
					fullname = surs[i];
				}
			}
		}
		
		for (String string : mapFemale.keySet()) {
			String fullname = string;
			for(int i=0; i<namesFemale.length; i++) {
				if(!string.contains(namesFemale[i])) {
					fullname += " " + namesFemale[i];
					listCitizen.add(fullname);
				}
				fullname = string;
			}
		}
		List<VillageB2> listB1 = getAllVillage();
		List<CommuneB1> listaA3s = getALLCommune();
		List<Integer> listCommuneID = new ArrayList<>();
		
		for (CommuneB1 c : listaA3s) {
			listCommuneID.add(Integer.parseInt(c.getCommuneID()));
		}
		
		
		int ordinal = 137333;
		System.out.println(listCitizen.size());
		for (String name : listCitizen) {
			ordinal++;
			int r = (name.hashCode() < 0 ? name.hashCode()*(-1) : name.hashCode());
			int numberID = 100121363;
			numberID += ordinal;
			String dob = getDateRandom(1999, 2007);
			String gender = "Nữ";
			String ethnicGroup = ethnic[r%ethnic.length];
			String eduLevel = "12/12";
			int villageID = r%listB1.size() + 1;
			String time =	getDateRandom(2021, 2021) + " " + createTimeRandom();
			String permanent = ModelCitizen.convertVillageIDToStringAddress(villageID);
			String poo = ModelCitizen.getPooByCommuneID(listCommuneID.get(r%listCommuneID.size()));
			String tempory = permanent;
			String job = jobs[r%jobs.length];
			Citizen citizen = new Citizen(ordinal,"000" + numberID,  name , dob, gender, poo, permanent, tempory,
											ethnicGroup, eduLevel, job, null, time);
			generalList.add(citizen);
			System.out.println(ordinal - 137333);
		}
		
		return generalList;
	}
	public int updateCitizen(int ordinal, String permanent, String villageID) {
		int i = 0;
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "UPDATE `citizen`.`infomation` SET `permanent` = ?, `temporary` = ?, `villageID` = ? "
							+ "WHERE (`ordinal` = ?);";
			ps = connection.prepareStatement(query);
			ps.setInt(4, ordinal);
			ps.setString(1, permanent);
			ps.setString(2, permanent);
			ps.setString(3, villageID);
			
			i = ps.executeUpdate();
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
		
		return i;
	}
	
	public String convert(VillageB2 communeB1) {
		String address = "";
		
		if(communeB1.getNameDistrict().contains("Thành phố")) {
			communeB1.setNameDistrict(communeB1.getNameDistrict().replace("Thành phố ", ""));
		} else if(communeB1.getNameDistrict().contains("Huyện")) {
			communeB1.setNameDistrict(communeB1.getNameDistrict().replace("Huyện ", ""));
		}
		
		if(communeB1.getNameCity().contains("Tỉnh")) {
			communeB1.setNameCity(communeB1.getNameCity().replace("Tỉnh ", ""));
		} else if(communeB1.getNameCity().contains("Thành phố")) {
			communeB1.setNameCity(communeB1.getNameCity().replace("Thành phố ", ""));
		} 
		
		if(communeB1.getNameCommune().contains("Xã")) {
			communeB1.setNameCommune(communeB1.getNameCommune().replace("Xã ", ""));
		} else if(communeB1.getNameCommune().contains("Thị trấn")) {
			communeB1.setNameCommune(communeB1.getNameCommune().replace("Thị trấn ", ""));
		} 
		
		address += "Đường " + communeB1.getNameVillage() + " - " + communeB1.getNameCommune() + " - " + communeB1.getNameDistrict() 
					+ " - " + communeB1.getNameCity();
 		
		return address;
	}
	
	public List<Citizen> getAllCitizenByLikeVillageID(String villageID) {
		villageID += "%";
		List<Citizen> list = new ArrayList<>();
		Connection connection = ConnectionJDBC.getJDBC();
		try {
			String query = "SELECT * FROM citizen.infomation where villageID like ?;";
			ps = connection.prepareStatement(query);
			ps.setString(1, villageID);
			
			rs = ps.executeQuery();
			while (rs.next()) {
				list.add(new Citizen(rs.getInt(1), 
									rs.getString(2),
									rs.getString(3),
									rs.getString(4),
									rs.getString(5),
									rs.getString(6),
									rs.getString(7),
									rs.getString(8),
									rs.getString(9),
									rs.getString(10),
									rs.getString(11),
									rs.getString(12),
									rs.getString(13)));
				
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
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
	
	public static void main(String[] args) {
		DAO dao = new DAO();
		long startTime = System.nanoTime();
		List<Citizen> list = new ArrayList<>();
		List<Citizen> list2 = dao.getAllCitizen();
		
		for(int i=0; i<100; i++) {
			list.add(list2.get(i));
		}
		System.out.println(ModelCitizen.convertListToJSON(list));
		
		
		long endTime   = System.nanoTime();
		long totalTime = (long) ((endTime - startTime)/Math.pow(10, 6));
		System.out.println(totalTime + "ms");
	}
}
