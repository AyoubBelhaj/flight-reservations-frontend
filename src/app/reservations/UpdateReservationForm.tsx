'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';


type Reservation = {
    id: string;
    passenger: { firstName: string; lastName: string; gender: string; age: number; nationality: string };
    flight: { departureDate: string; arrivalAirport: string; pilotName: string; status: string };
    airport: { name: string; countryCode: string; countryName: string; continent: string };
};

type Props = {
    reservation: Reservation;
    onUpdate: () => void; // Callback to refresh the data after updating
};

export const UpdateReservationForm = ({ reservation, onUpdate }: Props) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(reservation);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name.includes('.') ? updateNestedValue(prevData, name, value) : value,
        }));
    };

    const updateNestedValue = (obj: any, key: string, value: any) => {
        const keys = key.split('.');
        const lastKey = keys.pop()!;
        const deepObj = keys.reduce((acc, curr) => acc[curr], obj);
        deepObj[lastKey] = value;
        return obj;
    };

    const handleUpdateReservation = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:3000/reservations/${reservation.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Reservation updated successfully');
                setOpen(false);
                router.push(`/reservations/${reservation.id}`);
            } else {
                alert('Failed to update reservation');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while updating the reservation');
        } finally {
            setIsUpdating(false);
            
        }
    };

    return (
        <div>
            <Button variant="outline" onClick={() => setOpen(true)}>
                Update Reservation
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] sm:max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Reservation</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateReservation();
                        }}
                    >
                        <div className="grid gap-4 py-4">
                            {/* Passenger Info */}
                            <div>
                                <Label htmlFor="passenger.firstName">First Name</Label>
                                <Input
                                    id="passenger.firstName"
                                    name="passenger.firstName"
                                    value={formData.passenger.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="passenger.lastName">Last Name</Label>
                                <Input
                                    id="passenger.lastName"
                                    name="passenger.lastName"
                                    value={formData.passenger.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="passenger.gender">Gender</Label>
                                <Input
                                    id="passenger.gender"
                                    name="passenger.gender"
                                    value={formData.passenger.gender}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="passenger.age">Age</Label>
                                <Input
                                    id="passenger.age"
                                    name="passenger.age"
                                    type="number"
                                    value={formData.passenger.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="passenger.nationality">Nationality</Label>
                                <Input
                                    id="passenger.nationality"
                                    name="passenger.nationality"
                                    value={formData.passenger.nationality}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Flight Info */}
                            <div>
                                <Label htmlFor="flight.departureDate">Departure Date</Label>
                                <Input
                                    id="flight.departureDate"
                                    name="flight.departureDate"
                                    type="date"
                                    value={formData.flight.departureDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="flight.arrivalAirport">Arrival Airport</Label>
                                <Input
                                    id="flight.arrivalAirport"
                                    name="flight.arrivalAirport"
                                    value={formData.flight.arrivalAirport}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="flight.pilotName">Pilot Name</Label>
                                <Input
                                    id="flight.pilotName"
                                    name="flight.pilotName"
                                    value={formData.flight.pilotName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="flight.status">Flight Status</Label>
                                <Input
                                    id="flight.status"
                                    name="flight.status"
                                    value={formData.flight.status}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Airport Info */}
                            <div>
                                <Label htmlFor="airport.name">Airport Name</Label>
                                <Input
                                    id="airport.name"
                                    name="airport.name"
                                    value={formData.airport.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="airport.countryCode">Country Code</Label>
                                <Input
                                    id="airport.countryCode"
                                    name="airport.countryCode"
                                    value={formData.airport.countryCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="airport.countryName">Country Name</Label>
                                <Input
                                    id="airport.countryName"
                                    name="airport.countryName"
                                    value={formData.airport.countryName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="airport.continent">Continent</Label>
                                <Input
                                    id="airport.continent"
                                    name="airport.continent"
                                    value={formData.airport.continent}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Update'}
                            </Button>
                            <Button variant="link" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
