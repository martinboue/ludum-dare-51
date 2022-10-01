import {randomBetween, randomItem} from "./utils.js";
import foodList from "./data/food.json";
import pickUpLines from "./data/pick-up-lines.json";



export function addDialog() {
    const containerMarginX = 10;
    const containerPaddingX = 7;

    // Create order dialog
    const container = add([
        rect(width() - containerMarginX * 2, 30),
        origin("center"),
        pos(center().x, height() - 20),
        outline(2),
        z(100)
    ]);

    // Create food image
    const food = add([
        sprite(foodList[0].code),
        area({ width: 16, height: 16 }),
        pos(containerMarginX + containerPaddingX, container.pos.y),
        origin("left"),
        z(100)
    ]);

    // Create dialog text
    const txt = add([
        text("", { size: 6, width: container.width - containerPaddingX * 3 - food.area.width }),
        pos(containerMarginX + containerPaddingX * 2 + food.area.width, container.pos.y),
        color(0, 0, 0),
        origin("left"),
        z(100)
    ]);


    // Hide by default
    container.hidden = true;
    txt.hidden = true;
    food.hidden = true;

    // Fix for camera
    container.fixed = true;
    txt.fixed = true;
    food.fixed = true;

    return {

        show(order) {
            // Update dialog text
            txt.text = order.pickUpLocation.line
                .replace("{hint}", order.deliveryLocation.hint)
                .replace("{food}", order.food.name);
            // Update food sprite
            food.use(sprite(order.food.code));

            // Show dialog container and text
            container.hidden = false;
            txt.hidden = false;
            food.hidden = false;

            // Hide dialog after x seconds
            wait(4, () => {
                this.dismiss();
            });
        },
        dismiss() {
            // Reset dialog text
            txt.text = "";
            // Hide dialog container and text
            container.hidden = true;
            txt.hidden = true;
            food.hidden = true;
        },
        destroy() {
            container.destroy();
            txt.destroy();
            food.destroy();
        }

    };
}


export function generateOrder() {
    // Choose random food
    const food = randomItem(foodList);

    // Generate a pick up location
    const pickUpLocation = {
        pos: { x: 10, y: 10 },
        line: randomItem(pickUpLines)
    };

    // Generate a delivery location and hint
    const deliveryLocation = {
        hint: "the guy with the hat", // TODO : generate hint
        pos: { x: 10, y: 10 }
    };

    // Create order item
    const item = add([
        sprite(food.code),
        pos(0, 0),
        z(100)
    ]);
    item.fixed = true;

    // Create order
    return {
        food: food,
        pickUpLocation: pickUpLocation,
        deliveryLocation: deliveryLocation,
        item: item
    };
}

export function updateItemList(orders) {
    const margin = 2;
    orders.forEach((order, index) => {
        order.item.moveTo(index * 16 + (index + 1) * margin, margin);
    });
}