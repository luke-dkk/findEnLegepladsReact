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
}
}



export default playGroundApiFacade;