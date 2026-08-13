# NUI Events

### Logo
Change logo position: <br>
```lua
SendNUIMessage({
    action = 'setLogoPosition', 
    data = 'tl', 'tc', 'tr', 'bl', 'bc', 'br'
})
```

Change logo visibility: <br>
```lua
SendNUIMessage({
    action = 'setLogoVisibility', 
    data = true, false
})
```
### Speedometer
```lua
SendNUIMessage({
    action = "updateSpeedometer",
    data = {
        speed        = GetEntitySpeed(vehicle) * 3.6,
        rpm          = GetVehicleCurrentRpm(vehicle),
        fuel         = GetVehicleFuelLevel(vehicle) / 100.0,
        gear         = GetVehicleCurrentGear(vehicle),
        seatbelt     = GetPedInVehicleSeat(vehicle, -1) ~= 0,
        engineOn     = GetIsVehicleEngineRunning(vehicle),
        engineHealth = GetVehicleEngineHealth(vehicle) / 1000.0,
        lightsOn     = GetVehicleLightsState(vehicle),
        visible      = true, false
    }
})
```