# sim

## to dev

```
npm run build //once to bring assets into dist dir
npm run flow:watch
npm run test
npm run dev
```
and goto [localhost:8080/dist](http://localhost:8080/dist)


## todo:

 - staff competancy applied
 - fridges contain food
 - food ordering
 - food delivery
 - types of food
 - move rotation drawing into layer
 - rating food
 - track order time
 - space pause time
 - budget screens
 - achievement system
 - shift click to select multiple
 - rewrite probably whole character shit to 
    - always have a task
    - be able to render task details
      - path
    - be able to give orders

 - lights 
 - air con/heaters
 - give orders direct to selected
 - add containers

 - start in food truck
 - space for 1 oven, fridge and prep table
 - save meta (screenshot, save date, time played etc)
 - rewrite renderer
    - move all context manipulation into layer class
 - use shadowblur for highlighting character (better)
 - use code to upsize images to like 64 or something

 - datamap
   - all the things (object abilities, character skills)
   - go through codebase and fix all refs to datamaps

 - add timewarp 

 - ui button log those without keys and add keys to all for css selectability

 - fat gloved chef hand cursor with point press and thumbsup



 - autosave/hot dev mode
 - serialize character save
### PRIORITISED:
 - chef recipe learning system
   - recipes datamap
   - workers have recipes
   - worker recipe data - exp levels


### TECH DEBT

write tests

 add all getters and setters into manager and types
  - so state is entirely stringifyable


### credits

some art from opengameart.com:
http://opengameart.org/content/dawnlike-16x16-universal-rogue-like-tileset-v181
