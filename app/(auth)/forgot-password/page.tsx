"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-secondary/50 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md rounded-3xl border-none bg-card/80 shadow-xl backdrop-blur-sm">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Forgot password?</CardTitle>
          <CardDescription className="text-muted-foreground">
            No worries, we'll send you reset instructions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Form */}
          <form className="space-y-4">
            <div>
              <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="rounded-xl bg-input pl-10" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-primary py-5 text-primary-foreground hover:bg-primary/90 shadow-md"
            >
              Reset Password
            </Button>
          </form>

          {/* Back to login */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
