'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

type Props = {
    id: string;
};

const DeleteReservationButton: React.FC<Props> = ({ id }) => {
    console.log(id);
    
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/reservations/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Reservation deleted successfully');
                router.push('/reservations');
            } else {
                alert('Failed to delete reservation');
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
            alert('An error occurred while deleting the reservation.');
        } finally {
            setOpen(false);
        }
    };

    return (
        <div className='m-2'>
            <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                Delete Reservation
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this reservation?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={handleDelete}>
                            Yes, Delete
                        </Button>
                        <Button variant="default" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DeleteReservationButton;
