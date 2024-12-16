import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchFlights } from '@/services/api';
import React from 'react';

type Props = {
    searchParams: {
        page?: string;
        limit?: string;
    };
};

const Flights = async ({ searchParams }: Props) => {
    // Fetch flight data
    const flights = await fetchFlights();

    // Set default values for pagination
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = parseInt(searchParams.limit || '21', 10);

    // Calculate the total number of pages
    const totalPages = Math.ceil(flights.length / pageSize);

    // Get the flights for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentFlights = flights.slice(startIndex, endIndex);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold m-6 pt-2">Flights</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentFlights.map((flight: any) => (
                    <Card key={flight.id} className="space-y-4 p-4 shadow-md">
                        <div>
                            <h3 className="text-xl font-medium">Flight Information</h3>
                            <p className="text-sm text-muted-foreground">
                                Departure Date: {flight.departureDate}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Arrival Airport: {flight.arrivalAirport}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Pilot: {flight.pilotName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Status: {flight.status}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-8">
                <Button disabled={currentPage === 1}>
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
                <Button disabled={currentPage === totalPages}>
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

export default Flights;