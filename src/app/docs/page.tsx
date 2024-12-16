"use client"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter} from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function DocsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6" suppressHydrationWarning>
      <h1 className="text-4xl font-bold mt-6 pt-6">API Documentation</h1>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Reservation Service</h2>
          <Textarea defaultValue={"Manage reservations, passengers, flights, and airports."} disabled className="text-gray-500"/>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">Endpoints</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">GET /reservations</h4>
              <p>This endpoint returns all reservations in the system.</p>
              <Badge className="bg-green-500 text-white">GET</Badge>
            </div>

            <div>
              <h4 className="font-medium">GET /reservations/:id</h4>
              <p>Fetch a specific reservation by its ID.</p>
              <Badge className="bg-green-500 text-white">GET</Badge>
            </div>

            <div>
              <h4 className="font-medium">POST /reservations</h4>
              <p>Create a new reservation. You must provide passenger, flight, and airport details in the request body.</p>
              <Badge className="bg-blue-500 text-white">POST</Badge>
            </div>

            <div>
              <h4 className="font-medium">PUT /reservations/:id</h4>
              <p>Update an existing reservation by ID.</p>
              <Badge className="bg-orange-500 text-white">PUT</Badge>
            </div>

            <div>
              <h4 className="font-medium">DELETE /reservations/:id</h4>
              <p>Delete a reservation by its ID.</p>
              <Badge className="bg-red-500 text-white">DELETE</Badge>
            </div>
          </div>

          <h3 className="mt-8 text-xl font-semibold">Models</h3>
          <Table>
            <TableCaption>List of models used in the Reservation Service.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Model</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Reservation</TableCell>
                <TableCell>Represents a booking with passenger, flight, and airport data.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Passenger</TableCell>
                <TableCell>Represents a passenger, with personal and nationality details.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Flight</TableCell>
                <TableCell>Represents a flight with details such as departure date, arrival airport, and pilot name.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Airport</TableCell>
                <TableCell>Represents an airport with name, country code, and airport code.</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="mt-8 text-xl font-semibold">Error Handling</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaExclamationCircle className="mr-2 text-red-500" />
              <span>404 Not Found: When a reservation, passenger, or flight is not found.</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" />
              <span>201 Created: When a new reservation is successfully created.</span>
            </div>
            <div className="flex items-center">
              <FaExclamationCircle className="mr-2 text-yellow-500" />
              <span>500 Internal Server Error: If something goes wrong with the server.</span>
            </div>
          </div>

          <Button className="mt-6" variant="outline" color="blue" onClick={() => window.location.href = '/'}>Go Back to Home</Button>
        </CardContent>
      </Card>
    </div>
  );
}
