# DevGram API Lists

## Auth Router
-POST/signUp
-POST/logIn
-POST/logOut

## Profile Router
-GET/profile/views
-PATCH/profile/edit
-PATCH/profile/password

## Connection Request5 Router
-POST/request/send/interested:userId
-POST/request/send/ignore:userId
-POST/request/accept/acepted:userId
-POST/request/reject/rejected:userId

## User Router
-GET/user/connection
-GET/user/request
-GET/user/feed (Gets the profiles of other users on platform)

Status: ignored, interested, accepeted, rejected
