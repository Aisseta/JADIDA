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

const formSchema = z.object({
  email: z.string().email({ }),
  password: z.string().min(6, {}),
  firstname: z.string().min(1,{}),
  lastname: z.string().min(1, { }),
  pseudo: z.string().min(2, {}),
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
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Données soumises :", data)
    // Logique d'envoi au backend à intégrer ici
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-4">
        
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
          name="firstname"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
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

        <Button type="submit" className="w-full">Enregistrer</Button>
      </form>
    </Form>
  )
}
