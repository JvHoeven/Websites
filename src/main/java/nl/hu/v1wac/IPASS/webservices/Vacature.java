package nl.hu.v1wac.IPASS.webservices;


public class Vacature {
	String postcode;
	String plaats;
	String bedrijf;
	String werkvlakken;
	int vacature_id;
	String functie;
	int partner_id;
	int interimmer_id;
	
	public Vacature(String post, String plaat, String bed, String werkvlak, int id, String fun, int pi, int ii){
		postcode = post;
		plaats = plaat;
		bedrijf = bed;
		werkvlakken = werkvlak;
		vacature_id = id;
		functie = fun;
		partner_id = pi;
		interimmer_id = ii;
	}
	
	public String getPostcode(){
		return postcode;
	}
	
	public String getPlaats(){
		return plaats;
	}
	
	public String getBedrijf(){
		return bedrijf;
	}
	
	public String getWerkvlakken(){
		return werkvlakken;
	}
	
	public int getId(){
		return vacature_id;
	}
	
	public String getFunctie(){
		return functie;
	}
	
	public int getPartnerId(){
		return partner_id;
	}
	
	public int getInterimmerId(){
		return interimmer_id;
	}
}
