import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchAirports } from '@/services/api';
import React from 'react';

type Props = {
    searchParams: {
        page?: string;
        limit?: string;
    };
};

const Airports = async ({ searchParams }: Props) => {
    // Fetch airport data
    const airports = await fetchAirports();

    // Set default values for pagination
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = parseInt(searchParams.limit || '21', 10);

    // Calculate the total number of pages
    const totalPages = Math.ceil(airports.length / pageSize);

    // Get the airports for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentAirports = airports.slice(startIndex, endIndex);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold m-6 pt-2">Airports</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentAirports.map((airport: any) => (
                    <Card key={airport.id} className="space-y-4 p-4 shadow-md">
                        <div>
                            <h3 className="text-xl font-medium">Airport Information</h3>
                            <p className="text-sm text-muted-foreground">
                                Name: {airport.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Country Code: {airport.countryCode}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Country: {airport.countryName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Continent: {airport.continent}
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

export default Airports;
