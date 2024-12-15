import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchPassengers } from '@/services/api';
import Image from 'next/image';
import React from 'react';

type Props = {
    searchParams: {
        page?: string;
        limit?: string;
    };
};

const Passengers = async ({ searchParams }: Props) => {
    const passengers = await fetchPassengers();

    // Set default values for pagination
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = parseInt(searchParams.limit || '21', 10);

    // Calculate the total number of pages
    const totalPages = Math.ceil(passengers.length / pageSize);

    // Get the reservations for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentReservations = passengers.slice(startIndex, endIndex);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold m-6 pt-2">Passengers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentReservations.map((passenger: any) => (
                    <Card key={passenger.id} className="space-y-4 p-4 shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16">
                                <Image
                                    className="rounded-full"
                                    src="/images/default.png" // Updated image path
                                    alt="user"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-medium">
                                    {passenger.firstName} {passenger.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {passenger.gender}, {passenger.age} years old
                                </p>
                                <p className="text-sm text-muted-foreground">{passenger.nationality}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            This is a placeholder for additional passenger details or actions.
                        </p>
                    </Card>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-8">
                <Button  disabled={currentPage === 1}>
                    <a
                        href={`?page=${currentPage - 1}&limit=${pageSize}`}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'disabled:bg-gray-400' : ''}`}
                        aria-disabled={currentPage === 1}
                        // Disabled button when on the first page
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

export default Passengers;
