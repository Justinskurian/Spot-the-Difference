# Spot-the-Difference

Explanation

gameTitle: Used internally and for browser tab title.

images.image1 & image2: Paths to the two side-by-side images used in the game.

differences: An array of bounding boxes (x, y, width, height) representing the clickable "differences" between the two images.



How the Game Uses the JSON File

The gameData.json file provides all the configuration for the game, including image paths and the coordinates of the differences. When the game loads, it reads this file to:

Display the two images side-by-side

Place invisible clickable areas based on the difference coordinates

Track the player's progress and highlight correct selections

This makes the game easily customizable—new levels can be created by simply updating the JSON file without changing the code.
