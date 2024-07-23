import config from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) // Your API Endpoint
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      return await this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error:: Get Current User Error::" + error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logged Out Successfully");
    } catch (error) {
      console.log("Error:: Get Logging Out Error::" + error);
    }
  }
}

const authService = new AuthService();

export default authService;
