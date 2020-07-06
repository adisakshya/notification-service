curl -X POST -H "Authorization: key=ServerKeyHere" -H "Content-Type: application/json"    -d '{
    "data": {
      "notification": {
          "title": "FCM Message",
          "body": "This is another FCM Message",
          "icon": "/ab-logo.png",
      }
    },
    "to": "TokenHere"
  }' https://fcm.googleapis.com/fcm/send