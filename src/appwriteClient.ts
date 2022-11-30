import { Appwrite, Account, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://www.bookableapp.co/v1";
const APPWRITE_PROJECT = "638658731411a7b44e94";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);
// for file upload
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };