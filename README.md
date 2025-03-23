# Team 4 - "SheCanGitIt" <a id="top"/>
Team 4 - CI March 2025 Hackathon "CodeHer"
![logo]()
Live site: [SheCanGitIt](https://she-gits-it-8555f0353cc7.herokuapp.com/)

## Introduction
The present website was build as part of Code Intitute Hackathon - CodeHER, in March 2025, to showcase the contributions of women for coding and technology throughout history.<br>
Initially there was the idea to check different women in this area, then other ideas arised to get areas for women to search for a mentor that could help them improve their career, and to connect with other women and share ideas about coding and tech to improve themselves.<br>
Another idea was to show positive inspirational quotes - "Affirmations", for users to see.

## Table of Contents
- [User Experience Design](#user-experience-design)
- [Project Brief](#project-brief)
- [Users](#users)
- [Project Plan](#project-plan)
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
- [Design](#design)
    - [Colour Scheme](#colour-scheme)
    - [Typography](#typography)
    - [Imagery](#imagery)
- [Website Features](#website-features)
    - [Homepage](#homepage)
- [Responsive Design](#responsive-design)
- [Future Features](#future-features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Testing](#testing)
- [Credits](#credits)
    - [Code References](code-references)
    - [Use of AI](use-of-ai)
    - [Content References](content-references)
    - [Media References](media-references)
    - [Acknowledgements](acknowledgements)

[Back to top](#top)

## User Experience Design
The site was made according to specifications from the Hackathon, which comprised of showing a retro design for the user, with the team using an 80's/90's style for the project.<br>
All the experience is meant to take the user to that era and experience the site with a touch of modernity through a fluid and smooth experience. With faster loads and swift changes between pages and areas of the site than you would see in a retro computer.

### Project Brief
The idea for project was discussed in the first day of the hackathon, with new features coming up on th second and third day.<br>
Project evolved with the idea for a chat between users and mentors.<br>
Different members picked up different tasks to do, from creating apps and styling the frontend, to working in the backend with databases.

### Users
In 
- Persona 1: 

## Project Plan
For the project plan, the team used GitHub Project, created on the first day of the hackathon.<br>
https://github.com/users/Carlos-n21/projects/18

### User Stories
Here 
| User Stories                                    | MoSCoW priority           |  Status |
| ----------------------------------------------- |:-------------------------:| -------:|
| Homepage                                        | must have                 |   Done  |


Al

[Back to top](#top)

### Wireframes
Initial layout of website:

- Mobile view:<br>
  <img src="">
  <img src="">
  
- Tablet view:<br>
  <img src=""> <img src="">
  
- Desktop/Laptop view:<br>
  <img src=""> <img src="">

[Back to top](#top)

## Design
### Colour Scheme
The following colours were used on the website:
- retro-purple: #6B5B95;
- retro-pink: #FFB7C5;
- retro-cream: #FFF5E1;
- retro-dark: #2D243F;
- retro-highlight: #E0B1CB;

<img src="">

### Typography
For this project, we used the following family fonts:

- 'Press Start 2P'<br>
https://fonts.google.com/specimen/Press+Start+2P

-  monospace<br>
https://fonts.google.com/?query=monospace

- "Courier New"<br>
https://learn.microsoft.com/en-us/typography/font-list/courier-new

- Courier<br>
https://fontsgeek.com/fonts/Courier-Regular


### Imagery
- Ba<br>
  <img src="">

[Back to top](#top)

## Website Features
### Homepage
  <img src="">

Th

[Back to top](#top)

## Responsive Design
Most
![amiresponsive]()

## Future Features
- T

## Technologies Used
### Languages and Technologies


### Libraries


### Tools and Programs


[Back to top](#top)

## Deployment

Heroku deployment process:

This project uses Heroku, a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.<br>
Deployment steps are as follows, after account setup:

Select New in the top-right corner of your Heroku Dashboard, and select Create new app from the dropdown menu.<br>
Your app name must be unique, and then choose a region closest to you (EU or USA), and finally, select Create App.
<details>
From the new app Settings, click Reveal Config Vars, and set your environment variables.<br>
| Key | Value |<br>
| --- | --- |<br>
| AWS_ACCESS_KEY_ID | user's own value |<br>
| AWS_SECRET_ACCESS_KEY | user's own value |<br>
| DATABASE_URL | user's own value |<br>
| DISABLE_COLLECTSTATIC | 1 (this is temporary, and can be removed for the final deployment) |<br>
| EMAIL_HOST_PASS | user's own value |<br>
| EMAIL_HOST_USER | user's own value |<br>
| SECRET_KEY | user's own value |<br>
| STRIPE_PUBLIC_KEY | user's own value |<br>
| STRIPE_SECRET_KEY | user's own value |<br>
| STRIPE_WH_SECRET | user's own value |<br>
| USE_AWS | True |<br>
Heroku needs three additional files in order to deploy properly.<br>
requirements.txt<br>

Procfile<br>

To cater for the needs of the async messaging function in the app, instead of using a gunicorn-based process type declaration (typically web: gunicorn team_4.wsgi:application), which can't handle web sockets, the declaration we used calls daphne, a similar application to gunicorn, whose advantage in this case is that it can deal with websockets very well.

The line in the Procfile that launches the app after deployment is therefore "web: daphne -b 0.0.0.0 -p $PORT team_4.asgi:application".


runtime.txt<br>
You can install this project's requirements (where applicable) using:<br>
pip3 install -r requirements.txt<br>
If you have your own packages that have been installed, then the requirements file needs updated using:<br>
pip3 freeze --local > requirements.txt<br>
The Procfile can be created with the following command:<br>
echo web: gunicorn app_name.wsgi > Procfile<br>
replace app_name with the name of your primary Django app name; the folder where settings.py is located<br>
The runtime.txt file needs to know which Python version you're using:
type: python3 --version in the terminal.<br>
in the runtime.txt file, add your Python version:
python-3.9.19<br>
For Heroku deployment, follow these steps to connect your own GitHub repository to the newly created app:<br>
Either:<br>
Select Automatic Deployment from the Heroku app.<br>
Or:<br>
In the Terminal/CLI, connect to Heroku using this command: heroku login -i<br>
Set the remote for Heroku: heroku git:remote -a app_name (replace app_name with your app name)<br>
After performing the standard Git add, commit, and push to GitHub, you can now type:
git push heroku main<br>
The project should now be connected and deployed to Heroku!
</details>
Once the MVP was achieved and tested on Gitpod, the deployment was done on Heroku.

Redis after deployment<br>
Asyncronous messaging using websockets needs a Redis process running constantly in the background. This service is provided in the dev environment via a Redis process running in docker. While Heroku can also work with docker, the easiest and cheapest option for us (at 0$ per month) was to use the free plan for Redis® Cloud, which works perfectly well for our purposes on the deployment side. Its chief limitation is that it can only be used once per Heroku account before monthly payments begin to kick in.

It automatically writes a Config Variable to Heroku, telling the app where to look for the Publish/Subscribe broker that websockets need.

[Back to top](#top)

## Testing
V

### HTML Validation
- Use

### CSS Validation

- Use


### Lighthouse Audit
- Us


### Bugs yet to be Fixed
- 

[Back to top](#top)

## Credits
### Code References
Ma

### Use of AI
#### Code Generation
Th

#### Debugging
Co

#### Code Optimisation
Whe

#### Impact on Workflow
On

### Content References


### Media References


### Acknowledgements
Ev

[Back to top](#top)

