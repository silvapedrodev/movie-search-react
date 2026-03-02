'use client'

import { useState } from "react"
import { User } from "lucide-react"

import { useAuth } from "@/context/auth-context"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InputContainer } from "./elements/input-container"
import { useRouter } from "next/navigation"
import { useUpdateUsername } from "@/hooks/use-update-username"
import { useMutation } from "@tanstack/react-query"
import { deleteAccount } from "@/actions/delete-account"

export function UpdateProfileForm() {
  const { username, initialName, email, clearProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [updatedUsername, setUpdatedUsername] = useState(username || "")

  const router = useRouter()
  const mutation = useUpdateUsername()

  const deleteMutation = useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      clearProfile()
      router.push("/auth/login")
    },
  })

  function handleCancel() {
    setUpdatedUsername(username || "")
    setIsEditing(false)
  }

  const handleSave = () => {
    mutation.mutate(updatedUsername, {
      onSuccess: () => setIsEditing(false),
    })
  }

  const handleChangePassword = () => {
    router.push('/auth/forgot-password')
  }

  const handleDeleteAccount = () => {
    if (!confirm("lorem")) return
    deleteMutation.mutate()
  }

  return (
    <div className="">
      <Card className="bg-slate-900 text-white border border-purple-900/30">
        <CardContent className="flex flex-col gap-6">

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-28 h-28 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-semibold">
              {initialName}
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{username}</p>
              <p className="text-muted-foreground text-sm">{email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <InputContainer>
              <User />
              <Input
                id="username"
                type="text"
                value={updatedUsername}
                disabled={!isEditing}
                maxLength={12}
                onChange={(e) =>
                  setUpdatedUsername(e.target.value.replace(/\s/g, ""))
                }
                className="border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550"
              />
            </InputContainer>
            {mutation.isError && (
              <p className="text-red-500 text-sm">Error updating username.</p>
            )}

          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-gray-600">Email</Label>
            <InputContainer className="border-gray-700">
              <Input
                id="email"
                type="email"
                value={email ?? ""}
                disabled
                className="border-none text-white shadow-none focus-visible:ring-0 selection:bg-purple-550 hover:cursor-not-allowed"
              />
            </InputContainer>
          </div>

          <div>
            <Button
              type="button"
              variant="secondary"
              disabled={!isEditing}
              onClick={handleChangePassword}
              className="w-full py-5 bg-transparent border border-slate-700 text-slate-500 hover:bg-slate-700/80 hover:cursor-pointer"
            >
              Change Password
            </Button>
          </div>

          <div>
            <Button
              type="button"
              variant="destructive"
              disabled={!isEditing || deleteMutation.isPending}
              onClick={handleDeleteAccount}
              className="w-full py-5 bg-transparent border text-red-500 hover:text-white border-red-500 hover:cursor-pointer"
            >
              {deleteMutation.isPending ? "Deletando..." : "Delete Account"}
            </Button>
          </div>

          <div className="flex justify-end gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-purple-850 hover:bg-purple-850/50 cursor-pointer"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancel}
                  className="bg-slate-600 hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSave}
                  disabled={updatedUsername.trim() === "" || mutation.isPending}
                  className="bg-purple-550 hover:bg-purple-850/50 cursor-pointer"
                >
                  {mutation.isPending ? "Salving..." : "Save"}
                </Button>

              </>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}