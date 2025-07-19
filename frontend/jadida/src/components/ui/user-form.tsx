"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
  firstname: z.string().min(1, { message: "Prénom requis" }),
  lastname: z.string().min(1, { message: "Nom requis" }),
  pseudo: z.string().min(2, { message: "Pseudo requis" }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter les CGU" }),
  }),
})

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      pseudo: "",
      terms: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Données soumises :", data)
  
  }

  return (
    <div className="rounded-lg border bg-white p-8 shadow-sm w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Créer un compte</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Nom / Prénom côte à côte */}
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre prénom" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="exemple@domaine.com" {...field} />
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
                  <Input type="password" placeholder="Votre mot de passe" {...field} />
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
                  <Input placeholder="Votre pseudo" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Checkbox CGU */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label htmlFor="terms" className="text-sm">
                  J'accepte les conditions générales d'utilisation
                </label>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Créer mon compte
          </Button>
        </form>
      </Form>
    </div>
  )
}
