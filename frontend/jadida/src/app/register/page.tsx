"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Form,FormField,FormItem,FormLabel,FormControl,} from "@/components/ui/form";


const formSchema = z.object({
  lastname: z.string().min(1, "Nom requis"),
  firstname: z.string().min(1, "Prénom requis"),
  role: z.string().min(1, "Rôle requis"),
  pseudo: z.string().min(3, "Pseudo trop court"),
  sexe: z.string().min(1, "Sexe requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
  acceptedPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  url_photo_profil: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
});

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastname: "",
      firstname: "",
      role: "user",
      pseudo: "",
      sexe: "",
      email: "",
      password: "",
      acceptedPrivacyPolicy: false,
    },
  });

  // ✅ Soumission du formulaire
  async function onSubmit(data: z.infer<typeof formSchema>) {
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`; 
    console.log(url);
    
    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur d'inscription :", errorData);
        return;
      }

      const result = await response.json();
      console.log("Inscription réussie :", result);
      router.push("/login"); // redirection si la connexion as
    } catch (error) {
      console.error("Erreur lors de la requête d'inscription", error);
    }
  }

  // ✅ Rendu du formulaire
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Nom */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Dupont" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Prénom */}
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Jean" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Rôle */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <FormControl>
                <Input placeholder="user" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Pseudo */}
        <FormField
          control={form.control}
          name="pseudo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pseudo</FormLabel>
              <FormControl>
                <Input placeholder="jeandup" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Sexe */}
        <FormField
          control={form.control}
          name="sexe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexe</FormLabel>
              <FormControl>
                <Input placeholder="masculin/feminin" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemple@mail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Mot de passe */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Politique de confidentialité */}
        <FormField
          control={form.control}
          name="acceptedPrivacyPolicy"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <input type="checkbox" {...field} id="privacy" />
              <FormLabel htmlFor="privacy" className="mb-0">
                J'accepte la politique de confidentialité
              </FormLabel>
            </FormItem>
          )}
        />

        {/* Bouton */}
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  );
}
