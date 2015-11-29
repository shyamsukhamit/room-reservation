Description

	Online reservation system for video conferencing facility at Periyar EVR Central Library, VIT University.

Scenarios

	1) User reserves a time slot, an email is sent to him and he confirms his booking. The time slot is blocked and no other users can book in the same slot. Also, a cancellation link is sent to the user to cancel his event.

	2) User confirms his booking using the confirmation link sent to him. He then cancels the event using the cancellation link sent to him, but tries to use the old confirmation link in his inbox to confirm his event again, in such a case the system will reject his confirmation attempt.

	3) Let two users, User 1 and User 2, book a slot each and neither of them confirm their events. Let the two events have atleast one colliding time slot. Now assume User 1 confirms his reservation. User 2 also attempts to confirm his booking after some time, in such a case, the system will reject his attempt. 

How to run??

	Install Node js

	Create a database named "room" in phpmyadmin(MySQL) and import "room.sql" into that database

	Edit the credentials in "model/db.js" to reflect your database credentials

	Run "npm start" or "node app.js" from this directory("DIRECTORY WHERE THIS FILE IS LOCATED") on the Terminal
		Listen to http://localhost:8000 on a web browser

	Check your e-mail for confirmation and cancellation links

	All events are organized in "30boxes", calendar service, (credentials available in the code) for easy administration (only for the administrator).

	A reminder e-mail will be sent to the administrator two hours before the actual event.

Bugs? Send them over to r2sd.npm@gmail.com

Have a great day!
Shridharshan Raajadhasapan