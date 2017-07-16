package nl.hu.v1wac.IPASS.webservices;


public class Interimmer {

	private String voornaam;
	private String achternaam;
	private double minimumloon;
	private String voorgaandeWerkvlakken;
	private String gewildeWerkvlakken;
	private String geboortedatum;
	private String woonplaats;
	private String postcode;
	private String email;
	private int telefoonnummer;
	private String linkedinLink;
	private int interimmer_id;
	
	public Interimmer(int ID, String vn, String an, double miniLoon, String voorgaandeWerkvlakken2, String gewildeWerkvlakken2, String geb, String woon, String post, String mail, int tel, String link){
		interimmer_id = ID;
		voornaam = vn;
		achternaam= an;
		minimumloon = miniLoon;
		voorgaandeWerkvlakken = voorgaandeWerkvlakken2;
		gewildeWerkvlakken = gewildeWerkvlakken2;
		geboortedatum = geb;
		woonplaats= woon;
		postcode = post;
		email = mail;
		telefoonnummer= tel;
		linkedinLink = link;
	}
	
	public String getNaam(){
		return voornaam;
	}
	
	public String getAchternaam(){
		return achternaam;
	}
	
	public double getMinimumloon(){
		return minimumloon;
	}
	
	public String getGewildeWerkvlakken(){
		return gewildeWerkvlakken;
	}
	
	public String getVoorgaandeWerkvlakken(){
		return voorgaandeWerkvlakken;
	}
	
	public String getGeboortedatum(){
		return geboortedatum;
	}
	
	public String getWoonplaats(){
		return woonplaats;
	}
	
	public String getPostcode(){
		return postcode;
	}
	
	public String getEmail(){
		return email;
	}
	
	public int getTelefoonnummer(){
		return telefoonnummer;
	}
	
	public String getLink(){
		return linkedinLink;
	}
	
	public int getID(){
		return interimmer_id;
	}
}
