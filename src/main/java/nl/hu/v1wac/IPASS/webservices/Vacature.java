package nl.hu.v1wac.IPASS.webservices;


public class Vacature {
	private String postcode;
	private String plaats;
	private String bedrijf;
	private String werkvlakken;
	private int vacature_id;
	private String functie;
	private int partner_id;
	private int interimmer_id;
	
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
