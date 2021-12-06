package Entity;

public class CommuneA3 extends DistrictA2 {
	private String nameCommune;
	private String communeID;
	
	public String getNameCommune() {
		return nameCommune;
	}
	
	public void setNameCommune(String nameCommune) {
		this.nameCommune = nameCommune;
	}
	
	public String getCommuneID() {
		return communeID;
	}
	
	public int getCommuneIDInterger() {
		return communeID == null ? -1 : (communeID.contains(".") ? Math.round(Float.parseFloat(communeID)*1000) : Integer.parseInt(communeID));
	}
	
	public void setCommuneID(String communeID) {
		this.communeID = communeID;
	}
	
	public CommuneA3(String nameCommune, String communeID, int cityID, int districtID ,String rank) {
		super(null, districtID, rank, cityID);
		this.nameCommune = nameCommune;
		this.communeID = communeID;
	}
	
	public CommuneA3() {
		super();
	}
	
	public CommuneA3(int ordinal, String nameCommune, String communeID, int cityID, String nameCity, int districtID, 
						String nameDistrict ,String rank, int population) {
		super(ordinal, nameDistrict, districtID, rank, cityID, nameCity, population);
		this.nameCommune = nameCommune;
		this.communeID = communeID;
	}
	public CommuneA3(int ordinal, String nameCommune, String communeID, int cityID,  int districtID, String rank) {
		super(ordinal, null, districtID, rank, cityID);
		this.nameCommune = nameCommune;
		this.communeID = communeID;
	}
	@Override
	public int hashCode() {
		return communeID == null ? -1 : communeID.hashCode();
	}
	
	@Override
	public boolean equals(Object obj) {
		return (obj instanceof CommuneA3) ? (((CommuneA3) obj).toJSON().equals(this.toJSON())) : false;
	}
	
	@Override
	public String toString() {
		return "CommuneA3 [ordinal=" + super.getOrdinal() + ",nameCommune= "+ nameCommune +",communeID= " + communeID 
				+ ", cityID= "+ super.getCityID() + ", districtID= " + super.getDistrictID() + ",rank= "+ super.getRank()
				+", population= "+ super.getPopulation() + "]";
	}
	@Override
	public String toJSON() {
		return "{\n\tordinal: " + super.getOrdinal() + ",\n"
				+ "\tnameCommune: \"" + nameCommune + "\",\n"
				+ "\tcommuneID:" + this.getCommuneIDInterger() + ",\n"
				+ "\tcityID:" + super.getCityID() + ",\n"
				+ "\tnameCity: \"" + super.getNameCity() + "\",\n"
				+ "\tdistrictID:" + super.getDistrictID() + ",\n"
				+ "\tnameDistrict: \"" + super.getNameDistrict() + "\",\n"
				+ "\trank:" + super.getRank() + ",\n"
				+ "\tpopulation: \"" + super.getPopulation() + "\"\n"
				+ "}";
	}
	public String toJSON(String nameCommune, String communeID) {
		return "{\n\t\"nameCommune\": \"" + nameCommune + "\",\n"
				+ "\t\"communeID\": " + communeID + "\n"
				+ "}";
	}
}
