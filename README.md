Author: Michael Yankura

# Overview
Checkaroo is an app intended to assist users with preparation for the music and arts festival Bonnaroo by allowing them to build a checklist for supplies that will be needed.

## Built With
**JavaScript** - The language used.

**React.js** - JavaScript library for building user interfaces.

**Node.js** - JavaScript run-time environment.

**JSON Server** - The fake REST API being used for persistant storage and CRUD functionality.

**CSS** - Main styling.

**Bootstrap** - Used for some styling.

**Visual Studio Code** - Text editor used.

**Git Bash** - The terminal used.

**Git** - Version control system.

**GitHub** -  Used for bug tracking, feature requests, and task management.

# Getting started
These instructions will clone a copy of the project to your local machine from my GitHub repository and assist you with setting up the additional dependencies required to make this app function. In this README I will be doing this all by using Git and Linux commands through my Git Bash terminal.

## Installation
First, you'll need to clone down the Checkaroo repository into a directory. Open your terminal and enter the following command and execute:

```git clone git@github.com:myankura/Checkaroo.git```

After you are done cloning the project from my repository to your local machine, redirect to the root directory of the project folder. In your terminal enter the following command and execute:

```cd checkaroo```

## Note: 
This app uses **node.js** and **JSON Server**. You will need to download and install both of these before proceeding. To install node.js go to https://nodejs.org/en/download and follow the instructions, **this could take several minutes.**. 

Once node.js has been installed to your system, we will need to install node package manager in the root of the project folder. To do so type in the following command in your terminal and execute it, **this could take several minutes.**:

```npm i```

Look for node_modules in the root of the project folder to verify that node package manager has been installed.

After node package manager has been successfully installed we will need install **JSON Server**. If you're not familiar with JSON Server, it is basically a full fake REST API with zero coding in less than 30 seconds. This will allow for persistent data storage and CRUD functionality. To learn more about JSON Server go to https://github.com/typicode/json-server#getting-started. 

To install JSON Server type the following command in your terminal and execute it:

```npm install -g json-server``` 

## Important
**The database.json file has been ignored in the .gitignore. For this app to work the way intended the database.json file is required.** For convenience I have added an example of the REST API called database.json.example which has some dummy data to get you started out. To use the dummy data just rename the file to database.json. This can be done in the your text editor, the project's directory, or by a Linux command through the terminal.

To do this in the terminal you will need to go to where the file is. This file can be found at the following directory ```/Checkaroo/api```. In your terminal type the following command and execute it:

```cd api```

Once in the folder holding the file we will need to rename it, the easiest way is with the mv command. In your terminal type one of the following commands and execute it:

```mv database.json.example database.json```

After renaming database.json.example to database.json, you will need to run the local json-server. In your terminal run the following command:

```json-server -p 8088 -w database.json```

Before we run the application, you must run the command that launches the React app. 
**For Windows and Linux users you will unfortunately need to open another instance of your Git Bash terminal, Mac users should be able to just open another window in Git Bash**. 

Once you have either opened up another window in your Git Bash terminal (Mac Users) or launched another instance of Git Bash (Windows and Linux Users), you will need to get back to the directory of the project's folder. After returning to the root directory of the project folder, enter the following command and execute to start the application:

```npm start```

Next, you'll need to head over to your browser and open your Developer Tools. This application has been styled to mimic a mobile app, so for the best user experience it is suggested that you use a browser that offers a mobile frame. Browsers that offer mobile frames include **Google Chrome**, **Mozilla Firefox**, and **Brave**.

Steps to view the app in a mobile frame via **Google Chrome** or **Brave**: 
1. Click on the three dots located in the upper right hand corner of the browser 
1. Select **More Tools** > **Developer Tools**
1. Click on the **Toggle Device Toolbar** (this will look like a tablet paired with a smart phone)
1. Choose the device you'd like to view the app on
1. Now type http://localhost:3000 in the browser's address bar and hit enter.
You are now ready to use Checkaroo.

Steps to view the app in a mobile frame via **Mozilla Firefox**:
1. Click on the three bars located in the upper right hand corner of the browser 
1. Select **Web Developer** > **Toggle Tools**
1. Click on the **Responsive Design Mode** (this will look like a tablet paired with a smart phone)
1. Choose the device you'd like to view the app on 
1. Now type http://localhost:3000 in the browser's address bar and hit enter.
You are now ready to use Checkaroo.

## First Time User instructions
The first thing you will need to do is register as a new user, otherwise you will not be able to use Checkaroo.
Once registered you should be able to use the application. By default the user a checklist is created for the user when they register a new account. 
