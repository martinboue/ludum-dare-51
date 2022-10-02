import skins from "./data/skins.json";
import talk from "./components/talk.js";
import {identity} from "./components/identity.js";
import {uniqueNamesGenerator, names} from "unique-names-generator";
import {skin} from "./components/skin.js";

export function spawnNpcs(deliverer) {
    // Get each spawn and select some randomly
    const spawns = get("npc_spawn").shuffle().slice(0, 20);

    const configName = { dictionaries: [names] };
    const generatedNames = [];

    return spawns.map(spawn => {
        // Choose random skin
        const skinNpc = {
            hair: skins.hair.pickRandom(),
            top: skins.top.pickRandom(),
            bottom: skins.bottom.pickRandom()
        };

        // Choose random name until it's unique
        let name = uniqueNamesGenerator(configName);
        while (generatedNames.indexOf(name) !== -1) {
            name = uniqueNamesGenerator(configName);
        }
        generatedNames.push(name);

        // Create npc
        return add([
            sprite("npc"),
            pos(spawn.pos.x + 8, spawn.pos.y + 8),
            rotate(0),
            solid(),
            area({ width: 16, height: 16 }),
            origin("center"),
            talk(deliverer),
            identity(name, skinNpc),
            skin(
                skins.hair.indexOf(skinNpc.hair),
                skins.top.indexOf(skinNpc.top),
                skins.bottom.indexOf(skinNpc.bottom)
            ),
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