---
sidebar_position: 5
---

# Active Liveness Detection

Challenge-response verification that requires the user to perform specific actions, providing stronger anti-spoofing guarantees than passive analysis alone.

## How It Works

Active liveness combines random challenge generation with multi-frame analysis to verify the user is physically present and following instructions.

### Flow

1. **Request challenge** — Client calls `POST /verifications/{id}/active-liveness/challenge`
2. **Display instructions** — Show the challenge (e.g., "Please blink your eyes once")
3. **Capture frames** — Record video/frames while the user performs the action
4. **Submit frames** — Upload frames to `POST /verifications/{id}/active-liveness/verify`
5. **Verify response** — Server analyzes frames for the expected motion pattern

### Challenge Types

| Challenge | Detection Method |
|---|---|
| `blink` | Eye region brightness dip across frames |
| `turn_left` | Horizontal face position shift left |
| `turn_right` | Horizontal face position shift right |
| `nod` | Vertical face position shift |
| `smile` | Mouth region brightness increase |

## API Usage

### 1. Generate Challenge

```bash
curl -X POST https://api.dev.valydar.com/verifications/vry_xxx/active-liveness/challenge \
  -H "Authorization: Bearer vyd_xxx"
```

Response:
```json
{
  "challenge_id": "ch_a1b2c3d4e5f6",
  "challenge_type": "blink",
  "instructions": "Please blink your eyes once",
  "timeout_secs": 10
}
```

### 2. Submit Frames

```bash
curl -X POST https://api.dev.valydar.com/verifications/vry_xxx/active-liveness/verify \
  -H "Authorization: Bearer vyd_xxx" \
  -F "challenge_type=blink" \
  -F "file=@frame1.jpg" \
  -F "file=@frame2.jpg" \
  -F "file=@frame3.jpg"
```

Response:
```json
{
  "passed": true,
  "score": 0.82,
  "checks": [
    {
      "name": "blink_detection",
      "passed": true,
      "score": 0.82,
      "reason": "detected eye brightness dip of 23.5%, consistent with blink"
    }
  ]
}
```

## Result

```json
{
  "type": "active_liveness",
  "result": "passed",
  "score": 0.82,
  "challenge": {
    "challenge_id": "ch_a1b2c3d4e5f6",
    "challenge_type": "blink",
    "instructions": "Please blink your eyes once",
    "timeout_secs": 10
  },
  "checks": [
    {
      "name": "blink_detection",
      "passed": true,
      "score": 0.82,
      "reason": "detected eye brightness dip of 23.5%, consistent with blink"
    }
  ]
}
```

## Score Thresholds

| Score | Meaning |
|---|---|
| `> 0.6` | Challenge completed successfully |
| `0.3 - 0.6` | Partial completion — retry recommended |
| `< 0.3` | Challenge failed or not attempted |

## Requirements

- **Frames**: Minimum 2 frames for blink/nod/smile, 3 for head turns
- **Timing**: Frames should be captured during the action (not all before or after)
- **Quality**: Minimum 640x480 resolution recommended
- **Permission**: `active_liveness:run` (granted to `service` and `admin` roles)

## Anti-Spoofing Coverage

| Attack Type | Detected |
|---|---|
| Static photo | ✅ |
| Screen replay | ✅ |
| Video replay | ⚠️ Partial (random challenge defeats pre-recorded videos) |
| Pre-recorded video | ✅ (challenge is random, not predictable) |
| Live streaming attack | ⚠️ Limited (requires low-latency detection) |
