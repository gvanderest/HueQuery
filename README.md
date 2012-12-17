#HueQuery

A basic Hue control framework driven by jQuery. This project is extremely fresh, not only are we learning more about the Hue API itself, we are collaborating with very different scripting experience.

## Current Focus:
* Decide on a direction for UI
* Unify existing JavaScript/jQuery code and adhere to some arbitrary standards
* Build new UI
* Marvel at the Hue lights until we pass out


---
# Roadmap & Task List
1. Build text fields to be able to input number of bulbs and api hash
2. Build controls (buttons?) for all HueQuery methods
3. Build 3 Sliders
- - Hue (0 - 65535)
- - Brightness (0 - 255)
- - Saturation (0-255)

## Wish List / Lower Priority
* Light movement - Two Modes
* Colour Movement across various lights
 * Single Colour - In a 3-light setup, the first light would fade into the chosen colour, then start to dim while dimming into the second light at an equal rate, until the next light, to the next
 * In a multi Colour Environment, each colour could be set and then they would rotate around in a chosen index (Lights 1 through [x] could be re-ordered so the colours move from specific rooms, rather than through the actual bulb numbers)
* Individual Light Pulsing
 * Range settable by [low] and [high] variable
 * Pulse algorithm can apply to one or multiple lights
* Light Schedules with option for weekday-only setting (ie: Sunshine alarm on Work days but not weekends)
