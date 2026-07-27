# opencode-missions

OpenCode plugin for multi-step mission orchestration.

This plugin enables OpenCode to plan, execute, and validate goals across multiple sessions.

## Installation

Add `"opencode-missions"` to your `.opencode.json` plugins.

## Available Tools

- `mission_plan`: Decompose a user goal into ordered milestones with success criteria.
- `mission_next`: Start the next pending milestone in the active mission.
- `mission_validate`: Validate a milestone by running its test command.
- `mission_status`: Show the current mission progress with milestone status icons.
- `mission_cancel`: Cancel the active mission.

## Integration

If used with `opencode-candela`, the active mission ID will be injected as `CANDELA_MISSION_ID` into the shell, allowing Candela to attribute costs (via `X-Mission-Id` headers) to specific missions.
