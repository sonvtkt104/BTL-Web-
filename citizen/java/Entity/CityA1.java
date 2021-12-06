package Entity;

public class CityA1 {
	private int ordinal;
	private String nameCity;
	private int cityID;
	private int population;
	private String rank;
	
	public int getOrdinal() {
		return ordinal;
	}
	
	public void setOrdinal(int ordinal) {
		this.ordinal = ordinal;
	}
	
	public String getNameCity() {
		return nameCity;
	}
	
	public void setNameCity(String name) {
		this.nameCity = name;
	}
	
	public int getCityID() {
		return cityID;
	}
	
	public void setCityID(int cityID) {
		this.cityID = cityID;
	}
	
	public int getPopulation() {
		return population;
	}
	
	public void setPopulation(int population) {
		this.population = population;
	}
	
	public String getRank() {
		return rank;
	}
	
	public void setRank(String rank) {
		this.rank = rank;
	}
	
	public CityA1(int ordinal, String name, int cityID,String rank, int population) {
		this.ordinal = ordinal;
		this.nameCity = name;
		this.cityID = cityID;
		this.population = population;
		this.rank = rank;
	}
	
	public CityA1(int ordinal, int cityID, int population, String rank) {
		this.ordinal = ordinal;
		this.cityID = cityID;
		this.population = population;
		this.rank = rank;
	}
	
	public CityA1(String name, int cityID, String rank) {
		this.nameCity = name;
		this.cityID = cityID;
		this.rank = rank;
	}
	
	public CityA1() {}
	
	@Override
	public int hashCode() {
		return cityID;
	}
	
	@Override
	public boolean equals(Object obj) {
		return (obj instanceof CityA1) ? (((CityA1) obj).toJSON().equals(this.toJSON())) : false; 
	}
	
	@Override
	public String toString() {
		return "CityA1 [ordinal=" + ordinal + ", nameCity=" + nameCity + ", cityID=" + cityID + ", population="
				+ population + ", rank=" + rank + "]";
	}
	
	public String toJSON() {
		return "{\n\t\"ordinal\": " + ordinal + ",\n"
				+ "\t\"name\": \"" + nameCity + "\",\n"
				+ "\t\"cityID\": " + cityID + ",\n"
				+ "\t\"rank\": \"" + rank + "\",\n"
				+ "\t\"population\": \"" + population + "\"\n"
				+ "}";
	}
}
