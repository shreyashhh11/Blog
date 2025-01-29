import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount({email,passward,name}) {
        // eslint-disable-next-line no-useless-catch
        try {
            const userAccount = await this.account.create(ID.unique(),email,passward,name);
            if(userAccount){
                // call another method
                this.login({email,passward});
            }else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email,passward}) {
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createSession(email,passward);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){ 
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: getCurrentUser :: error",error);  
        }
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);   
        }
    }

}

const authService = new AuthService();

export default authService