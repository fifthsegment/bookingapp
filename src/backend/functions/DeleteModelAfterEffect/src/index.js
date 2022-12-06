const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);
  const Query = sdk.Query;

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

 const {APPWRITE_FUNCTION_EVENT_DATA} = req.variables;
 const requestData = JSON.parse(APPWRITE_FUNCTION_EVENT_DATA);

 const related = await database.listDocuments("638a8005d4be3f624af3", "638a805f149df1f6e4e5", [Query.equal("modelId", requestData.$id)]);
 for (const document of related.documents) {
   await database.deleteDocument("638a8005d4be3f624af3", "638a805f149df1f6e4e5", document.$id)
 }
  res.json({
    rId: requestData.$id,
    variables: req.variables,
    data: requestData,
    related: related,
    areDevelopersAwesome: true,
  });
};