package Entity;

import Model.ModelCadres;

public class Cadres {
	private int ordinal;
	private String username;
	private String password;
	private boolean status;
	private String numberID;
	private String rank;
	private String accessTime;
	private String createTime;

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getAccessTime() {
		return accessTime;
	}
	public void setAccessTime(String accessTime) {
		this.accessTime = accessTime;
	}

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
	
	public String getManageArea() {
		return this.getRank().equals("A1") ? "cả nước" : ModelCadres.convertNumberIDToAddress(this);
	}

	public int getOrdinal() {
		return ordinal;
	}

	public void setOrdinal(int ordinal) {
		this.ordinal = ordinal;
	}

	public String getNumberID() {
		return numberID;
	}

	public void setNumberID(String numberID) {
		this.numberID = numberID;
	}

	public Cadres(int ordinal, String username, String password, boolean status, String numberID, String rank,
			String createTime, String accessTime) {
		this.ordinal = ordinal;
		this.username = username;
		this.password = password;
		this.status = status;
		this.numberID = numberID;
		this.rank = rank;
		this.accessTime = accessTime;
		this.createTime = createTime;
	}

	@Override
	public int hashCode() {
//		return (super.getOrdinal() + username + password).hashCode();
		return ordinal;
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof Cadres && ((Cadres) obj).toJSON().equals(this.toJSON());
	}
	
	@Override
	public String toString() {
		return "Cadres [ordinal=" + ordinal + ", username=" + username + ", password=" + password + ", status=" + status
				+ ", numberID=" + numberID + ", rank=" + rank + ", accessTime=" + accessTime + "]";
	}

	public String toJSON() {
		String stt = this.status ? "Kích hoạt" : "Chưa kích hoạt";
		return "{\n\t\"ordinal\": " + ordinal + ",\n"
				+ "\t\"username\": \"" + username + "\",\n"
				+ "\t\"password\": \"" + password + "\",\n"
				+ "\t\"status\": \"" + stt + "\",\n"
				+ "\t\"rank\": \"" + rank + "\",\n"
				+ "\t\"numberID\": \"" + numberID + "\",\n"
				+ "\t\"accesstime\": \"" + accessTime + "\",\n"
				+ "\t\"createtime\": \"" + createTime + "\",\n"
				+ "\t\"managearea\": \"" + this.getManageArea() + "\"\n"
				+ "}";
	}
	
	
}
