import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createContact } from "@/services/api";
import type { ContactPayload } from "@/types/contact";
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
  MessageSquare,
  Save,
  Loader2,
  ArrowLeft
} from "lucide-react";

export default function ContactCreate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactPayload>({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    wilaya: "",
    horaires: "",
    site_web: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    x: "",
    message_acceuil: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createContact(formData);
      toast({
        title: "Success",
        description: "Contact information created successfully",
      });
      navigate("/content/contact");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create contact information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ContactPayload, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value || null
    }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/content/contact")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Contact Information</h2>
          <p className="text-muted-foreground">Add your company's contact details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="space-y-2">
                <Label htmlFor="nom">Organization Name</Label>
                <Input
                  id="nom"
                  value={formData.nom || ""}
                  onChange={(e) => handleChange("nom", e.target.value)}
                  placeholder="Enter organization name"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="contact@example.com"
                  maxLength={254}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone *
                </Label>
                <Input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  placeholder="+213 XXX XXX XXX"
                  maxLength={128}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaires" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Working Hours *
                </Label>
                <Input
                  id="horaires"
                  required
                  value={formData.horaires}
                  onChange={(e) => handleChange("horaires", e.target.value)}
                  placeholder="Mon-Fri: 9:00 AM - 5:00 PM"
                  maxLength={255}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location Details
              </CardTitle>
              <CardDescription>Address and location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adresse">Address *</Label>
                <Input
                  id="adresse"
                  required
                  value={formData.adresse}
                  onChange={(e) => handleChange("adresse", e.target.value)}
                  placeholder="Street address"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">City *</Label>
                <Input
                  id="ville"
                  required
                  value={formData.ville}
                  onChange={(e) => handleChange("ville", e.target.value)}
                  placeholder="City name"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wilaya">Wilaya *</Label>
                <Input
                  id="wilaya"
                  required
                  value={formData.wilaya}
                  onChange={(e) => handleChange("wilaya", e.target.value)}
                  placeholder="Wilaya name"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message_acceuil" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Welcome Message
                </Label>
                <Textarea
                  id="message_acceuil"
                  value={formData.message_acceuil || ""}
                  onChange={(e) => handleChange("message_acceuil", e.target.value)}
                  placeholder="Welcome message for visitors"
                  rows={3}
                />
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
            <CardDescription>Website and social media links</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="site_web" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="site_web"
                  type="url"
                  value={formData.site_web || ""}
                  onChange={(e) => handleChange("site_web", e.target.value)}
                  placeholder="https://example.com"
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  type="url"
                  value={formData.facebook || ""}
                  onChange={(e) => handleChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="url"
                  value={formData.instagram || ""}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktok" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  TikTok
                </Label>
                <Input
                  id="tiktok"
                  type="url"
                  value={formData.tiktok || ""}
                  onChange={(e) => handleChange("tiktok", e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin || ""}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  maxLength={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="x" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  X (Twitter)
                </Label>
                <Input
                  id="x"
                  type="url"
                  value={formData.x || ""}
                  onChange={(e) => handleChange("x", e.target.value)}
                  placeholder="https://x.com/..."
                  maxLength={200}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/content/contact")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} size="lg" className="gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Create Contact
          </Button>
        </div>
      </form>
    </div>
  );
}
