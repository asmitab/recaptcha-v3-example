# recaptcha-v3-example
Simple example to integrate Google recaptcha v3
https://medium.com/@asmitak/google-recaptcha-v3-with-firebase-functions-a04657d893a9

# Initialize firebase

Create a new firebase project to test this example. [Docs](https://firebase.google.com/docs/web/setup)

```
firebase init
```

1. Select Functions and Hosting
2. Select existing project you created
3. Select Javascript
4. Select 'N' for all overwrite questions
5. Select Yes to install dependencies
6. Select **public** as the hosting directory
7. Select 'N' to single-page app


# Deploy Firebase function (Backend)

## Register

Once you host on firebase, your site will be live on https://<Firebase-app-id>.firebaseapp.com. 
You can register this URL for recaptcha as mentioned [here](https://developers.google.com/recaptcha/docs/v3) and get the secret and site keys

## Environment variables
```
export ORIGIN=https://<Firebase-app-id>.firebaseapp.com
export SECRET_KEY=<RECAPTCHA_SECRET_KEY
```

## Set env vars for firebase

```
firebase functions:config:set recaptacha.key=$SECRET_KEY recaptcha.origin=$ORIGIN
```

You can confirm using 

```
firebase functions:config:get
```

## Deploy function

```
firebase deploy --only functions
```

You should get the function endpoint such as - "https://us-central1-..."

# Deploy sample site

## Environment Variables

```
export SITE_KEY=<RECAPTCHA_SITE_KEY>
export API_ENDPOINT=<YOUR FUNCTION ENDPOINT FROM PREV STEP>
```

## Create env.js file

```
./scripts/env.sh
```

## Deploy

```
firebase deploy --only hosting
```

You site should be live on https://<app-id>.firebaseapp.com. You can enter values in the fields and hit submit to see the score returned by Google recaptcha on the next page

# Testing

Apart from manually testing on the firebase app online, you can run the puppeteer test included:

```
node test/test.js
```

Open the screenshot.png created by the test, and you should see a low score returned by recaptcha

