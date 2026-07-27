# opencode-missions

`opencode-missions` is a companion plugin for OpenCode that enables multi-step autonomous workflows. It provides mission orchestration tools to decompose large goals into smaller milestones, dispatch child sessions to work on them, and validate results across sessions.

## Features

- **Mission Planning:** Decompose user goals into ordered, testable milestones.
- **Child Sessions:** Dispatch isolated child sessions for focused work on individual milestones.
- **Validation:** Define test commands for milestones and validate their completion.
- **Cross-Session Persistence:** Missions are saved to disk and persist across restarts.
- **TUI Integration:** A built-in sidebar widget tracks mission progress in the terminal.
- **Cost Tracking:** Integrates seamlessly with `opencode-candela` for mission-level cost tracking.

## Installation

Install the plugin in your project workspace:

```bash
npm install opencode-missions
```

Register it in your project's `.opencode.json` file:

```json
{
  "plugins": [
    "opencode-missions"
  ]
}
```

## Quick Start

A typical autonomous workflow looks like this:

1. **`mission_plan`**: The agent breaks down a complex goal ("Build a REST API") into smaller milestones ("Set up Express", "Add routes", "Write tests").
2. **`mission_next`**: Starts the first pending milestone and spawns a child session focused on that specific task.
3. **`mission_validate`**: After the child session finishes, the agent runs the test command to validate completion. If successful, it marks the milestone as done.
4. The cycle repeats until all milestones are complete!

## Available Tools

| Tool | Description | Key Arguments |
| --- | --- | --- |
| `mission_plan` | Create a new mission broken into ordered milestones. | `goal`, `title`, `milestones` |
| `mission_next` | Start the next pending milestone in a child session. | (None) |
| `mission_validate` | Run tests to validate a milestone or mark it done/failed. | `milestone_id`, `status` |
| `mission_status` | View the progress of the active mission. | (None) |
| `mission_cancel` | Abort child sessions and cancel the current mission. | (None) |

## TUI Sidebar

The plugin registers a sidebar widget in OpenCode's TUI that displays the active mission's progress and milestone list.

*(Screenshot Placeholder)*

## How It Works

- **File Persistence:** Missions are stored as JSON in `~/.config/opencode/candela-missions.json`, providing atomic updates and persistence across restarts or crashes.
- **Child Sessions:** For each milestone, `mission_next` spawns a temporary child session. This keeps the agent's context window clean and focused on the immediate task.
- **Milestone State Machine:** Milestones transition through `pending` -> `working` -> `validating` -> `done`/`failed`.

## Integration with opencode-candela

When combined with `opencode-candela`, child sessions spawned by missions automatically inject the `CANDELA_MISSION_ID` environment variable. The Candela plugin maps this to the `X-Mission-Id` HTTP header, enabling grouped cost attribution and tracking for entire multi-step workflows.

## Configuration

By default, completed missions are pruned after 90 days. You can adjust this or other behavior inside the plugin initialization logic if needed.

## License

Apache-2.0
