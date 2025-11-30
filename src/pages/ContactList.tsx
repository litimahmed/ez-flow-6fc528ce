import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getContact } from "@/services/api";
import type { ContactResponse } from "@/types/contact";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Edit,
  Plus,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ContactList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<ContactResponse | null>(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const data = await getContact();
      setContact(data);
    } catch (error) {
      console.error("No contact found");
      setContact(null);
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

  if (!contact) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
            <p className="text-muted-foreground">No contact information found</p>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">No Contact Information</h3>
              <p className="text-muted-foreground max-w-md">
                Get started by creating your company's contact information
              </p>
            </div>
            <Button onClick={() => navigate("/content/contact/create")} size="lg" className="gap-2 mt-4">
              <Plus className="h-4 w-4" />
              Create Contact Information
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
          <p className="text-muted-foreground">View your company contact details</p>
        </div>
        <Button onClick={() => navigate("/content/contact/edit")} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Contact
        </Button>
      </div>

      {contact.message_acceuil && (
        <Card className="shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Building2 className="h-5 w-5" />
              Welcome Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{contact.message_acceuil}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Company contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contact.nom && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Organization</p>
                  <p className="text-base font-semibold">{contact.nom}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a href={`mailto:${contact.email}`} className="text-base font-semibold hover:text-primary transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <a href={`tel:${contact.telephone}`} className="text-base font-semibold hover:text-primary transition-colors">
                  {contact.telephone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Working Hours</p>
                <p className="text-base font-semibold">{contact.horaires}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location
            </CardTitle>
            <CardDescription>Address information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{contact.wilaya}</Badge>
                <Badge variant="outline">{contact.ville}</Badge>
              </div>
              <p className="text-base font-medium pt-2">{contact.adresse}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media & Web */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Online Presence
          </CardTitle>
          <CardDescription>Website and social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {contact.site_web && (
              <a 
                href={contact.site_web} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <p className="text-sm font-semibold truncate">{contact.site_web}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.facebook && (
              <a 
                href={contact.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Facebook</p>
                  <p className="text-sm font-semibold truncate">{contact.facebook}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.instagram && (
              <a 
                href={contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">Instagram</p>
                  <p className="text-sm font-semibold truncate">{contact.instagram}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.tiktok && (
              <a 
                href={contact.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">TikTok</p>
                  <p className="text-sm font-semibold truncate">{contact.tiktok}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.linkedin && (
              <a 
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                  <p className="text-sm font-semibold truncate">{contact.linkedin}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}

            {contact.x && (
              <a 
                href={contact.x} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">X (Twitter)</p>
                  <p className="text-sm font-semibold truncate">{contact.x}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {(contact.date_creation || contact.date_modification) && (
        <Card className="shadow-elegant bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex gap-6 text-sm text-muted-foreground">
              {contact.date_creation && (
                <div>
                  <span className="font-medium">Created:</span> {new Date(contact.date_creation).toLocaleDateString()}
                </div>
              )}
              {contact.date_modification && (
                <div>
                  <span className="font-medium">Last Modified:</span> {new Date(contact.date_modification).toLocaleDateString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
