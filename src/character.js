import characters from "./data/characters.json";
import talk from "./components/talk.js";
import {faker} from "@faker-js/faker";
import {identity} from "./components/identity.js";

export function spawnNpcs() {
    // Get each spawn and select some randomly
    const spawns = get("npc_spawn").shuffle().slice(0, 20);
    return spawns.map(spawn => {
        // Choose random character (sprite)
        const character = characters.pickRandom();

        // Choose random name
        const name = faker.name.fullName({ sex: character.gender });

        // Choose random age
        const birthDate = faker.date.birthdate({ ...getAgeRange(character.ageCategory), mode: "age" });

        // Choose random company
        const company = faker.company.name();

        // Create npc
        return add([
            sprite(character.code, { anim: "idle_bottom"}),
            pos(spawn.pos.x + 8, spawn.pos.y + 8),
            rotate(0),
            solid(),
            area({ width: 16, height: 16 }),
            origin("center"),
            talk(name),
            identity(name, birthDate, company, character),
            "npc"
        ]);
    });
}

function getAgeRange(ageCategory) {
    switch (ageCategory) {
        case "old": return { min: 60, max: 100 };
        case "adult": return { min: 15, max: 59 };
        default: throw new Error(`Unsupported age category '${ageCategory}'.`);
    }
}