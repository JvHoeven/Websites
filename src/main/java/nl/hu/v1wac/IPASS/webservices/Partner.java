package nl.hu.v1wac.IPASS.webservices;

public class Partner {
	int partnerID;
	String voornaam;
	String achternaam;
	String geboortedatum;
	String woonplaats;
	String email;
	int telefoonnummer;
	
	public Partner(int ID, String vn, String an, String geb, String plaats, String mail, int tel){
		partnerID = ID;
		voornaam = vn;
		achternaam = an;
		geboortedatum = geb;
		woonplaats = plaats;
		email = mail;
		telefoonnummer = tel;
	}
	
	public int getID(){
		return partnerID;
	}
	
	public String getVoornaam(){
		return voornaam;
	}
	
	public String getAchternaam(){
		return achternaam;
	}
	
	public String getGeboortedatum(){
		return geboortedatum;
	}
	
	public String getWoonplaats(){
		return woonplaats;
	}
	
	public String getEmail(){
		return email;
	}
	
	public int getTelefoonnummer(){
		return telefoonnummer;
	}
}
