# Todo list

## Feedback to analyse
- Lack of information to differentiate restaurants from other buildings 
- Too many orders and message from restaurants at the same time, we are
  - Solution? : Only one order at the same, new order after deliverying to NPC
- The message "New order in ..." (restaurant) is confused with orders to be delivered
  - Solution? : is this information "New order in ..." useful ? Can we just remove it ?
- If you collide with both an NPC and a restaurant, it is not practical to interact with both the restaurant AND the NPC by pressing Space only once.

## Ideas
- Change score/points to money "$" to be more realistic ?
- Add white outline around NPC and/or restaurant when colliding to indicate that we can interact ?
- Bonus score if we chain the orders ?
- Add timer for pending orders in restaurants ?

## Features
Ordered by priority :
- Add restaurant name in sprite
- Show food image in the hint message when restaurant gives you the order 
- Add feedback when an order has expired
- Add message "Reload page to restart" at the end
- Change hint text "It's the GUY with ..." to be non-gendered. It can be assumed that we are referring to men only.
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

## Bugs
- Increase game over text z index
- Check if the randomness is correct (when choosing restaurant and/or NPC)
None identified (for now...)