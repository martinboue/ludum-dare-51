# TODO

## 🟢 Feedback to analyse
- Lack of information to differentiate restaurants from other buildings 
- Too many orders and message from restaurants at the same time, we are
  - Solution? : Only one order at the same, new order after deliverying to NPC
- The message "New order in ..." (restaurant) is confused with orders to be delivered
  - Solution? : is this information "New order in ..." useful ? Can we just remove it ?
- If you collide with both an NPC and a restaurant, it is not practical to interact with both the restaurant AND the NPC by pressing Space only once.

## 🟡 Ideas to validate
- Change score/points to money "$" to be more realistic ?
- Add white outline around NPC and/or restaurant when colliding to indicate that we can interact ?
- Bonus score if we chain the orders ?
- Add timer for pending orders in restaurants ?
- Increase difficulty  as the game progresses. Suggestions:
  - Having more complicated hints. Examples:
    - The last person you delivered a pizza to
    - His name starts with "A"
  - Reduce pick up time and/or delivery time
  - Increase the number of orders at the same time
  - Increase map size
  - Have more and more hints based on outfit rather than name
  - Increase the number of NPC
  - Make NPC move
- Add cars
- Make NPCs move around a bit

## 🔵 New features
- Add restaurant name in sprite
- Show food image in the hint message when restaurant gives you the order 
- Add feedback when an order has expired
- Add restart button or message "Reload page to restart" at the end
- Rotate more often NPC to see their colours better
- Lose one life if you give the order to the wrong NPC 3 times in a row
- Increase music volume
- Add volume slider for audio 
- Show personal high score at the end (local storage ?)
- Shake screen when you try to give an order to the wrong NPC
- Add sound effects for: new order, take order, give order, expired order, wrong NPC, lose life, game over, ...
- Add home screen
- Show in game tutorial
- Add an indication of pending orders in restaurants
- Associate one food to each restaurant (Fries, Pizza, Chicken, Sushi, Salad ?)
- Add mobile support by adding arrow buttons and space button
- Support window resizing and small screen

## 🔴 Bugs to fix
- Check if the randomness is correct (when choosing restaurant and/or NPC)
- Remove artefacts when showing a text
