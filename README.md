# The Last Fugitive Game

Your goal is to cross the labyrinth,while avoiding from smart enemies,and obstacle on the road.


https://user-images.githubusercontent.com/56600839/214427640-1899bd42-f500-4f54-925f-ce435eb62725.mp4


## In order to play, identify within 2 options:
1) Sign up as a user,provide email and password,unique nickname, gender (save all your progress,ability to edit profile,extra strikes benefit).
2) Sign up as a guest-No details required (save all your progress, but can't edit profile,start with less strikes).

## How to play:
Tap on a bracket (mobile),you can move 1 step each turn.


## Rules
You can't walk towards a bracket if it contains an obstacle

If you walk through a bracket which is near to an enemy(1 bracket from him), He will eat you and you will loss
You have 5 strikes for a registered user, 3 for guest.

#You can use the hint button, to make the best step towards the exit(BFS Algorithm to solve labyrinth).

## How is it works:

Map is a 2 dimensional grid-conatins clear brackets,obstacles,enemies.
Game is rendering with Window.requestAnimationFrame() function,which request from the browser to repaint, inside useLayoutEffect hook.
(render the map consistently-game engine)
enemies are made up of major amount of .png assets, inside a JSON format.
with css, we use animate properties to change between assets-thats how the enemies and the player looks dynamically moving.
While playing, an interval is running to fill strikes each 5 min (instead of ad watch for now).

**While the app go into background mode-a timeout is set to count time for 5 min(to know when your done playing and set the end date for game)

--used for game statistics(total play time)

## Point distribution

Each level has it's rank:1-3 stars.

3 Stars:10 steps or less

2 Stars: 15 steps or less

1 Star: above 15 steps.

#With each level cleared, a new level will be opened.

#You can rate your level popularity from 0-5 after clearing a level.

## User profile section:


You can click on the avatar icon in order to change photo-choose from 3 photos, and change your nickname



## Screenshots:

Home screen:


![image](https://user-images.githubusercontent.com/93253836/195579123-e0c2c2e9-d1cc-48af-9a91-8466c810d40a.png)


Register Screen:


![image](https://user-images.githubusercontent.com/93253836/195579157-04544ae1-ff94-4a43-8b68-5da8ba040d9d.png)


Login Screen:


![image](https://user-images.githubusercontent.com/93253836/195579189-19fd53f2-abce-42b5-9a24-2bf5c1cc777f.png)


Reset Password:


![image](https://user-images.githubusercontent.com/93253836/195579215-a6876689-e281-419c-8af0-7c44d14f0dfd.png)


Game Main Screen:


![image](https://user-images.githubusercontent.com/93253836/195579242-e25c9be7-4bdb-404b-9ead-013a2414285a.png)


Profile Section(User):


![image](https://user-images.githubusercontent.com/93253836/195579260-cca84f26-87ba-4a20-9b09-c74e5a7e988d.png)


Settings:


![image](https://user-images.githubusercontent.com/93253836/195579282-364bd97f-fb04-4cbf-aa58-0d598c801215.png)


First Time User:


![image](https://user-images.githubusercontent.com/93253836/195579307-f3c10ca6-5fa2-43c9-a71f-5ece3e4ef031.png)


Veteran User:


![game levels](https://user-images.githubusercontent.com/93253836/195579506-346ebd15-fa49-40f3-980e-87a1c8e8f213.PNG)


Hint Screen:


![hint](https://user-images.githubusercontent.com/93253836/195579575-feeee6b3-9a7e-4986-a987-a65dff9809b0.PNG)


Game Over Screen:


![game over](https://user-images.githubusercontent.com/93253836/195579541-660ac20c-df38-4120-9942-907b60622762.PNG)


Victory Screen:


![victory](https://user-images.githubusercontent.com/93253836/195579653-2d93a017-f48f-4952-a78b-cab2054c937e.PNG)



Level Map:


![level1 game](https://user-images.githubusercontent.com/93253836/195579601-5df1afac-a411-4c1a-90c8-4e2934769811.PNG)



