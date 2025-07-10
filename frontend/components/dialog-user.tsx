"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "@/app/actions/user"
import { useState, useTransition } from "react";

export function DialogDemo({ names, email }: { names: string, email: string }) {
  const [open, setOpen] = useState(true);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    await updateUserProfile(formData);
    setOpen(false); // Cierra el diálogo si todo sale bien
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formData => {
            startTransition(() => handleSubmit(formData));
          }}
        >
          <div className="grid gap-4">

            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" defaultValue={email} readOnly />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="name-1">Names</Label>
              <Input id="name-1" name="name" defaultValue={names} readOnly />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue=""
                placeholder="@username"
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
        {
          pending && <p className="text-sm text-gray-500">Saving...</p>
        }
      </DialogContent>
    </Dialog>
  )
}
