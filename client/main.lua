CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local veh = GetVehiclePedIsIn(ped, false)
        
        if IsPedInAnyVehicle(ped, false) then
            SetNuiFocus(false, false)
            SendNUIMessage({
                action = 'updateSpeedometer',
                data = {
                    speed = GetEntitySpeed(veh) * 3.6,
                    rpm = GetVehicleCurrentRpm(veh),
                    gear = GetVehicleCurrentGear(veh),
                    fuel = GetVehicleFuelLevel(veh) / 100,
                    engineOn = GetIsVehicleEngineRunning(veh),
                    engineHealth = GetVehicleEngineHealth(veh) / 1000
                }
            })
        end
        Wait(50)
    end
end)