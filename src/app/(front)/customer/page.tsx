import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const pageSize = 8;

  const skip = (currentPage - 1) * pageSize;

  const totalCustomers = await prisma.customer.count();
  const customers = await prisma.customer.findMany({
    skip: skip,
    take: pageSize,
  });

  const totalPages = Math.ceil(totalCustomers / pageSize);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Customer List</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          disabled={currentPage <= 1}
        >
          <Link
            href={`/customer?page=${currentPage - 1}`}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            Previous
          </Link>
        </Button>
        
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          asChild
          disabled={currentPage >= totalPages}
        >
          <Link
            href={`/customer?page=${currentPage + 1}`}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
          >
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
