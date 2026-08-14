local isInsideVehicle = false
local minimap = nil

-- -------------------------------------------------------------------------- --
--                                   Startup                                  --
-- -------------------------------------------------------------------------- --
CreateThread(function()
    minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    SetRadarBigmapEnabled(false, false)
end)

-- -------------------------------------------------------------------------- --
--                               HUD Settings                                 --
-- -------------------------------------------------------------------------- --
CreateThread(function()
    while true do
        if isInsideVehicle then
            DisplayRadar(true)
            SetRadarZoom(0)

            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
        else
            DisplayRadar(false)
        end

        HideHudComponentThisFrame(6)
        HideHudComponentThisFrame(7)
        HideHudComponentThisFrame(8)
        HideHudComponentThisFrame(9)

        Wait(0)
    end
end)

-- -------------------------------------------------------------------------- --
--                              Vehicle detection                             --
-- -------------------------------------------------------------------------- --
CreateThread(function()
    while true do
        local inVehicle = IsPedInAnyVehicle(PlayerPedId(), false)

        if inVehicle ~= isInsideVehicle then
            isInsideVehicle = inVehicle
            SendNUIMessage({ action = 'setSpeedometerVisibility', data = inVehicle })
        end

        Wait(500)
    end
end)

-- -------------------------------------------------------------------------- --
--                               Speedometer                                  --
-- -------------------------------------------------------------------------- --
CreateThread(function()
    while true do
        if isInsideVehicle then
            local ped = PlayerPedId()
            local veh = GetVehiclePedIsIn(ped, false)

            if DoesEntityExist(veh) then
                SendNUIMessage({
                    action = 'updateSpeedometer',
                    data = {
                        speed        = GetEntitySpeed(veh) * 3.6,
                        rpm          = GetVehicleCurrentRpm(veh),
                        gear         = GetVehicleCurrentGear(veh),
                        fuel         = GetVehicleFuelLevel(veh) / 100,
                        engineOn     = GetIsVehicleEngineRunning(veh),
                        engineHealth = GetVehicleEngineHealth(veh) / 1000,
                    }
                })
            end
        end

        Wait(50)
    end
end)