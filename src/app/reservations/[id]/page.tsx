import { fetchReservationById } from '@/services/api';
import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DeleteReservationButton from '../DeleteReservationButton';
import { UpdateReservationForm } from '../UpdateReservationForm';

type Reservation = {
    id: string;
    passenger: { firstName: string; lastName: string; gender: string; age: number; nationality: string };
    flight: { departureDate: string; arrivalAirport: string; pilotName: string; status: string };
    airport: { name: string; countryCode: string; countryName: string; continent: string };
};

type Props = {
    params: {
        id: string;
    };
    onUpdate: () => {};
};

const ReservationDetail = async ({ params, onUpdate}: Props) => {
    const { id } = params;

    if (!id) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="p-8">
                    <CardTitle className="text-center">Reservation Not Found</CardTitle>
                </Card>
            </div>
        );
    }

    const reservation = await fetchReservationById(parseInt(id));

    if (!reservation) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Card className="p-8">
                    <CardTitle className="text-center">Reservation Not Found</CardTitle>
                </Card>
            </div>
        );
    }

    const { passenger, flight, airport } = reservation;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold m-6 pt-3">Reservation Details</h1>

            <Card className="border border-gray-200 rounded-lg shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl">
                        Passenger: {passenger.firstName} {passenger.lastName}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">
                        {flight.status}
                    </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Passenger Info */}
                    <div>
                        <span className="font-semibold">Age:</span> {passenger.age}
                    </div>
                    <div>
                        <span className="font-semibold">Gender:</span> {passenger.gender}
                    </div>
                    <div>
                        <span className="font-semibold">Nationality:</span> {passenger.nationality}
                    </div>

                    {/* Flight Info */}
                    <div>
                        <span className="font-semibold">Departure Date:</span> {flight.departureDate}
                    </div>
                    <div>
                        <span className="font-semibold">Airport:</span> {airport.name} (
                        {airport.countryCode})
                    </div>
                    <div>
                        <span className="font-semibold">Pilot Name:</span> {flight.pilotName}
                    </div>

                    {/* Airport Info */}
                    <div>
                        <span className="font-semibold">Country:</span> {airport.countryName} (
                        {airport.countryCode})
                    </div>
                    <div>
                        <span className="font-semibold">Continent:</span> {airport.continent}
                    </div>
                </CardContent>

                <CardFooter>
                    <Link href="/reservations">
                        <Button variant="default" size="sm">
                            Back to Reservations
                        </Button>
                    </Link>
                    <UpdateReservationForm reservation={reservation} onUpdate={onUpdate} />
                    <DeleteReservationButton id={id} />
                </CardFooter>
            </Card>
        </div>
    );
};

export default ReservationDetail;
