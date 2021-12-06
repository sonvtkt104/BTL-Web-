package Entity;

public class VillageB1 extends CommuneA3 {
	private String nameVillage;
	private int villageID;
	public String getNameVillage() {
		return nameVillage;
	}
	public void setNameVillage(String nameVillage) {
		this.nameVillage = nameVillage;
	}
	public int getVillageID() {
		return villageID;
	}
	public void setVillageID(int villageID) {
		this.villageID = villageID;
	}
	public VillageB1(int ordinal, String nameVillage, int villageID, String communeID, int districtID, int cityID, String rank,
							int population) {
		super(null, communeID, cityID, districtID, rank);
		this.nameVillage = nameVillage;
		this.villageID = villageID;
		super.setPopulation(population);
		super.setOrdinal(ordinal);
	}
	
	@Override
	public int hashCode() {
		return villageID;
	}
	@Override
	public boolean equals(Object obj) {
		return (obj instanceof VillageB1) ? (((VillageB1) obj).toJSON().equals(this.toJSON())) : false;
	}
	@Override
	public String toString() {
		return "VillageB1 [ordinal=" + super.getOrdinal() + ", nameVillage=" + nameVillage + ", villageID=" + 
					villageID + ",rank= "+ super.getRank() +",communeID="+ super.getCommuneIDInterger() +",districtID="
					+ super.getDistrictID() + ",cityID="+ super.getCityID() +", population="+ super.getPopulation() +"]";
	}
	@Override
	public String toJSON() {
		return "{\n\t\"ordinal\": " + super.getOrdinal() + ",\n"
				+ "\t\"nameVillage\": \"" + nameVillage + "\",\n"
				+ "\t\"villageID\": " + villageID + ",\n"
				+ "\t\"rank\": \"" + super.getRank() + "\",\n"
				+ "\t\"communeID\": " + super.getCommuneIDInterger() + ",\n"
				+ "\t\"districtID\": " + super.getDistrictID() + ",\n"
				+ "\t\"cityID\": " + super.getCityID() + ",\n"
				+ "\t\"population\": \"" + super.getPopulation() + "\"\n"
				+ "}";
	}
}
