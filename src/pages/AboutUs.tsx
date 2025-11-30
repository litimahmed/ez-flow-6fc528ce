import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { createAboutNous } from "@/services/api";
import { Loader2, Save, FileText, Globe, Eye, Sparkles, Target, Lightbulb, Heart } from "lucide-react";
import { AboutNousPayload } from "@/types/aboutUs";

type Language = "en" | "fr" | "ar";

interface MultiLangContent {
  en: AboutNousPayload;
  fr: AboutNousPayload;
  ar: AboutNousPayload;
}

const defaultContent: AboutNousPayload = {
  titre: "",
  contenu: "",
  version: 1,
  active: "true",
  mission: "",
  vision: "",
  valeurs: null,
};

const languageConfig = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" as const },
  fr: { label: "Français", flag: "🇫🇷", dir: "ltr" as const },
  ar: { label: "العربية", flag: "🇸🇦", dir: "rtl" as const },
};

const placeholders = {
  en: {
    titre: "Enter title",
    contenu: "Enter main content describing your company...",
    mission: "Our mission is to...",
    vision: "We envision a world where...",
  },
  fr: {
    titre: "Entrez le titre",
    contenu: "Entrez le contenu principal décrivant votre entreprise...",
    mission: "Notre mission est de...",
    vision: "Nous envisageons un monde où...",
  },
  ar: {
    titre: "أدخل العنوان",
    contenu: "أدخل المحتوى الرئيسي الذي يصف شركتك...",
    mission: "مهمتنا هي...",
    vision: "نتصور عالماً حيث...",
  },
};

const labels = {
  en: {
    title: "Title",
    content: "Content",
    version: "Version",
    status: "Status",
    mission: "Mission Statement",
    vision: "Vision Statement",
    active: "Active",
    inactive: "Inactive",
    save: "Save Content",
    saving: "Saving...",
    preview: "Preview",
  },
  fr: {
    title: "Titre",
    content: "Contenu",
    version: "Version",
    status: "Statut",
    mission: "Énoncé de mission",
    vision: "Énoncé de vision",
    active: "Actif",
    inactive: "Inactif",
    save: "Enregistrer",
    saving: "Enregistrement...",
    preview: "Aperçu",
  },
  ar: {
    title: "العنوان",
    content: "المحتوى",
    version: "الإصدار",
    status: "الحالة",
    mission: "بيان المهمة",
    vision: "بيان الرؤية",
    active: "نشط",
    inactive: "غير نشط",
    save: "حفظ المحتوى",
    saving: "جارٍ الحفظ...",
    preview: "معاينة",
  },
};

const AboutUs = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>("en");
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<MultiLangContent>({
    en: { ...defaultContent },
    fr: { ...defaultContent },
    ar: { ...defaultContent },
  });

  const handleChange = (lang: Language, field: keyof AboutNousPayload, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleSubmit = async (lang: Language) => {
    const data = formData[lang];
    
    if (!data.titre || !data.contenu) {
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
        ...data,
        date_publication: new Date().toISOString(),
      });
      toast({ 
        title: "Success", 
        description: `${languageConfig[lang].label} content created successfully.`, 
        variant: "success" 
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

  const currentData = formData[activeLanguage];
  const currentLabels = labels[activeLanguage];
  const currentPlaceholders = placeholders[activeLanguage];
  const isRTL = languageConfig[activeLanguage].dir === "rtl";

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative p-4 bg-gradient-to-br from-primary to-primary-glow rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">About Us Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage multilingual content for your About Us page</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      {/* Language Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(languageConfig) as Language[]).map((lang) => {
          const config = languageConfig[lang];
          const data = formData[lang];
          const isComplete = data.titre && data.contenu;
          
          return (
            <Card 
              key={lang}
              className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                activeLanguage === lang ? "ring-2 ring-primary shadow-lg" : "hover:border-primary/50"
              }`}
              onClick={() => setActiveLanguage(lang)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{config.flag}</span>
                    <div>
                      <p className="font-semibold text-foreground">{config.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {isComplete ? "Content ready" : "Incomplete"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={isComplete ? "default" : "secondary"} className={isComplete ? "bg-primary" : ""}>
                    {isComplete ? "✓" : "○"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className={`grid ${showPreview ? "lg:grid-cols-2" : "grid-cols-1"} gap-8`}>
        {/* Form Card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{languageConfig[activeLanguage].flag}</span>
                <div>
                  <CardTitle className="text-xl">
                    {languageConfig[activeLanguage].label} Content
                  </CardTitle>
                  <CardDescription>
                    Fill in the details for your About Us page
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="font-mono">
                {languageConfig[activeLanguage].dir.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSubmit(activeLanguage); }} 
              className="space-y-6"
              dir={languageConfig[activeLanguage].dir}
            >
              {/* Title & Version Row */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="titre" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    {currentLabels.title} *
                  </Label>
                  <Input
                    id="titre"
                    placeholder={currentPlaceholders.titre}
                    value={currentData.titre}
                    onChange={(e) => handleChange(activeLanguage, "titre", e.target.value)}
                    disabled={isLoading}
                    maxLength={255}
                    className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                    dir={languageConfig[activeLanguage].dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">{currentLabels.version} *</Label>
                  <Input
                    id="version"
                    type="number"
                    min={0}
                    max={2147483647}
                    value={currentData.version}
                    onChange={(e) => handleChange(activeLanguage, "version", parseInt(e.target.value) || 0)}
                    disabled={isLoading}
                    className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="contenu" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {currentLabels.content} *
                </Label>
                <Textarea
                  id="contenu"
                  placeholder={currentPlaceholders.contenu}
                  value={currentData.contenu}
                  onChange={(e) => handleChange(activeLanguage, "contenu", e.target.value)}
                  disabled={isLoading}
                  rows={6}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
                  dir={languageConfig[activeLanguage].dir}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="active">{currentLabels.status} *</Label>
                <Select
                  value={currentData.active}
                  onValueChange={(value) => handleChange(activeLanguage, "active", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12 focus:ring-0 focus:ring-offset-0 focus:border-primary">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        {currentLabels.active}
                      </span>
                    </SelectItem>
                    <SelectItem value="false">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        {currentLabels.inactive}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Mission & Vision */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mission" className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    {currentLabels.mission}
                  </Label>
                  <Textarea
                    id="mission"
                    placeholder={currentPlaceholders.mission}
                    value={currentData.mission || ""}
                    onChange={(e) => handleChange(activeLanguage, "mission", e.target.value)}
                    disabled={isLoading}
                    rows={4}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
                    dir={languageConfig[activeLanguage].dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision" className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    {currentLabels.vision}
                  </Label>
                  <Textarea
                    id="vision"
                    placeholder={currentPlaceholders.vision}
                    value={currentData.vision || ""}
                    onChange={(e) => handleChange(activeLanguage, "vision", e.target.value)}
                    disabled={isLoading}
                    rows={4}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary resize-none"
                    dir={languageConfig[activeLanguage].dir}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-base font-semibold rounded-xl"
                style={{ background: 'var(--gradient-primary)' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {currentLabels.saving}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {currentLabels.save}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {showPreview && (
          <Card className="border-border/50 shadow-sm h-fit sticky top-8">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">{currentLabels.preview}</CardTitle>
              </div>
            </CardHeader>
            
            <Separator />
            
            <CardContent className="pt-6" dir={languageConfig[activeLanguage].dir}>
              <div className="space-y-6">
                {/* Title Preview */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {currentData.titre || (
                      <span className="text-muted-foreground/50 italic">
                        {currentPlaceholders.titre}
                      </span>
                    )}
                  </h2>
                  <Badge variant="outline" className="mt-2">
                    v{currentData.version}
                  </Badge>
                </div>

                {/* Content Preview */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {currentData.contenu || (
                      <span className="text-muted-foreground/50 italic">
                        {currentPlaceholders.contenu}
                      </span>
                    )}
                  </p>
                </div>

                {/* Mission Preview */}
                {(currentData.mission || showPreview) && (
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm text-primary">{currentLabels.mission}</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {currentData.mission || (
                        <span className="text-muted-foreground/50 italic">
                          {currentPlaceholders.mission}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Vision Preview */}
                {(currentData.vision || showPreview) && (
                  <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-accent" />
                      <span className="font-semibold text-sm text-accent">{currentLabels.vision}</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      {currentData.vision || (
                        <span className="text-muted-foreground/50 italic">
                          {currentPlaceholders.vision}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">{currentLabels.status}:</span>
                  <Badge variant={currentData.active === "true" ? "default" : "secondary"}>
                    {currentData.active === "true" ? currentLabels.active : currentLabels.inactive}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AboutUs;
