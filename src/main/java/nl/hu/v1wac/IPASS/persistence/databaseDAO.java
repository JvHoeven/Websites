package nl.hu.v1wac.IPASS.persistence;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import nl.hu.v1wac.IPASS.webservices.Interimmer;
import nl.hu.v1wac.IPASS.webservices.Partner;
import nl.hu.v1wac.IPASS.webservices.Vacature;
import nl.hu.v1wac.IPASS.persistence.BaseDAO;
		
public class databaseDAO extends BaseDAO{
	
	private Interimmer selectInterimmer(ResultSet dbResultSet) {
		Interimmer newInterimmer= new Interimmer(0, null, null, 0, null, null, null, null, null, null, 0, null);
			try {
				String voornaam = dbResultSet.getString("voornaam");
				String achternaam = dbResultSet.getString("achternaam");
				double minimumloon = dbResultSet.getDouble("minimumloon");
				String voorgaandeWerkvlakken = dbResultSet.getString("voorgaandeWerkvlakken");
				String gewildeWerkvlakken = dbResultSet.getString("gewildeWerkvlakken");
				String geboortedatum = dbResultSet.getString("geboortedatum");
				String woonplaats = dbResultSet.getString("woonplaats");
				String postcode = dbResultSet.getString("postcode");
				String email = dbResultSet.getString("email");
				int telefoonnummer = dbResultSet.getInt("telefoonnummer");
				String linkedinLink = dbResultSet.getString("linkedinLink");
				int id = dbResultSet.getInt("interimmer_id");
				
				newInterimmer = new Interimmer(id, voornaam, achternaam, minimumloon, voorgaandeWerkvlakken, gewildeWerkvlakken, geboortedatum, woonplaats, postcode, email, telefoonnummer, linkedinLink);
			}catch (SQLException sqle) { sqle.printStackTrace(); }
			return(newInterimmer);
}
	public Interimmer getInterimmer(int ID) {
		Interimmer result = new Interimmer(0, null, null, ID, null, null, null, null, null, null, ID, null);
		String query = "SELECT interimmer_id, voornaam, achternaam, geboortedatum, woonplaats, postcode, email, linkedinlink, minimumloon, telefoonnummer, gewildewerkvlakken, voorgaandewerkvlakken FROM interimmer WHERE interimmer_id=" + ID;
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				result = selectInterimmer(dbResultSet);
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return result;
	}
	
	public int updateInterimmer(int ID, Interimmer i) {
		int dbResultSet = 0;
		String voornaam = i.getNaam();
		String achternaam = i.getAchternaam();
		double minimumloon = i.getMinimumloon();
		String geboortedatum = i.getGeboortedatum();
		String woonplaats = i.getWoonplaats();
		String postcode = i.getPostcode();
		String email = i.getEmail();
		int telefoonnummer = i.getTelefoonnummer();
		String linkedinLink = i.getLink();
		String query = "UPDATE interimmer SET voornaam='"+ voornaam +"', achternaam='"+ achternaam +"', geboortedatum ='"+ geboortedatum +"', woonplaats ='"+ woonplaats +"', postcode='"+ postcode +"', email ='"+ email +"', linkedinlink ='"+ linkedinLink +"', minimumloon="+ minimumloon +", telefoonnummer="+ telefoonnummer +" WHERE interimmer_id=" + ID;
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			dbResultSet = stmt.executeUpdate(query);
			
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return dbResultSet;
	}
	
	
	public List<Interimmer> findAll() {
		List<Interimmer> resultsList = new ArrayList<Interimmer>();
		String query = "SELECT voornaam, achternaam, minimumloon, voorgaandeWerkvlakken, gewildeWerkvlakken, geboortedatum, woonplaats, postcode, email, telefoonnummer, linkedinLink FROM Interimmer";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				resultsList.add(selectInterimmer(dbResultSet));
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return resultsList;
	}
	
	public Interimmer save(Interimmer i, String ww, String geb){
		int interimmerID= 0;
		Interimmer result = null;
		String voornaam = i.getNaam();
		String achternaam = i.getAchternaam();
		double minimumloon = i.getMinimumloon();
		String geboortedatum = i.getGeboortedatum();
		String woonplaats = i.getWoonplaats();
		String postcode = i.getPostcode();
		String email = i.getEmail();
		int telefoonnummer = i.getTelefoonnummer();
		String linkedinLink = i.getLink();
		String query = "INSERT INTO interimmer (voornaam, achternaam, geboortedatum, woonplaats, postcode, email, linkedinlink, minimumloon, telefoonnummer, voorgaandewerkvlakken, gewildewerkvlakken) VALUES ('" + voornaam + "', '" + achternaam + "', '" + geboortedatum + "', '" + woonplaats + "', '" + postcode + "', '" + email + "', '" + linkedinLink + "', " + minimumloon + ", " + telefoonnummer + ", '{}', '{}')";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			stmt.executeUpdate(query);
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		String query2 = "SELECT interimmer_id FROM interimmer WHERE voornaam='" + voornaam + "' AND achternaam = '" + achternaam + "'";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query2);
			while (dbResultSet.next()) {
				interimmerID= dbResultSet.getInt("Interimmer_id");
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		String query3 = "INSERT INTO useraccount (username, password, role, interimmer_id) VALUES ('" + geb + "', '" + ww + "', 'Interimmer', '" + interimmerID + "')";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			stmt.executeUpdate(query3);
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return result;
	}
	
	public String gebruikersnaam(String gn){
		String query = "SELECT EXISTS(SELECT username FROM useraccount WHERE username='" + gn + "') AS exists";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			while (dbResultSet.next()) {
				if(dbResultSet.getBoolean("exists") == true){
					return "de gebruikersnaam is al in gebruik";
				}
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return null;
	}

	public ArrayList<String> getIdRole(String gn, String ww){
		String query = "SELECT interimmer_id, partner_id, role FROM useraccount WHERE username='" + gn + "' AND password='"+ ww +"'";
		ArrayList<String> result = new ArrayList<String>();
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			while (dbResultSet.next()) {
				int interimmerID= dbResultSet.getInt("interimmer_id");
				int partnerID= dbResultSet.getInt("partner_id");
				String role= dbResultSet.getString("role");
				if(role.equalsIgnoreCase("Partner")){
					result.add(Integer.toString(partnerID));
					result.add(role);
				}else{
					result.add(Integer.toString(interimmerID));
					result.add(role);
				}
			}
			
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return result;
	}

	public List<Vacature> getAllVactures(int id, String role, String yn) {
		List<Vacature> resultsList = new ArrayList<Vacature>();
		String query = "SELECT vacature_id, bedrijf, plaats, postcode, werkvlakken, functie, partner_id, interimmer_id FROM vacature WHERE " + role + "_id=" + id + "AND interimmer_id " + yn;
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				resultsList.add(selectVacature(dbResultSet));
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return resultsList;
	}
	
	private Vacature selectVacature(ResultSet dbResultSet) {
			try {
				String postcode = dbResultSet.getString("postcode");
				String plaats = dbResultSet.getString("plaats");
				String bedrijf = dbResultSet.getString("bedrijf");
				String werkvlakken = dbResultSet.getString("werkvlakken");
				int vacature_id = dbResultSet.getInt("vacature_id");
				String functie = dbResultSet.getString("functie");
				int partner_id = dbResultSet.getInt("partner_id");
				int interimmer_id = dbResultSet.getInt("interimmer_id");
				
				Vacature newVacature = new Vacature(postcode, plaats, bedrijf, werkvlakken, vacature_id, functie, partner_id, interimmer_id);
				return(newVacature);
			}catch (SQLException sqle) { sqle.printStackTrace(); }
			return(null);
	}
	
	public Vacature saveVacature(int id, Vacature v){
		String bedrijf = v.getBedrijf();
		String plaats = v.getPlaats();
		String postcode = v.getPostcode();
		String werkvlakken = v.getWerkvlakken();
		String functie = v.getFunctie();
		String query = "INSERT INTO vacature (partner_id, bedrijf, plaats, postcode, werkvlakken, functie) VALUES ("+id+", '"+bedrijf+"', '"+plaats+"', '"+postcode+"', '"+werkvlakken+"', '"+functie+"')";
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			stmt.executeUpdate(query);
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return null;
	}
	
	public Vacature getVacture(int id, String role, int vacID) {
		Vacature result = new Vacature(role, role, role, null, id, role, 0, 0);
		String query = "SELECT vacature_id, partner_id, bedrijf, plaats, postcode, werkvlakken, functie, interimmer_id FROM vacature WHERE " + role + "_id=" + id + " AND vacature_id=" + vacID;
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			
			while (dbResultSet.next()) {
				result = selectVacature(dbResultSet);
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return result;
	}
	
	public String getCommunicatie(int id, String role, int vacID) {
		String uitleg = null;
		String reactie = null;
		String query = "SELECT reactie, uitleg FROM communicatie WHERE " + role + "_id=" + id + " AND vacature_id=" + vacID;
		try (Connection con = super.getConnection()){
			Statement stmt = con.createStatement();
			ResultSet dbResultSet = stmt.executeQuery(query);
			while (dbResultSet.next()) {
				uitleg =  dbResultSet.getString("uitleg");
				reactie =  dbResultSet.getString("reactie");
			}
			
			if(reactie == null){
				return uitleg + ";,;0";
			}
			
			if(uitleg == null){
				return reactie + ";,;1";
			}
		} catch (SQLException sqle) { sqle.printStackTrace(); }
		return uitleg + ";,;2;,;" + reactie;
	}
	
	private Partner selectPartner(ResultSet dbResultSet) {
		try {
			String voornaam = dbResultSet.getString("voornaam");
			String achternaam = dbResultSet.getString("achternaam");
			String geboortedatum = dbResultSet.getString("geboortedatum");
			String woonplaats = dbResultSet.getString("woonplaats");
			int partner_id = dbResultSet.getInt("partner_id");
			String email = dbResultSet.getString("email");
			int telefoonnummer = dbResultSet.getInt("telefoonnummer");
			
			Partner newPartner = new Partner(partner_id, voornaam, achternaam, geboortedatum, woonplaats, email, telefoonnummer);
			return(newPartner);
		}catch (SQLException sqle) { sqle.printStackTrace(); }
		return(null);
}

public Partner getPartner(int parID) {
	Partner result = new Partner(0, null, null, null, null, null, 0);
	String query = "SELECT partner_id, voornaam, achternaam, geboortedatum, woonplaats, email, telefoonnummer FROM Partner WHERE partner_id=" + parID;
	try (Connection con = super.getConnection()){
		Statement stmt = con.createStatement();
		ResultSet dbResultSet = stmt.executeQuery(query);
		
		while (dbResultSet.next()) {
			result = selectPartner(dbResultSet);
		}
	} catch (SQLException sqle) { sqle.printStackTrace(); }
	return result;
}

public int plaatsReactieUitleg(int vacID, int id, String reactie, String role) {
	int dbResultSet = 0;
	String query = null;
	if(role.equalsIgnoreCase("Partner")){
		query = "UPDATE communicatie SET uitleg = '"+ reactie +"' WHERE vacature_id="+ vacID +" AND "+ role +"_id=" + id;
	}else{
		query = "UPDATE communicatie SET reactie = '"+ reactie +"' WHERE vacature_id="+ vacID +" AND "+ role +"_id=" + id;
	}
	try (Connection con = super.getConnection()){
		Statement stmt = con.createStatement();
		dbResultSet = stmt.executeUpdate(query);
		
	} catch (SQLException sqle) { sqle.printStackTrace(); }
	return dbResultSet;
}
public int plaatsWerkvlakken(String werkvlakken, int id, String waar) {
	int dbResultSet = 0;
	String query = "UPDATE interimmer SET "+ waar +"='"+ werkvlakken +"' WHERE Interimmer_id=" + id;
	try (Connection con = super.getConnection()){
		Statement stmt = con.createStatement();
		dbResultSet = stmt.executeUpdate(query);
		
	} catch (SQLException sqle) { sqle.printStackTrace(); }
	return dbResultSet;
}
	
}
