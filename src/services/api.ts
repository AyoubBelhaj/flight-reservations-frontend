const BASE_URL = "http://localhost:3000";


export const fetchReservations = async () => {
    const response = await fetch(`${BASE_URL}/reservations`);
    if (!response.ok) throw new Error('Failed to fetch reservations');
    const data = await response.json();
    console.log(Array.isArray(data)); // Ensure it's an array
    return data;
};

export const fetchReservationById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/reservations/${id}`);
    if (!response.ok) throw new Error("Failed to fetch reservation");
    const data = response.json();
    console.log(Array.isArray(data));
    return data;
};

export const fetchPassengers = async () => {
    const response = await fetch(`${BASE_URL}/passengers`);
    if (!response.ok) throw new Error("Failed to fetch passengers");
    const data = response.json();
    console.log(Array.isArray(data));
    return data;
};


export const fetchPassengerById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/passengers/${id}`);
    if (!response.ok) throw new Error("Failed to fetch passenger");
    const data = response.json();
    console.log(Array.isArray(data));
    return data;
};

export const fetchFlights = async () => {
    const response = await fetch(`${BASE_URL}/flights`);
    if (!response.ok) throw new Error("Failed to fetch passengers");
    const data = response.json();
    console.log(Array.isArray(data));
    return data;
};

export const fetchAirports = async () => {
    const response = await fetch(`${BASE_URL}/airports`);
    if (!response.ok) throw new Error("Failed to fetch passengers");
    const data = response.json();
    console.log(Array.isArray(data));
    return data;
};