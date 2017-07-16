package nl.hu.v1wac.IPASS.webservices;

import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.IPASS.persistence.databaseDAO;
import nl.hu.v1wac.IPASS.webservices.Interimmer;

public class DataService {
	private databaseDAO DataBaseDAO = new databaseDAO(); 
	
	public List<Interimmer> getAllInterimmers() {
		return DataBaseDAO.findAll();
	}
	
	public Interimmer saveInterimmer(Interimmer Interimmer, String ww, String geb) {
		return DataBaseDAO.save(Interimmer, ww, geb);
	}
	
	public String getGebruikersnaam(String gn){
		return DataBaseDAO.gebruikersnaam(gn);
	}
	
	public ArrayList<String> getIdRole(String gn, String ww){
		return DataBaseDAO.getIdRole(gn, ww);
	}

	public List<Vacature> getAllVacatures(int id, String role, String yn) {
		return DataBaseDAO.getAllVactures(id, role, yn);
	}
	
	public Vacature getVacature(int id, String role, int vacID){
		return DataBaseDAO.getVacture(id, role, vacID);
	}
	
	public String getCommunicatie(int id, String role, int vacID){
		return DataBaseDAO.getCommunicatie(id, role, vacID);
	}

	public Partner getPartner(int parID) {
		return DataBaseDAO.getPartner(parID);
	}
	
	public int plaatsReactieUitleg(int vacID, int id, String reactie, String role){
		return DataBaseDAO.plaatsReactieUitleg(vacID, id, reactie, role);
	}
	
	public Interimmer getInterimmer( int ID){
		return DataBaseDAO.getInterimmer(ID);
	}
	
	public int updateInterimmer(int ID, Interimmer i){
		return DataBaseDAO.updateInterimmer(ID, i);
	}
	
	public int plaatsWerkvlakken(int id, String waar, String werkvlakken){
		return DataBaseDAO.plaatsWerkvlakken(werkvlakken, id, waar);
	}
	
	public Vacature saveVacature(int id, Vacature v){
		return DataBaseDAO.saveVacature(id, v);
	}
	
	public Vacature saveVacatureUitleg(int id, Vacature v, int intID, String uitleg){
		return DataBaseDAO.saveVacatureUitleg(id, v, intID, uitleg);
	}
}
