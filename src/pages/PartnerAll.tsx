import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAllPartners, deletePartner } from "@/services/api";
import type { PartnerResponse } from "@/types/partner";
import { 
  Building2,
  Edit,
  Plus,
  Loader2,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

export default function PartnerAll() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<PartnerResponse[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const data = await getAllPartners();
      setPartners(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch partners");
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (partnerId: number) => {
    setPartnerToDelete(partnerId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!partnerToDelete) return;

    try {
      setDeleting(true);
      await deletePartner(partnerToDelete);
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
      fetchPartners();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete partner",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setPartnerToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (partners.length === 0) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Partners</h2>
            <p className="text-muted-foreground">No partners found</p>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Partners</h3>
              <p className="text-muted-foreground max-w-md">
                Get started by adding your first partner
              </p>
            </div>
            <Button onClick={() => navigate("/content/partners/create")} size="lg" className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Add Partner
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">All Partners</h2>
            <p className="text-muted-foreground">Manage all partner information</p>
          </div>
          <Button onClick={() => navigate("/content/partners/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Partner
          </Button>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Partner Directory
            </CardTitle>
            <CardDescription>All partner entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {partner.nom_partenaire}
                      </div>
                    </TableCell>
                    <TableCell>
                      {partner.type_partenaire && (
                        <Badge variant="outline">{partner.type_partenaire}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{partner.email}</div>
                        <div className="text-muted-foreground">{partner.telephone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {partner.date_deb && partner.date_fin && (
                        <div>
                          {format(new Date(partner.date_deb), "MMM d, yy")} - {format(new Date(partner.date_fin), "MMM d, yy")}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={partner.actif ? "default" : "secondary"}>
                        {partner.actif ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/content/partners/edit/${partner.id}`)}
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(partner.id!)}
                          className="gap-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the partner.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
