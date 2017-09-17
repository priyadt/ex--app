export const getVehicleData = () => {
     {
      return dispatch({type:'GET_VEHICLE_DATA', vehicleData: data});

    }
};

export const setVehicleData = (vehicleData) => {
    return {
        type: 'GET_VEHICLE_DATA',
        payload: vehicleData
    }
};
