import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createAboutNous } from "@/services/api";
import { Loader2, Save, FileText } from "lucide-react";
import { AboutNousPayload } from "@/types/aboutUs";

const AboutUs = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AboutNousPayload>({
    titre: "",
    contenu: "",
    version: 1,
    active: "true",
    mission: "",
    vision: "",
    valeurs: null,
  });

  const handleChange = (field: keyof AboutNousPayload, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.contenu) {
      toast({ 
        title: "Validation Error", 
        description: "Title and content are required.", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);
    try {
      await createAboutNous({
        ...formData,
        date_publication: new Date().toISOString(),
      });
      toast({ 
        title: "Success", 
        description: "About Us content created successfully.", 
        variant: "success" 
      });
      // Reset form
      setFormData({
        titre: "",
        contenu: "",
        version: 1,
        active: "true",
        mission: "",
        vision: "",
        valeurs: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create content.";
      toast({ 
        title: "Error", 
        description: errorMessage, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">About Us Management</h1>
          <p className="text-muted-foreground">Create and manage your About Us content</p>
        </div>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Add New Content</CardTitle>
          <CardDescription>Fill in the details for your About Us page</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titre">Title *</Label>
                <Input
                  id="titre"
                  placeholder="Enter title"
                  value={formData.titre}
                  onChange={(e) => handleChange("titre", e.target.value)}
                  disabled={isLoading}
                  maxLength={255}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version *</Label>
                <Input
                  id="version"
                  type="number"
                  min={0}
                  max={2147483647}
                  value={formData.version}
                  onChange={(e) => handleChange("version", parseInt(e.target.value) || 0)}
                  disabled={isLoading}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contenu">Content *</Label>
              <Textarea
                id="contenu"
                placeholder="Enter main content"
                value={formData.contenu}
                onChange={(e) => handleChange("contenu", e.target.value)}
                disabled={isLoading}
                rows={5}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="active">Status *</Label>
              <Select
                value={formData.active}
                onValueChange={(value) => handleChange("active", value)}
                disabled={isLoading}
              >
                <SelectTrigger className="focus:ring-0 focus:ring-offset-0 focus:border-primary">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission">Mission</Label>
              <Textarea
                id="mission"
                placeholder="Enter your mission statement"
                value={formData.mission || ""}
                onChange={(e) => handleChange("mission", e.target.value)}
                disabled={isLoading}
                rows={3}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                placeholder="Enter your vision statement"
                value={formData.vision || ""}
                onChange={(e) => handleChange("vision", e.target.value)}
                disabled={isLoading}
                rows={3}
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Content
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
