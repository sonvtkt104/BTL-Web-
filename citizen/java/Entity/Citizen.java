package Entity;

public class Citizen extends Person {
	private String dob;
	private String gender;
	private String ethnicGroup;
	private String nation;
	private String address;
	private int villageID;
	private String time;
	
	public String getDob() {
		return dob;
	}


	public void setDob(String dob) {
		this.dob = dob;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getEthnicGroup() {
		return ethnicGroup;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public void setEthnicGroup(String ethnicGroup) {
		this.ethnicGroup = ethnicGroup;
	}


	public String getNation() {
		return nation;
	}


	public void setNation(String nation) {
		this.nation = nation;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}

	public int getVillageID() {
		return villageID;
	}


	public void setVillageID(int villageID) {
		this.villageID = villageID;
	}


	public Citizen(String ordinal, String name, String numberPhone, String numberID, String dob, String gender, String ethnicGroup, 
					String nation, String address, int villageID, String time) {
		super(ordinal, name, numberPhone, numberID);
		this.dob = dob;
		this.gender = gender;
		this.ethnicGroup = ethnicGroup;
		this.nation = nation;
		this.address = address;
		this.villageID = villageID;
		this.time = time;
	}

	public Citizen(String ordinal, String name, String numberPhone, String numberID) {
		super(ordinal, name, numberPhone, numberID);
	}
	

	@Override
	public int hashCode() {
		return Integer.parseInt(ordinal);
	}


	@Override
	public boolean equals(Object obj) {
		return obj instanceof Citizen ? ((Citizen) obj).toJSON().equals(this.toJSON()) : (false);
	}


	public String toJSON() {
		return "\n{\n\t\"ordinal\": " + super.getOrdinal() + ",\n"
				+ "\t\"name\": \"" + super.getName() + "\",\n"
				+ "\t\"dob\": \"" + dob + "\",\n"
				+ "\t\"gender\": \"" + gender + "\",\n"
				+ "\t\"ethnicGroup\": \"" + ethnicGroup + "\",\n"
				+ "\t\"numberPhone\": \"" + super.getNumberPhone() + "\",\n"
				+ "\t\"nation\": \"" + nation + "\",\n"
				+ "\t\"address\": \"" + address + "\",\n"
				+ "\t\"time\": \"" + time + "\",\n"
				+ "\t\"villageID\": " + villageID + ",\n"
				+ "\t\"numberID\": \"" + super.getNumberID() + "\"\n"
				+ "}";
	}
}
