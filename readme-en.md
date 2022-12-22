<div align="center">

# E-learning platform

author: Krzysztof Kosmowski

</div>

---

Readme w języku Polskim dostępne jest w pliku `readme.md`

---



## Table of contents

* [Description](#description)
* [Technologies used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Author and license](#author-and-license)

---



## Description

E-Learning paltform is a result of Engineering Thesis work of Krzysztof Kosmowski. It is a web application that allows you to create and manage classes, subjects and users.

Application allows an administrator to create users, classes, subject categories and subjects, as well as to assign them to each other. As a result, we are creating: a subject category "Math", class "3A" with students and a teacher, and finally we create a subject "Math" for class "3A".

Students of class 3A can now access this subject, view teacher's announcements and send task and homeowrk submissions. The teacher can now create and grade tasks, as well as send announcements.

This application was made using knowledge already possessed as well as a new one, acquired during project implementation. Code in this repository is not for sale and cannot be used without author's approval.



## Technologies used
* `react` as a fundamental UI library
* `typescript` for better implementation (with static type checking)
* `react-query` for sending and handling requests to server application
* `@mui/material`, `@mui/icons-material` etc. with `@emotion` to create and style components
* `i18next` & `react-i18next` for translations



## Installation

To install this project properly, make sure you have following items on your local machine:
- Node environment
- `yarn` or `npm` package manager

To install the application and its dependencies, run one of the following commands:
* `yarn install`
* `npm install`

depending on your package manager of choice.



## Usage

After installing dependencies, the app is ready to be launched using one of the following commands:
* `yarn start`
* `npm start`

It should result with a Typescript and React code compilation to vanilla Javascript. When this process is done, your  default browser should open a new tab with url http://localhost:3000



## Features
- Administrator
    - Creating, viewing, modifying and archiving/activating users
    - Creating, viewing and modifying subject categories
    - Deleting subject categories (only if not used)
    - Creating, viewing and modifying classes (assigning teacher and students)
    - Creating, viewing and modifying subjects (assigning subject category, specific class and the lecturing teacher)  
- Teacher
    - Viewing and managing subjects
    - Creating, modifying and deleting announcements
    - Creating, modifying and deleting tasks and homework
    - Viewing sent student submissions for tasks and homework
    - Assigning and modifying grades for tasks and homework, and for activity or behaviour
    - Batch assigning negative grade for students that didn't submit the task submission
    - Assigning and modifying proposed final grade for students
    - Assigning final grade for students
- Student
    - Viewing subjects
    - Viewing published announcements
    - Viewing and submitting to published tasks and homework
    - Sending text and/or file answers in task submission
    - Viewing received subject grades and average, proposed and final grades
    - Viewing grades: average, proposed and final of all subjects (year/term summary)
- Common
    - Signing in and signing out (authentication system)

This application was implemented as a desktop app, .<br />
It is not meant for mobile devices.

Application is available in English and Polish. It is also possible to extend it with more languages.



## Author and license

**E-learning Platform** is a result of work of Krzysztof Kosmowski.

It is prohibited to use this application or this code without solid confirmation of the author. It is prohibited to sell or distribute this code.

**The only exception is distribution and processing of this code in processes of verification and grading this Engineering Thesis.**
