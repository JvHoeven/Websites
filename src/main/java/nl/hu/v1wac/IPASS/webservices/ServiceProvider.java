package nl.hu.v1wac.IPASS.webservices;

import nl.hu.v1wac.IPASS.webservices.DataService;

public class ServiceProvider {
	private static DataService DataService = new DataService();

	public static DataService getDataService() {
		return DataService;
	}
}