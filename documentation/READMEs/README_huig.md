I initially worked on setting up the linking between the pages. There was a bug when you clicked refresh, but Joe was able to fix that bug. I created the tasks and resources frontend. For the rest of the project, I was working on adding the chat feature to our page. We decided to use Firebase. This was a learning curve for me, since I have not worked with Firebase before and I had trouble connected Firebase to our project. I had to use namespaced API and CDNs instead of modular API. Once, I got this connected, I originally decided to have the user login to Google to get their userid. We decided to change that because it created more steps for the user. Now, when the user clicks on their chat tabs, it will create an anonymous userid and add that to Firebase along with their RIN. We have been using student RINs to be our unique identifier, so I continued with that approach. Firebase would pull chat logs based on the RIN of the logged in user. After setting it up so the user can see the messages of the groups they are in and send messages, I added some styling. Each user in the chat would have a different color associated to them.

Resources:
- https://www.pluralsight.com/resources/blog/guides/using-react-router-with-cdn-links
- https://stackoverflow.com/questions/40764596/using-react-router-with-cdn-and-without-webpack-or-browserify 
- https://www.w3schools.com/html/html_tables.asp
- https://www.geeksforgeeks.org/how-to-use-bootstrap-with-react/
- https://www.geeksforgeeks.org/how-to-style-a-dropdown-using-css/
- https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
- https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/
- https://stackoverflow.com/questions/46989568/firestore-get-document-collections
- https://firebase.google.com/docs/web/learn-more?hl=en&authuser=0&_gl=1*yck7a*_ga*MTczNjkxMzUyNS4xNzQwMDc0MjA3*_ga_CW55HF8NVT*MTc0MDA3ODI4My4yLjEuMTc0MDA3ODM5Mi41NS4wLjA.#web_1
