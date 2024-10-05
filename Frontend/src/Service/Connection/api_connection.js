import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/'
});

// Eventos:
// Obtener todos los eventos:
export const getEvents = async () => {
    const response = await instance.get('/get/events');
    return response.data;
}

// Get event
export const getEvent = async (id) => {
    const response = await instance.get(`/get/event/${id}`);
    return response.data;
}

// add Event:
export const addEvent = async (event) => {
    // form Data:
    const response = await instance.post('/add/event', event, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data;
}

// patch:
export const patchEvent = async (id, event) => {
    try {
        const response = await instance.patch(`/patch/event/${id}`, event, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error patching the event:', error);
        throw error;
    }
};

// deleteEvent
export const deleteEvent = async (id) => {
    const response = await instance.delete(`/delete/event/${id}`);
    return response.data;
}

// Usuarios:
// Login:
export const login = async (userDetails) => {
    const response = await instance.post('/login', userDetails, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}