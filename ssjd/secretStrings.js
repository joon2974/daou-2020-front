export const s3Config = {
  albumBucketName: "profile-storage-alyeodaou",
  bucketRegion: "ap-northeast-2",
  IdentityPoolId: "ap-northeast-2:6a91df99-a971-436f-8e9c-d8f9d608c92c",
};

export const jwtSalt = {
  salt: "ssjd_alyeodaou",
};

export const httpInfos = {
  resourceHost: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
};

export let generateCsrfToken = function () {
  function generateRandomString(length) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  return btoa(generateRandomString(32));
}