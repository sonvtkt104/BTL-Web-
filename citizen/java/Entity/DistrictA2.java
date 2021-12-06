package Entity;

public class DistrictA2 extends CityA1 {
	private String nameDistrict;
	private int districtID;
	
	public String getNameDistrict() {
		return nameDistrict;
	}
	
	public void setNameDistrict(String nameDistrict) {
		this.nameDistrict = nameDistrict;
	}
	
	public int getDistrictID() {
		return districtID;
	}
	
	public void setDistrictID(int districtID) {
		this.districtID = districtID;
	}
	
	public DistrictA2(int ordinal, String nameDistrict, int districtID, String rank, int cityID, String nameCity, int population) {
		super(ordinal, nameCity, cityID, rank, population);
		this.districtID = districtID;
		this.nameDistrict = nameDistrict;
	}
	public DistrictA2(int ordinal, String nameDistrict, int districtID, String rank, int cityID) {
		super(ordinal, null, cityID, rank, 0);
		this.districtID = districtID;
		this.nameDistrict = nameDistrict;
	}
	public DistrictA2(String nameDistrict, int districtID, String rank,  int cityID) {
		super(null, cityID, rank);
		this.nameDistrict = nameDistrict;
		this.districtID = districtID;
	}
	
	public DistrictA2() {
		super();
	}
	
	@Override
	public int hashCode() {
		return districtID;
	}
	
	@Override
	public boolean equals(Object obj) {
		return (obj instanceof DistrictA2) ? (((DistrictA2) obj).toJSON().equals(this.toJSON())) : false;
	}
	
	@Override
	public String toString() {
		return "DistrictA2 [ordinal=" + super.getOrdinal() + ", nameDistrict=" + nameDistrict + ", districtID=" + 
					districtID + ",rank= "+ super.getRank() +",cityID="+ super.getCityID() +", population="+ super.getPopulation() +"]";
	}
	
	@Override
	public String toJSON() {
		return "{\n\t\"ordinal\": " + super.getOrdinal() + ",\n"
				+ "\t\"nameDistrict\": \"" + nameDistrict + "\",\n"
				+ "\t\"districtID\": " + districtID + ",\n"
				+ "\t\"rank\": \"" + super.getRank() + "\",\n"
				+ "\t\"cityID\": " + super.getCityID() + ",\n"
				+ "\t\"nameCity\": \"" + super.getNameCity() + "\",\n"
				+ "\t\"population\": \"" + super.getPopulation() + "\"\n"
				+ "}";
	}
	
	public String toJSON(String nameDistrict, String districtID) {
		return "{\n\t\"nameDistrict\": \"" + nameDistrict + "\",\n"
				+ "\t\"districtID\": " + districtID + "\n"
				+ "}";
	}
	
}
