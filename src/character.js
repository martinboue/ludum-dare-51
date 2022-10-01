import npcList from "./data/npc.json";

export function spawnNpcs() {
    // Get each spawn and select some randomly
    const spawns = get("npc_spawn").shuffle().slice(0, 50);
    return spawns.map(spawn => {
        // Choose random sprite
        const npc = npcList.pickRandom();

        // Create npc
        return add([
            sprite(npc.code, { anim: "idle_bottom"}),
            pos(spawn.pos.x + 8, spawn.pos.y + 8),
            rotate(0),
            solid(),
            area({ width: 16, height: 16 }),
            origin("center"),
            "npc"
        ]);
    });
}