# ITWS-4500-S25-syncboard

# Team Google Drive
https://drive.google.com/drive/folders/1mZXf-QwrH_6nG2-lNvb3Ns0FX67eTz0e?usp=sharing

(This has our scrum meetings and other team resources.)

# Site Description & Goals
SyncBoard aims to improve the workflow of group projects, including team management, meeting & deadline scheduling, and communication. We have built this application using a MERN stack (Mongo, Express, React, Node). Syncboard allows students to easily determine the best time to meet using a shared calendar, where students can view the availability of their group members. Teams can also chat with each other with the built in chat function, centralizing communications and preventing the need for an additional communication platform such as discord or webex. Teams can organize their tasks by setting the status of their tasks from to-do, in-progress, or completed. This allows members to visualize both progress and the open issues, increasing accountability between teammates. Students can upload their project resources in the resources section to keep track of any additional files and links that are frequently used. Finally, the contact section provides students with easy access to the contact information of their group members, ensuring clear and efficient communication throughout the project.

# Functionality & User Capabilities

Functional:
- All users must be able to log in and log out.
- Team members must be able to view other team member contact info.
- Team members must be able to chat within their team groups.
- Team members must be able to view a shared calendar.
- Team members must be able to add/remove/edit events on the calendar. 
- Team members must be able to add, remove, or update status of project tasks. 

Non-Functional:
- Site must be secure and adhere to cybersecurity standards.
- Site must be well designed, easy to use, and intuitive. 
- Site must be functional on desktop and mobile screen sizes. 


# Server Info
Served at: http://syncboard.eastus.cloudapp.azure.com/node
- *Note: must be configured for vm and local, as there are url differences*
- *Note: path to project folder on vm:* ```/var/www/html/syncboard/project ```


# Library Info

For this project, we installed and implemented capabilities using the following libraries:
1. FullCalendar
2. express-session
3. cors
4. bcrypt
5. crypto
