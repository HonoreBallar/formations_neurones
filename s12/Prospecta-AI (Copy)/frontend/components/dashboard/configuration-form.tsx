"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Target, Users, Briefcase, Zap } from "lucide-react"
import { campaignsApi, type CampaignConfig } from "@/lib/api"

const configurationSchema = z.object({
  campaignName: z.string().min(1, "Le nom de la campagne est requis"),
  product: z.string().min(1, "La description du produit est requise"),
  targetMarket: z.string().min(1, "Le marché cible est requis"),
  geography: z.string().min(1, "La zone géographique est requise"),
  companySize: z.string().min(1, "La taille d'entreprise est requise"),
  industry: z.string().min(1, "Le secteur d'activité est requis"),
  prospectCount: z.string().min(1, "Le nombre de prospects est requis"),
  budget: z.string().min(1, "Le budget est requis"),
  duration: z.string().min(1, "La durée est requise"),
  objectives: z.string().min(1, "Les objectifs sont requis"),
  additionalCriteria: z.string().optional(),
})

type ConfigurationFormData = z.infer<typeof configurationSchema>

export function ConfigurationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ConfigurationFormData>({
    resolver: zodResolver(configurationSchema),
    defaultValues: {
      campaignName: "",
      product: "",
      targetMarket: "",
      geography: "",
      companySize: "",
      industry: "",
      prospectCount: "",
      budget: "",
      duration: "",
      objectives: "",
      additionalCriteria: "",
    },
  })

  const onSubmit = async (data: ConfigurationFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await campaignsApi.run(data as CampaignConfig)

      if (response.success) {
        window.location.href = "/dashboard/prospection"
      } else {
        setError("Erreur lors du lancement de la campagne")
      }
    } catch (err) {
      console.error("Error running campaign:", err)
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Informations générales
              </CardTitle>
              <CardDescription>Définissez les paramètres de base de votre campagne de prospection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="campaignName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la campagne</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Prospection Tech Startups Q1 2024" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choisissez un nom descriptif pour identifier facilement cette campagne
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du produit/service</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre produit ou service, ses avantages clés et sa proposition de valeur..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Plus la description est détaillée, plus l'IA pourra cibler précisément vos prospects
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objectifs de la campagne</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Générer 100 leads qualifiés, augmenter la notoriété, identifier des partenaires potentiels..."
                        className="min-h-16"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Définissez clairement vos objectifs pour optimiser la stratégie de prospection
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Audience cible
              </CardTitle>
              <CardDescription>Définissez précisément votre marché et vos prospects idéaux</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="targetMarket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marché cible</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: PME du secteur technologique" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secteur d'activité</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un secteur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technologie</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Santé</SelectItem>
                          <SelectItem value="retail">Commerce de détail</SelectItem>
                          <SelectItem value="manufacturing">Industrie</SelectItem>
                          <SelectItem value="education">Éducation</SelectItem>
                          <SelectItem value="consulting">Conseil</SelectItem>
                          <SelectItem value="real-estate">Immobilier</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taille d'entreprise</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la taille" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="startup">Startup (1-10 employés)</SelectItem>
                          <SelectItem value="small">Petite entreprise (11-50 employés)</SelectItem>
                          <SelectItem value="medium">Moyenne entreprise (51-250 employés)</SelectItem>
                          <SelectItem value="large">Grande entreprise (250+ employés)</SelectItem>
                          <SelectItem value="enterprise">Entreprise (1000+ employés)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="geography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone géographique</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la zone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="north-america">Amérique du Nord</SelectItem>
                          <SelectItem value="global">Mondial</SelectItem>
                          <SelectItem value="custom">Zone personnalisée</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Campaign Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Paramètres de campagne
              </CardTitle>
              <CardDescription>Configurez les paramètres d'exécution de votre campagne</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="prospectCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de prospects</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="50">50 prospects</SelectItem>
                          <SelectItem value="100">100 prospects</SelectItem>
                          <SelectItem value="250">250 prospects</SelectItem>
                          <SelectItem value="500">500 prospects</SelectItem>
                          <SelectItem value="1000">1000 prospects</SelectItem>
                          <SelectItem value="custom">Nombre personnalisé</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="500">500€ - 1000€</SelectItem>
                          <SelectItem value="1000">1000€ - 2500€</SelectItem>
                          <SelectItem value="2500">2500€ - 5000€</SelectItem>
                          <SelectItem value="5000">5000€ - 10000€</SelectItem>
                          <SelectItem value="10000">10000€+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durée de campagne</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1week">1 semaine</SelectItem>
                          <SelectItem value="2weeks">2 semaines</SelectItem>
                          <SelectItem value="1month">1 mois</SelectItem>
                          <SelectItem value="3months">3 mois</SelectItem>
                          <SelectItem value="6months">6 mois</SelectItem>
                          <SelectItem value="ongoing">En continu</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additionalCriteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Critères additionnels (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ex: Entreprises ayant levé des fonds récemment, utilisant certaines technologies, présentes sur LinkedIn..."
                        className="min-h-16"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ajoutez des critères spécifiques pour affiner davantage le ciblage
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* AI Configuration Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                Aperçu de la configuration IA
              </CardTitle>
              <CardDescription>
                Nos agents IA utiliseront ces paramètres pour optimiser votre prospection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    Agent Prospecteur
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Recherche automatisée</li>
                    <li>• Filtrage intelligent</li>
                    <li>• Validation des données</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    Agent Qualificateur
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Scoring de pertinence</li>
                    <li>• Analyse comportementale</li>
                    <li>• Priorisation automatique</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-accent" />
                    Agent Optimiseur
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Optimisation continue</li>
                    <li>• A/B testing automatique</li>
                    <li>• Amélioration des performances</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Réinitialiser
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Lancement...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Lancer la prospection
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
