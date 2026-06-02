const API_BASE_URL = 'https://findenlegeplads.team-ice.dk/api/'


const playGroundApiFacade = {
    async getAllPlaygrounds() {
        try{
            const response = await fetch(`${API_BASE_URL}playgrounds`);
            if (!response.ok) {
                throw new Error('Failed to fetch playgrounds');
            }
            const data = await response.json()
            console.log('Fetched playgrounds:', data);
            return Array.isArray(data) ? data : data.playgrounds || [];
        }
        catch (error) {
            console.error('Error fetching playgrounds:', error);
            throw error;
        }
    },
    
    async getAllFacilities() {
        try {
            const response = await fetch(`${API_BASE_URL}facility`);
            if (!response.ok) {
                throw new Error('Failed to fetch facilities');
            }
            const data = await response.json();
            console.log('Fetched facilities:', data);
            return Array.isArray(data) ? data : data.facilities || [];
        } catch (error) {
            console.error('Error fetching facilities:', error);
            throw error;
        }
    },



    async getPlaygroundById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}playgrounds/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch playground with id: ${id}`);
        }

        const data = await response.json();
        console.log('Fetched playground:', data);

        return data;
    } catch (error) {
        console.error('Error fetching playground:', error);
        throw error;
    }
  },


   async getActiveCheckIns(userId) {
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(
      `${API_BASE_URL}checkin/${userId}`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch check-in status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched check-in status:", data);

    return data;
  } catch (error) {
    console.error("Error fetching check-in status:", error);
    throw error;
  }
}
}
export default playGroundApiFacade;