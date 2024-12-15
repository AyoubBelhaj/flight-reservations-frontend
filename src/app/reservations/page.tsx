// app/reservations/page.tsx (Server Component)
import { fetchReservations } from '@/services/api';
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {
    searchParams: {
        page?: string;
        limit?: string;
    };
};

const Reservations = async ({ searchParams }: Props) => {
    const reservations = await fetchReservations();

    // Set default values for pagination
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = parseInt(searchParams.limit || '21', 10);

    // Calculate the total number of pages
    const totalPages = Math.ceil(reservations.length / pageSize);

    // Get the reservations for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentReservations = reservations.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold m-8">Reservations</h1>

            {/* Display reservations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentReservations.map((reservation: any) => {
                    const { passenger, flight, airport } = reservation;
                    return (
                        <Card key={reservation.passenger.id} className="border border-gray-200 rounded-lg shadow-md cursor-pointer">
                            <CardHeader className='flex flex-row justify-between'>
                                <CardTitle className="text-xl font-semibold">{`${passenger.firstName} ${passenger.lastName}`}</CardTitle>
                                <Link href={`/reservations/${reservation.passenger.id}`} >
                                    <Button className='ml-4'>View</Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Age:</span> {passenger.age}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Flight Status:</span> {flight.status}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Departure Date:</span> {flight.departureDate}
                                    </div>
                                    <div className="text-gray-600">
                                        <span className="font-semibold">Arrival Airport:</span> {airport.name} ({airport.airportCode})
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <span className="text-gray-500">{airport.countryName}</span>
                                <span className="text-sm text-gray-400">{flight.pilotName}</span>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-8">
                <Button>
                    <a
                        href={`?page=${currentPage - 1}&limit=${pageSize}`}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'disabled:bg-gray-400' : ''}`}
                        aria-disabled={currentPage === 1}
                    >
                        Previous
                    </a>
                </Button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <Button>
                    <a
                        href={`?page=${currentPage + 1}&limit=${pageSize}`}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'disabled:bg-gray-400' : ''}`}
                        aria-disabled={currentPage === totalPages}
                    >
                        Next
                    </a>
                </Button>
            </div>
        </div>
    );
};

export default Reservations;
