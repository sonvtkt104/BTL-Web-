package Entity;

import Model.ModelCadres;

public class Cadres extends Person {
	private String username;
	private String password;
	private String email;
	private String time;
	private boolean status;
	private String rank;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getRank() {
		return rank;
	}

	public void setRank(String rank) {
		this.rank = rank;
	}

	public Cadres(String ordinal, String name, String username, String password, String email, String numberPhone,
			String time, boolean status, String rank, String numberID) {
		super(ordinal, name, numberPhone, numberID);
		this.username = username;
		this.password = password;
		this.email = email;
		this.time = time;
		this.status = status;
		this.rank = rank;
	}
	

	@Override
	public int hashCode() {
//		return (super.getOrdinal() + username + password).hashCode();
		return ordinal.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof Cadres ? ((Cadres) obj).toJSON().equals(this.toJSON()) : (false);
	}

	@Override
	public String toString() {
		return "Cadres [ordinal=" + super.getOrdinal() + ", name=" + super.getName() + ", username=" + username + ", password=" + password
				+ ", email=" + email + ", numberPhone=" + super.getNumberPhone()  + ", time=" + time
				+ ", status=" + status + ", rank=" + rank + ", numberID=" + super.getNumberID() + "]";
	}
	
	public String toJSON() {
		return "{\n\t\"ordinal\": " + super.getOrdinal() + ",\n"
				+ "\t\"name\": \"" + super.getName() + "\",\n"
				+ "\t\"username\": \"" + username + "\",\n"
				+ "\t\"password\": \"" + password + "\",\n"
				+ "\t\"email\": \"" + email + "\",\n"
				+ "\t\"numberPhone\": \"" + super.getNumberPhone() + "\",\n"
				+ "\t\"time\": \"" + time + "\",\n"
				+ "\t\"status\": " + status + ",\n"
				+ "\t\"rank\": \"" + rank + "\",\n"
				+ "\t\"manageArea\": \"" + ModelCadres.convertRankToAddress(username) + "\",\n"
				+ "\t\"numberID\": " + super.getNumberID() + "\n"
				+ "}";
	}
	
	
}
