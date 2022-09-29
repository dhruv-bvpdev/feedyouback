import admin from 'firebase-admin'

let firebaseAdmin

if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp(
    {
      credential: admin.credential.cert({
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }),
      databaseURL: 'https://feed-you-back.firebaseio.com'
    },
    'admin'
  )
}

export default firebaseAdmin
