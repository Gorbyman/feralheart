# Mediatool interview exercise

Welcome to the Mediatool exercise preparing for your on site interview. In this repository you will find an initial react app that is
set up with transpilers and livereload so that you won't need to focus on such things.

Below you will find instructions for how to run the app and the exercise itself. Good luck!

## Working with the application

After cloning this repo, install all dependencies using `yarn` or `npm` (preferably yarn). When that is complete, run the server by executing `yarn start` or `npm run start`.
You will now be able to access the initial application through your browser at `http://localhost:3000`.

In the folder `src` you will find a file called `app.jsx` that is the main module for your application. You can import other files from there.
You will also find the file `style.less` which is the base for styling. There are no requirements on a nice look and feel for this exercise but if
you do feel that you want to add some css or less, you can do that in this file. Whenever you make changes to any of these files or imports form them, the application should update by itself.

## mt-ui
We have provided you with the dependency `mt-ui` that you may use to structure the graphic components of the app. It is not a requirement that you use it, just something
that might make it easier for you so that you can focus on code and not on the looks of the application. It contains a grid that is explained on the initial page.

# The exercise - Ranking app
The goal of this exercise is to create a ranking app based on some users and their scores.
It consists of three parts:

  1. Display the ranking list correctly from existing data
  2. Add a form to enter new data
  3. Handle import of multiple data points

We suggest that you do the exercise in the order listed above. Aim to finish all parts but if you find the task too big,
finish part 1 first and then move on to the other ones to the best of your ability.

## List existing scores

In this repository you will find two files containing initial data `src/users.js` and `src/scores.js`.

Create a React app that displays a ranking list where each user in the file `src/users.js` is displayed only once along with their best score from the file `src/scores.js`. The user with the highest score should be listed first and the rest in descending order. See section [Expected results](#expected-results) for a specific explanation of what the result should look like.

## Show user scores
If you click on a user, a separate list should be visible showing all scores registered for that user in descending order.

## Add Form
The app should also have a form where you can enter a name and a score. If the user name does not already exist, that name should be added to the list of users. If the user _does_ exist, the score should be added to them and the ranking list updated if needed.

New data does not need to be saved on reload.

## Excel import
The app should also handle excel import of scores. We have prepared the app so that you can drag and drop an excel file into a dropzone on the page, from there the excel file is parsed and the data should be available to you.
Start the app to see how this works. You will find a file `scores.xlsx` in this repo that you can import to your app.

## Expected results
When the app is initially loaded, this should be the list displayed:
  * Jane - 988
  * Kim - 974
  * Barry - 742

If you then import the excel file `scores.xlsx`, the result should look like this:
  * Steve - 989
  * Jane - 988
  * Anna - 983
  * Kim - 974
  * Pierce - 974
  * Alan - 961
  * Barry - 917
  * Hedvig - 903
  * Glen - 607

If you then add a name and a score via the form with the name `Pierce` and score `1000`, the result should look like this:
  * Pierce - 1000
  * Steve - 989
  * Jane - 988
  * Anna - 983
  * Kim - 974
  * Alan - 961
  * Barry - 917
  * Hedvig - 903
  * Glen - 607
