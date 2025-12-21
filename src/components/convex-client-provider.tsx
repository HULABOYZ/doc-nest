"use client"

import { ReactNode } from "react"
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react"
import Loader from "./loader"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated> {children}</Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <Loader />
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
