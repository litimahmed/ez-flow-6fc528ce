import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getAllPartners } from "@/services/api";
import type { PartnerResponse } from "@/types/partner";
import { 
  Building2,
  Plus,
  Loader2,
  Mail,
  Phone,
  Globe,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function PartnerList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<PartnerResponse[]>([]);

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
            <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
          <p className="text-muted-foreground">Manage all partners</p>
        </div>
        <Button onClick={() => navigate("/content/partners/create")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="shadow-elegant hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {partner.nom_partenaire}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {partner.description}
                  </CardDescription>
                </div>
                {partner.actif !== undefined && (
                  <Badge variant={partner.actif ? "default" : "secondary"}>
                    {partner.actif ? "Active" : "Inactive"}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {partner.type_partenaire && (
                <Badge variant="outline">{partner.type_partenaire}</Badge>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{partner.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{partner.telephone}</span>
                </div>
                {partner.site_web && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a href={partner.site_web} target="_blank" rel="noopener noreferrer" className="truncate hover:text-primary">
                      {partner.site_web}
                    </a>
                  </div>
                )}
              </div>

              {partner.date_deb && partner.date_fin && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(partner.date_deb), "MMM d, yyyy")} - {format(new Date(partner.date_fin), "MMM d, yyyy")}
                  </span>
                </div>
              )}

              <Button 
                onClick={() => navigate(`/content/partners/edit/${partner.id}`)} 
                className="w-full mt-4"
                variant="outline"
              >
                Edit Partner
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
