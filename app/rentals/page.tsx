'use client';

import { useUser } from '@clerk/nextjs';
import EmptyList from '@/components/home/EmptyList';
import { fetchRentals, deleteRentalAction } from '@/utils/actions';
import Link from 'next/link';
import { formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
import { useEffect, useState } from 'react';

function RentalsPage() {
  const { user } = useUser();
  const [rentals, setRentals] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rentalsData = await fetchRentals();
      setRentals(rentalsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Check if user is admin
  const isAdmin =
    Array.isArray(user?.publicMetadata?.roles) &&
    user?.publicMetadata.roles.includes('admin');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (rentals.length === 0) {
    return (
      <EmptyList
        heading="No rentals to display."
        message="Don't hesitate to create a rental."
      />
    );
  }

  return (
    <div className="mt-16 bg-white p-8 rounded shadow">
      <h4 className="mb-4 capitalize">
        Active Properties: {rentals.length}
      </h4>
      <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Nightly Rate</TableHead>
            <TableHead>Nights Booked</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental: any) => {
            const { id: propertyId, name, price, totalNightsSum, orderTotalSum } =
              rental;
            return (
              <TableRow key={propertyId}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{totalNightsSum || 0}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/rentals/${propertyId}/edit`}>
                    <IconButton actionType="edit" />
                  </Link>
                  {isAdmin && <DeleteRental propertyId={propertyId} />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteRental({ propertyId }: { propertyId: string }) {
  const deleteRental = deleteRentalAction.bind(null, { propertyId });
  return (
    <FormContainer action={deleteRental}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default RentalsPage;
