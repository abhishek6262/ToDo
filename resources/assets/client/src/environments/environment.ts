// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://todo.da-manager.co.uk/api',               // The route of the API location to fetch details from.
  oauthUrl: 'http://todo.da-manager.co.uk/oauth',           // The route of the Authentication provider to authenticate user from.
  client_id: 2,                                             // The ID of the client that will perform requests from the APIs.
  client_secret: 'VgzTL5LbcoHwGeJ6H7FIOM5mUWYmrk80El3j3GtZ' // The secret key of the client that will perform requests from the APIs.
};
