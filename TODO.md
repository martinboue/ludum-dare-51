# TODO

## 🟢 Feedback to analyse
- Lack of information to differentiate restaurants from other buildings 
- Too many orders and message from restaurants at the same time, we are
  - Solution? : Only one order at the same, new order after deliverying to NPC
- The message "New order in ..." (restaurant) is confused with orders to be delivered
  - Solution? : is this information "New order in ..." useful ? Can we just remove it ?
- If you collide with both an NPC and a restaurant, it is not practical to interact with both the restaurant AND the NPC by pressing Space only once.

## 🟡 Ideas to validate
- Have only one order at the same time ?
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
- Show again the hint if you come back to the restaurant

## 🔵 New features
- Add feedback when an order has expired (message + shake)
- Add restart button or message "Reload page to restart" at the end
- Lose one life if you give the order to the wrong NPC 3 times in a row
- Add volume slider for audio 
- Show personal high score at the end (local storage ?)
- Add sound effects for: new order, take order, give order, expired order, wrong NPC, lose life, game over, ...
- Add home screen
- Add an indication of pending orders in restaurants
- Add mobile support by adding arrow buttons and space button
- Support window resizing and small screen
- Resize text containers based on text width
- Update tutorial to indicate new shortcuts H and M
- Add close button for tutorial
- Add menu which pause the timers
- Rapidly show food on top of deliverer like "+100$" when taking food from restaurant
- Remove "Next order in ..." message
- Only be able to retrieve orders only in front of restaurants and not from all around.

## 🔴 Bugs to fix
- Check if the randomness is correct (when choosing restaurant and/or NPC)
- Remove artefacts when showing a text
