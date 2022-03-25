import dotenv from "dotenv";
dotenv.config();
const MONGO_DB = process.env.MONGOURL;

export default {
  fileSystem: {
    carritosPath: "fs/carritos.json",
    productosPath: "fs/productos.json",
  },
  mongodb: {
    conexion: MONGO_DB,
  },
  firebase: {
    type: "service_account",
    project_id: "basefirebase-96001",
    private_key_id: "ced11091118447e6dc3ae3d434286982bd4b2965",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxi3Kwdr5L102Z\n0FNqCWdFeSzTrQKpzvC6Z271eD7kSuA5tlJuMICBRgtgAqHidjOBBXsWTpW/g6wU\npG4cyc74ie1UZs6yw/dpt6czpcc138ElpQYsEI4cFGqwy4IzoW5ccC67IwSJv3za\nmhNTPMWDQ5oChUxyCVR2aLfrF5jpONLRvLug273uJ+dbxnafcGvsncF/cXZXJKIO\nAyLbHzp0CWoMMfem6kQprzP6nxwLjFJSQVG8ZCjkVF8iXdEKmjOhkg3psx2abCrI\n7/1FQAxxShL4wwcIGHls0awMivuQ1RbEhgOA8QXN2Bwtag6XmBbw2KInjKgKozeP\nMEGa3ENVAgMBAAECggEAKXLov5G5M3N8RmCAWM0BMxLrCC/n40TQpnPnT59W720b\nk92guODR31w+45c5u+jkdUaWScrm4uMWlWsd2dKzYwqwQXgO4WUmqaOagVA+hbFL\nIkK4gikLRDrv/X5FU1Bot2PpRP8T3CS8PTyjLleNtOtfVR9RjX3oHgysg1Hq/OdH\noYTnip6R93ni6dxIgkdGrCFPNlBaRKZMIsgXRcdjYlYL+U4BWdDc/Cdm69DFIPBw\nAEmWFCJIH0SGmGeKhMM5gmmvjENVVzPJNlcIS2mPR3RuuiWc+323AR3AT5x2cXii\nZ0i2rbc0LTusgv8kNyAGK54FaSsswABxmU02IgbhgQKBgQDY11+IlD1JtGpS4504\nqAgkecGvt4v7BgxVW+LHVmojRefLIXZzFJJKUYqqsi/UXEaKSzBnDjJNFAgE3QJv\nLTbU/Y96V2C1tnh1P8glFEKznFtQZurETrJIYDiE2a8zzdgdT273xZ7iikqKIXgy\nSJIWlCSCIVLN4a2tTOKtwAeXyQKBgQDRm2JVyv58bGhXKt9hdl+hJGuTBntBzwtN\nafle96U1iWW3BZq+3niF6GZXkYZ8/20ejbLo+nyc8TdOV5ez2L2vQvpPvaSiNZXe\ndc8wBu2BxljfGtdFcyV/TscKuz67jGPpdoKiJTyOJAhJlfTRj/CQEBFWt9fnfhJb\n+4NUjbZtLQKBgQC1Otw3lF3c2hL7EA15KscTZUfCCs/Nj3KDbPaOz+SJcoWWOnN7\nHzhdMOWKYL6k6DJ0pv7fQvg7f4BsQCMmtE1dmkZuY9UKSmVG6XXnt5U/9HBFNJ8G\nTxemcfUK470QuPvlE1yVbO+sOxSteeexbwHaKRqSQDOqqvGzI81YlmRCMQKBgF2t\nnnNNeBNPuApNJOzAJNk2F8Xr/aZZzGla1ZK2B2Y38/eqT5DCiQb/6M12Qq8W0UP4\nfF9Xo93YiKlAyJIeahgsTQbacPv2CvcTm/eRAREg/pMnwdJONhIBuT94k/7qLbUn\nvBaPodK9E98fX/1Q4WjhZX5mR940ICxv6jAd7cw5AoGAa79mWXw6T1Hbfhec8iGj\nEQuzuUu7Q3GKaTuKXWod3hXrVVKv2r3MKIKZGVchoVlnMCRoARVSSkGUkz1nS8jJ\nAWfKhp15cvgFAWqXAdXXpBZ79ubBxy72mvfYRrJX1RhpphsUAOxWZKzdHLvuEi2A\nI86CGm2NZtNywP3Q58NpMNM=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-qoxk8@basefirebase-96001.iam.gserviceaccount.com",
    client_id: "105552644577487784274",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qoxk8%40basefirebase-96001.iam.gserviceaccount.com",
  },
};
