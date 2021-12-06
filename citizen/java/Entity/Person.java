package Entity;

import Model.DAO;

public abstract class Person {
	protected String ordinal;
	protected String name;
	protected String numberPhone;
	protected String numberID;
	
	public int getOrdinalInt() {
		return Integer.valueOf(ordinal);
	}
	
	public String getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(String ordinal) {
		this.ordinal = ordinal;
	}

	public String getName() {
		return name;
	}

	public String getNameNotUnisigned() {
		this.setName(DAO.convertAccentToUnisigned(this.getName()));
		this.setName(this.getName().replaceAll("Đ", "D"));
		
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getNumberPhone() {
		return numberPhone;
	}

	public void setNumberPhone(String numberPhone) {
		this.numberPhone = numberPhone;
	}

	public String getNumberID() {
		return numberID;
	}

	public void setNumberID(String numberID) {
		this.numberID = numberID;
	}

	public Person(String ordinal, String name, String numberPhone, String numberID) {
		this.ordinal = ordinal;
		this.name = name;
		this.numberPhone = numberPhone;
		this.numberID = numberID;
	}

	@Override
	public int hashCode() {
		return numberID != null ? (numberID+name+ordinal).hashCode() : (name+ordinal).hashCode();
	}

	@Override
	public String toString() {
		return "Person [ordinal=" + ordinal + ", name=" + name + ", numberPhone=" + numberPhone + ", numberID="
				+ numberID + "]";
	}
	
	public String toJSON() {
		return "{\n\tordinal: " + ordinal + ",\n"
				+ "\tname: \"" + name + "\",\n"
				+ "\tnumberPhone: " + numberPhone + ",\n"
				+ "\tnumberID: \"" + numberID + "\"\n"
				+ "}";
	}
	
}
