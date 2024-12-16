// app/reservations/ReservationForm.tsx (Client Component)
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter, DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';

type Props = {};

export const ReservationForm = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateReservation = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Reservation created successfully');
                setOpen(false);
            } else {
                alert('Failed to create reservation');
            }
        } catch (error) {
            alert('An error occurred while creating the reservation');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="m-3">
            <Button onClick={() => setOpen(true)}>Create New Reservation</Button>

            {open && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px] sm:max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Reservation</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target as HTMLFormElement);
                                const data = Object.fromEntries(formData.entries());

                                // Structure data for nested objects
                                const structuredData = {
                                    passenger: {
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        gender: data.gender,
                                        age: Number(data.age),
                                        nationality: data.nationality,
                                    },
                                    flight: {
                                        departureDate: data.departureDate,
                                        arrivalAirport: data.arrivalAirport,
                                        pilotName: data.pilotName,
                                        status: data.status,
                                    },
                                    airport: {
                                        name: data.airportName,
                                        countryCode: data.countryCode,
                                        countryName: data.countryName,
                                        continent: data.continent,
                                    },
                                };

                                await handleCreateReservation(structuredData);
                            }}

                        >
                            <div className="grid gap-4 py-4">
                                {/* Passenger Info */}
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" name="firstName" required />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" name="lastName" required />
                                </div>
                                <div>
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" name="gender" required />
                                </div>
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" name="age" type="number" required />
                                </div>
                                <div>
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <Input id="nationality" name="nationality" required />
                                </div>

                                {/* Flight Info */}
                                <div>
                                    <Label htmlFor="departureDate">Departure Date</Label>
                                    <Input id="departureDate" name="departureDate" type="date" required />
                                </div>
                                <div>
                                    <Label htmlFor="arrivalAirport">Arrival Airport</Label>
                                    <Input id="arrivalAirport" name="arrivalAirport" required />
                                </div>
                                <div>
                                    <Label htmlFor="pilotName">Pilot Name</Label>
                                    <Input id="pilotName" name="pilotName" required />
                                </div>
                                <div>
                                    <Label htmlFor="status">Flight Status</Label>
                                    <Input id="status" name="status" required />
                                </div>

                                {/* Airport Info */}
                                <div>
                                    <Label htmlFor="airportName">Airport Name</Label>
                                    <Input id="airportName" name="airportName" required />
                                </div>
                                <div>
                                    <Label htmlFor="countryCode">Airport Country Code</Label>
                                    <Input id="countryCode" name="countryCode" required />
                                </div>
                                <div>
                                    <Label htmlFor="countryName">Airport Country Name</Label>
                                    <Input id="countryName" name="countryName" required />
                                </div>
                                <div>
                                    <Label htmlFor="continent">Airport Continent</Label>
                                    <Input id="continent" name="continent" required />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit">Save Reservation</Button>
                                <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
