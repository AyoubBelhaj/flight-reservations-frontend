"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, PieChart, Pie, Cell, Label } from 'recharts';
import { fetchReservations } from '@/services/api';
import { continentMapping } from './continentMapping';
import { useTheme } from 'next-themes';

// Use the defined types for the state
interface Flight {
  status: 'On Time' | 'Delayed' | 'Cancelled';
}

interface Passenger {
  gender: 'Male' | 'Female';
  nationality: string;
  age: number;  // Assuming an age field
}

interface Airport {
  name: string;
  countryCode: string;
  countryName: string;
  continent: string;
  airportCode: string;
}

interface Reservation {
  flight: Flight;
  passenger: Passenger;
  airport: Airport;  // Assuming an airport field
}

const FlightAnalysisWithCards = () => {
  const { theme } = useTheme()
  const [data, setData] = useState<Reservation[]>([]);  // Specify the type as Reservation[]

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await fetchReservations();
      setData(reservations);
    };

    fetchData();
  }, []);

  // Gender Distribution (Pie Chart)
  const genderData = [
    { name: "Female", value: data.filter(item => item.passenger.gender === "Female").length, fill: "hsl(var(--chart-1))" },
    { name: "Male", value: data.filter(item => item.passenger.gender === "Male").length, fill: "hsl(var(--chart-2))" }
  ];

  // Flight Status Distribution (Bar Chart)
  const flightStatusData = [
    { name: 'On Time', value: data.filter(item => item.flight.status === 'On Time').length, fill:"hsl(var(--chart-2))" },
    { name: 'Delayed', value: data.filter(item => item.flight.status === 'Delayed').length,fill:"hsl(var(--chart-4))" },
    { name: 'Cancelled', value: data.filter(item => item.flight.status === 'Cancelled').length,fill:"hsl(var(--chart-1))" },
  ];

  // Nationality Distribution (Area Chart)
  const nationalityData = data.reduce((acc: any, item) => {
    const nationality = item.passenger.nationality;
    acc[nationality] = (acc[nationality] || 0) + 1;
    return acc;
  }, {});

  const nationalityChartData = Object.entries(nationalityData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Age Distribution (Pie Chart)
  const ageData = [
    { name: "Under 18", value: data.filter(item => item.passenger.age < 18).length, fill: "hsl(var(--chart-1))" },
    { name: "18-35", value: data.filter(item => item.passenger.age >= 18 && item.passenger.age <= 35).length, fill: "hsl(var(--chart-2))" },
    { name: "36-50", value: data.filter(item => item.passenger.age >= 36 && item.passenger.age <= 50).length, fill: "hsl(var(--chart-3))" },
    { name: "51+", value: data.filter(item => item.passenger.age > 50).length, fill: "hsl(var(--chart-4))" }
  ];

  // Reservation by Airport (Bar Chart)
  const airportData = data.reduce((acc: any, item) => {
    const airport = item.airport.countryCode;
    acc[airport] = (acc[airport] || 0) + 1;
    return acc;
  }, {});

  const airportChartData = Object.entries(airportData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Continent Distribution (Area Chart)
  const continents = continentMapping;

  const continentData = data.reduce((acc: any, item) => {
    const continent = continents[item.passenger.nationality] || 'Unknown';
    acc[continent] = (acc[continent] || 0) + 1;
    return acc;
  }, {});

  const continentChartData = Object.entries(continentData).map(([key, value]) => ({
    name: key,
    value,
  }));

  // Loading state
  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 pt-5 mb-6 pb-6" style={{ marginTop: '100px' }}>
      {/* Gender Distribution and Age Distribution */}
      <Card className="h-[400px] ml-9">
        <CardHeader>Gender Distribution</CardHeader>
        <CardContent className="flex justify-center items-center h-[250px]">
          <PieChart width={300} height={200}>
            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </CardContent>
      </Card>

      <Card className="h-[400px] mr-9">
        <CardHeader>Age Distribution</CardHeader>
        <CardContent className="flex justify-center items-center h-[250px]">
          <PieChart width={300} height={200}>
            <Tooltip />
            <Pie data={ageData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan fontSize="16" fill="#8884d8">Total</tspan>
                        <tspan x={viewBox.cx} y={viewBox.cy! + 15} fontSize="14" fill="#8884d8">
                          {ageData.reduce((acc, item) => acc + item.value, 0)}
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
            <Legend />
          </PieChart>
          
        </CardContent>
      </Card>

      {/* Flight Status and Reservation by Airport */}
      <Card className='ml-9'>
        <CardHeader>Flight Status</CardHeader>
        <CardContent>
          <BarChart width={400} height={200} data={flightStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>

      <Card className='mr-9'>
        <CardHeader>Reservation by Airport</CardHeader>
        <CardContent>
          <BarChart width={400} height={200} data={airportChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Nationality Distribution and Continent Distribution */}
      <div className="grid grid-cols-1 gap-4 mt-6 ml-9">
        <Card className='w-[1000px]'>
          <CardHeader>Nationality Distribution</CardHeader>
          <CardContent>
            <AreaChart width={900} height={400} data={nationalityChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Continent Distribution</CardHeader>
          <CardContent>
            <BarChart width={400} height={200} data={continentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlightAnalysisWithCards;
