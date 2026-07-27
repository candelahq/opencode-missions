import type { TuiPlugin } from "@opencode-ai/plugin/tui";
import { getActiveMission } from "./mission-store.js";
import { formatMilestoneList } from "./mission-tools.js";

export const tui: TuiPlugin = async (api) => {
  api.slots.register({
    slots: {
      sidebar_content: () => {
        const mission = getActiveMission();
        if (!mission) return null;

        const done = mission.milestones.filter(
          (m) => m.status === "done",
        ).length;
        const total = mission.milestones.length;

        return [
          `📋 Mission: ${mission.title} (${done}/${total})`,
          "",
          formatMilestoneList(mission.milestones),
        ].join("\n") as unknown as null;
      },
    },
  });
};
