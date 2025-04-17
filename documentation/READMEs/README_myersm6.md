# Work Log & Sources - Morgan

## Design & UX

I was the main UX person, and I did most of the design stuff in Figma. My goal was to keep the UI clean, intuitive, and not overwhelming, just something that makes sense without needing to think too hard.

- Went with a blue/orange/yellow color scheme — colors associated with productivity
- Kept the layout simple, minimal distractions to improve productivity
- Tried to make it accessible too (high contrast colors, readable fonts, etc.)

Link to Figma file: https://www.figma.com/design/Jui6FLMZ3JtiQ40T8ivkmU/Wireframes?node-id=0-1&t=soyWA9pccNcp0nHi-1
^ This ended up working super well, other team members could use dev mode to just pull the styling directly from the mockups. 

## Group API Endpoints

Started off just pulling group data from a JSON file, swapped that out and connected everything to MongoDB later on.

- Built endpoints for groups, calendar events, tasks, resources. (we also have login/signup and session stuff but I didn't do those)
- Each section above has GET, POST, PUT, and DELETE endpoints associated with them


## FullCalendar

Added a shared calendar to the group dashboard using FullCalendar Node.js library.

- Sources & docs:
  - https://fullcalendar.io/docs
  - https://github.com/fullcalendar/fullcalendar-react
  - https://isamatov.com/react-fullcalendar-tutorial/
  - https://medium.com/@arpiiantonyan/using-full-calendar-in-your-react-project-2a97b06a3f79
  - https://www.youtube.com/watch?v=X2zLbKimvQQ

Right now it displays group events and looks pretty nice. Got a bit stuck with the modals (just not quite used to react development), but figured it out pretty quickly. I was able to make it work with all day or time blocked events, which I found to be pretty cool too. I didn't even scratch the surface of FullCalendar's capabilities though, so it would be a cool one to explore more in the future.


## Mobile Development

Since we didn't use a UI library like Flowbite or Bootstrap, I made the whole thing responsive using CSS media queries.

- Every page/component works on smaller screens now
- Used `@media` rules to adjust layout/fonts/buttons as needed
- Sources:
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
  - https://www.w3schools.com/css/css_rwd_intro.asp


## Session Stuff

Worked on pulling group names and class info to display in the dashboards based on the session.

- Nothing super complex, just pulling data based on logged-in user/group
- Joe did most of this but it was cool to learn about sessions and how that all works. 

## Task Editing & Deleting

Just reworked my code from the calendar to make editing/deleting tasks possible. 