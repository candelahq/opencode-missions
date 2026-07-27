import type { Plugin } from "@opencode-ai/plugin";
import { getActiveMission, pruneCompleted } from "./mission-store.js";
import { createMissionTools } from "./mission-tools.js";

export { tui } from "./tui.js";

export const MissionsPlugin: Plugin = async ({ client }) => {
  pruneCompleted(90);

  const tools = createMissionTools(client as any);

  return {
    tool: tools,
    "shell.env": async (_input, output) => {
      const mission = getActiveMission();
      if (mission) {
        output.env.CANDELA_MISSION_ID = mission.id;
      }
    },
  };
};
