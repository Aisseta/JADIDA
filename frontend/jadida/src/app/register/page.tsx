"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  lastname: z.string().min(1, "Nom requis"),
  firstname: z.string().min(1, "Prénom requis"),
  role: z.string().min(1, "Role requis"),
  pseudo: z.string().min(3, "Pseudo trop court"),
  sexe: z.string().min(1, "Sexe requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
  acceptedPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  // Champs optionnels - tu peux les ajouter si besoin
  url_photo_profil: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
});

export default function RegisterPage() {
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3003/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur d'inscription :", errorData);
        return;
      }

      const result = await response.json();
      console.log("Inscription réussie :", result);
      // Ici tu peux rediriger ou afficher un message de succès
    } catch (error) {
      console.error("Erreur lors de la requête d'inscription", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
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
        <FormField
          control={form.control}
          name="sexe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexe</FormLabel>
              <FormControl>
                <Input placeholder="male/female" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  );
}
