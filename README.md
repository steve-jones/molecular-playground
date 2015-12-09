<h1 align="middle">Team Dropout<br>
<img src = "Documentation/Images/logo1.jpg" alt = "Team Dropout" align="middle" height = "132" width = "110"></h1>


## Molecular Playground Expansion

### Project Overview
>The Molecular Playground is an existing system that displays large-scale interactive projections of molecules in local installations. Users of the playground can use hand motions to directly interact with the 3D molecule via a motion sensor controller. There are currently 9 of these installations across the globe. You can view the existing system code in ~/Existing_Molecular_Playground/.

>*Team Dropout* is aiming to build upon this system with Molecular Playground Expansion. Our expansion consists of a scalable web application that will plug into the existing system and a central server that will create a repository for all the interactive molecules. This centralization will hopefully bring in more local installations of Molecular Playground and garner interest in chemistry and physics across the world!

>As far as programming tools, we are using Javascript, Node.js, Express, and PostgreSQL.

>Our web application will primarily be used for administration to monitor their installation of Molecular Playground. Authors that wish to upload their own interactive content will be able to use our application to do so. We are keeping scalability and expansion in mind as we develop because we want to allow for more local installations to be put in place across the world. To get more of a high level overview of our system, refer to our High Level Design Document in the ~/Documentation/ folder.


### Production Deployment Timeline:
>**Latest prototype files for new features are in their respective branch**
- 11/18 -- decided on framework (Node.js, Express, and PostgreSQL)
- 11/25 -- created homepage views and updated folder structure
- 12/01 -- finished database functionality concerning user accounts
- 12/02 -- completed users view, playlist landing page view, and view paths within installation_api.js and playlist_api.js
- 12/02 -- completed new login module with flash error message, and landing page after login
- 12/05 -- all database functionality (except error passing) is complete
- 12/06 -- updated login page to make it functional and added authentication features 
- 12/11 -- first prototype complete
