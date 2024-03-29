package nl.hu.v1wac.IPASS.webservices;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import nl.hu.v1wac.IPASS.webservices.Interimmer;
import nl.hu.v1wac.IPASS.webservices.ServiceProvider;
import nl.hu.v1wac.IPASS.webservices.DataService;

@Path("/data")
public class Connection {
	DataService provider = ServiceProvider.getDataService();
	
	@PUT
	@Path("/zoek/{werkvlak}")
	@RolesAllowed({"Partner"})
	@Produces("application/json")
	public String zoek(@PathParam("werkvlak") String werkvlak, @FormParam("voornaam") String vn, @FormParam("achternaam") String an, @FormParam("geboortedatum") String datum, @FormParam("woonplaats") String woon, @FormParam("postcode") String post, @FormParam("email") String email, @FormParam("linkedinLink") String link, @FormParam("minimumloon") double miniLoon, @FormParam("telefoonnummer") String tel){
		String lin = null;
		List<Interimmer> all = provider.getAllInterimmers();
		List<Interimmer> zoekende = new ArrayList<Interimmer>();
		JsonArrayBuilder interimmer = Json.createArrayBuilder();
		for(Interimmer i: all){
			if(i.getNaam().toLowerCase().contains(vn.toLowerCase()) || vn.equals("")){
				if(i.getAchternaam().toLowerCase().contains(an.toLowerCase()) || an.equals("")){
					if(i.getWoonplaats().toLowerCase().contains(woon.toLowerCase()) || woon.equals("")){
						if(i.getPostcode().toLowerCase().contains(post.toLowerCase()) || post.equals("")){
							if(i.getEmail().toLowerCase().contains(email.toLowerCase()) || email.equals("")){
								if(i.getMinimumloon() <= miniLoon || miniLoon == 0.0){
									if(String.valueOf(i.getTelefoonnummer()).contains(tel))
									if(werkvlak.equals("0")){
										zoekende.add(i);
									}else{
									String[] werk = werkvlak.split(",");
									for(String w : werk){
										if(i.getGewildeWerkvlakken().contains(w) || i.getVoorgaandeWerkvlakken().contains(w)){
											zoekende.add(i);
										}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		for(Interimmer i : zoekende){
			if(i.getLink() == null){
				lin = "";
			}else{
				lin = i.getLink();
			}
			JsonObjectBuilder alleInterimmer = Json.createObjectBuilder();
			alleInterimmer.add("voornaam", i.getNaam());
			alleInterimmer.add("achternaam", i.getAchternaam());
			alleInterimmer.add("woonplaats", i.getWoonplaats());
			alleInterimmer.add("postcode", i.getPostcode());
			alleInterimmer.add("gewWerkvlakken", i.getGewildeWerkvlakken());
			alleInterimmer.add("voorWerkvlakken", i.getVoorgaandeWerkvlakken());
			alleInterimmer.add("email", i.getEmail());
			alleInterimmer.add("linkedin", lin);
			alleInterimmer.add("minimumloon", i.getMinimumloon());
			alleInterimmer.add("telefoon", i.getTelefoonnummer());
			alleInterimmer.add("id", i.getID());
			
			interimmer.add(alleInterimmer);
			alleInterimmer = null;
		}
		
		JsonArray array = interimmer.build();
		interimmer = null;
		return array.toString();
	}
		
	@POST
	@Produces("application/json")
	public Response createInterimmer(@FormParam("username") String gn, @FormParam("password") String ww, @FormParam("voornaam") String vn, @FormParam("achternaam") String an, @FormParam("geboortedatum") String datum, @FormParam("woonplaats") String woon, @FormParam("postcode") String post, @FormParam("email") String email, @FormParam("linkedinLink") String link, @FormParam("minimumloon") double miniLoon, @FormParam("telefoonnummer") int tel) {
	Interimmer newInterimmer = new Interimmer(0, vn, an, miniLoon, null, null, datum, woon, post, email, tel, link);
	provider.saveInterimmer(newInterimmer, ww, gn);
	return Response.ok().build();
	}
	
	@POST
	@Path("/geb")
	@Produces("application/json")
	public String gebruikersnaamOk(@FormParam("username") String gn){
		String result = provider.getGebruikersnaam(gn);
		return result;
	}
	
	@POST
	@Path("/idRole")
	@Produces("application/json")
	public String getIdRole(@FormParam("username") String gn, @FormParam("password") String ww){
		ArrayList<String> ik = provider.getIdRole(gn, ww);
		JsonObjectBuilder inter = Json.createObjectBuilder();
		inter.add("id", ik.get(0));
		inter.add("role", ik.get(1));
		return inter.build().toString();
	}
	
	@GET
	@Path("/loggedin")
	@RolesAllowed({"Interimmer", "admin", "Partner"})
	@Produces("application/json")
	public Response loggedin() {
		return Response.ok().build();
	}
	
	@GET
	@Path("/vacatures/{id}/{role}/{yn}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public String getVacatures(@PathParam("id") int id, @PathParam("role") String role, @PathParam("yn") String yn){
		List<Vacature> all = provider.getAllVacatures(id, role, yn);
		JsonArrayBuilder vacatures = Json.createArrayBuilder();
		for(Vacature v : all){
			Interimmer inte = provider.getInterimmer(v.getInterimmerId());
			JsonObjectBuilder alleVacatures = Json.createObjectBuilder();
			if(yn.equals("IS NOT NULL")){
				alleVacatures.add("intVoornaam", inte.getNaam());
				alleVacatures.add("intAchternaam", inte.getAchternaam());
			}
			alleVacatures.add("bedrijf", v.getBedrijf());
			alleVacatures.add("plaats", v.getPlaats());
			alleVacatures.add("postcode", v.getPostcode());
			alleVacatures.add("id", v.getId());
			alleVacatures.add("werkvlakken", v.getWerkvlakken().toString());
			alleVacatures.add("functie", v.getFunctie());
			
			vacatures.add(alleVacatures);
			alleVacatures = null;
		}
		
		JsonArray array = vacatures.build();
		vacatures = null;
		return array.toString();
	}
	
	@GET
	@Path("/vacature/{id}/{role}/{vacID}/{yn}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public String getVacature(@PathParam("id") int id, @PathParam("role") String role, @PathParam("vacID") int vacID, @PathParam("yn") String yn){
		JsonObjectBuilder vac = Json.createObjectBuilder();
		Vacature v = provider.getVacature(id, role, vacID);
		String com = provider.getCommunicatie(id, role, vacID);
		String[] coms = com.split(";,;");
		String reactie = "";
		String uitleg = "";
		if(coms[1].equals("0")){
			uitleg = coms[0];
		}
		if(coms[1].equals("1")){
			reactie = coms[0];
		}
		if(coms[1].equals("2")){
			uitleg = coms[0];
			reactie = coms[2];
		}
		Partner par = provider.getPartner(v.getPartnerId());
		Interimmer inte = provider.getInterimmer(v.getInterimmerId());
			vac.add("bedrijf", v.getBedrijf());
			vac.add("plaats", v.getPlaats());
			vac.add("postcode", v.getPostcode());
			vac.add("id", v.getId());
			vac.add("werkvlakken", v.getWerkvlakken().toString());
			vac.add("functie", v.getFunctie());
			vac.add("reactie", reactie);
			vac.add("uitleg", uitleg);
			vac.add("parVoornaam", par.getVoornaam());
			vac.add("parAchternaam", par.getAchternaam());
			if(yn.equals("IS NOT NULL")){
				vac.add("intVoornaam", inte.getNaam());
				vac.add("intAchternaam", inte.getAchternaam());
			}
		return vac.build().toString();
	}
	
	@PUT
	@Path("/reactie/{id}/{role}/{vacID}/{reactie}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public Response plaatsReactieUitleg(@PathParam("id") int id, @PathParam("role") String role, @PathParam("vacID") int vacID, @PathParam("reactie") String reactie){
		int result = provider.plaatsReactieUitleg(vacID, id, reactie, role);
		if(result == 0){
			return Response.status(Response.Status.NOT_FOUND).build();
		}else{
			return Response.ok().build();
		}
	}
	
	@POST
	@Path("/interimmer/{id}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public String getInterimmerPartner(@PathParam("id") int id){
		JsonObjectBuilder vac = Json.createObjectBuilder();
		Interimmer i = provider.getInterimmer(id);
		String link;
		if(i.getLink() == null){
			link = "";
		}else{
			link = i.getLink();
		}
			vac.add("achternaam", i.getAchternaam());
			vac.add("voornaam", i.getNaam());
			vac.add("geboortedatum", i.getGeboortedatum());
			vac.add("woonplaats", i.getWoonplaats());
			vac.add("postcode", i.getPostcode());
			vac.add("email", i.getEmail());
			vac.add("link", link);
			vac.add("minimumloon", i.getMinimumloon());
			vac.add("telefoonnummer", i.getTelefoonnummer());
			vac.add("gewildeWerkvlakken", i.getGewildeWerkvlakken().toString());
			vac.add("voorgaandeWerkvlakken", i.getVoorgaandeWerkvlakken().toString());
			
		return vac.build().toString();
	}
	
	@POST
	@Path("/interimmer/update/{id}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public Response updateInterimmer(@FormParam("voornaam") String vn, @FormParam("achternaam") String an, @FormParam("geboortedatum") String datum, @FormParam("woonplaats") String woon, @FormParam("postcode") String post, @FormParam("email") String email, @FormParam("linkedinLink") String link, @FormParam("minimumloon") double miniLoon, @FormParam("telefoonnummer") int tel, @PathParam("id") int id) {
	Interimmer newInterimmer = new Interimmer(id, vn, an, miniLoon, null, null, datum, woon, post, email, tel, link);
	int result = provider.updateInterimmer(id, newInterimmer);
	if(result == 0){
		return Response.status(Response.Status.NOT_FOUND).build();
	}else{
		return Response.ok().build();
	}
	}
	
	@POST
	@Path("/werkvlakken/{soort}/{id}/{data}")
	@RolesAllowed({"Interimmer", "Partner"})
	@Produces("application/json")
	public Response plaatsWerkvlakken(@PathParam("soort") String waar, @PathParam("id") int id, @PathParam("data") String werk) {
	System.out.println(werk);
	int result = provider.plaatsWerkvlakken(id, waar, werk);
	if(result == 0){
		return Response.status(Response.Status.NOT_FOUND).build();
	}else{
		return Response.ok().build();
	}
	}
	
	@POST
	@Path("/saveVac/{id}/{werkvlak}")
	@RolesAllowed({"Partner"})
	@Produces("application/json")
	public Response saveVacature(@PathParam("id") int id,  @FormParam("bedrijf") String b, @PathParam("werkvlak") String werkvlakken, @FormParam("plaats") String p, @FormParam("postcode") String code, @FormParam("functie") String f){
		Vacature v = new Vacature(code, p, b, werkvlakken, 0, f, id, 0);
		provider.saveVacature(id, v);
		return Response.ok().build();
	}

	@POST
	@Path("/saveVacUitleg/{id}/{werkvlak}/{intID}/{uitleg}/{vacID}")
	@RolesAllowed({"Partner"})
	@Produces("application/json")
	public Response saveVacatureUitleg(@PathParam("id") int id, @PathParam("intID") int intID, @PathParam("uitleg") String uitleg, @PathParam("werkvlak") String werkvlakken, @PathParam("vacID") int vacID){
		provider.saveVacatureUitleg(id, vacID, intID, uitleg);
		return Response.ok().build();
	}
	
}
