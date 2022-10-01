import {randomBetween} from "./utils.js";
import foodList from "./food.json";



export function addDialog() {
    // Create order dialog
    const orderDialog = add([
        rect(width() - 40, 30),
        origin("center"),
        pos(center().x, height() - 20),
        outline(2),
        z(100)
    ])

    // Create dialog text
    const orderDialogText = add([
        text("", { size: 8, width: width() - 40 }),
        pos(orderDialog.pos),
        color(0, 0, 0),
        origin("center"),
        z(100)
    ])

    // Hide by default
    orderDialog.hidden = true
    orderDialogText.hidden = true

    // Fix for camera
    orderDialog.fixed = true
    orderDialogText.fixed = true

    return {

        show(hint) {
            // Update dialog text
            orderDialogText.text = hint
            // Show dialog container and text
            orderDialog.hidden = false
            orderDialogText.hidden = false

            // Hide dialog after 2 seconds
            wait(4, () => {
                this.dismiss()
            })
        },
        dismiss() {
            // Reset dialog text
            orderDialogText.text = ""
            // Hide dialog container and text
            orderDialog.hidden = true
            orderDialogText.hidden = true
        },
        destroy() {
            orderDialog.destroy()
            orderDialogText.destroy()
        }

    }
}


export function generateOrder() {
    // Choose random food
    const foodIndex = randomBetween(0, foodList.length - 1)
    const food = foodList[foodIndex]

    // Generate a pick up location
    const pickUpLocation = {
        pos: { x: 10, y: 10 }
    }

    // Generate a delivery location and hint
    const deliveryLocation = {
        hint: "The guy with the hat.",
        pos: { x: 10, y: 10 }
    }

    // Create order
    return {
        food: food,
        pickUpLocation: pickUpLocation,
        deliveryLocation: deliveryLocation
    }
}