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
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden ">
              <img
                src="/logo.svg"
                alt="Logo"
                className="mx-auto h-12 mb-6 animate-bounce"
              />

              <h1 className="text-3xl font-extrabold text-yellow-700 text-center mb-2">
                Welcome Back!
              </h1>
              <p className="text-center text-yellow-600 mb-6">
                Sign in to continue
              </p>

              <div className="relative">
                <SignIn
                  routing="hash"
                  appearance={{
                    variables: {
                      colorPrimary: "#f59e0b",
                      borderRadius: "12px",
                      fontFamily: "sans-serif",
                      colorText: "#000",
                      colorBackground: "rgba(255,255,255,0.5)",
                    },
                    elements: {
                      footer: "hidden",
                      footerAction: "hidden",
                      headerSubtitle: "hidden",
                      card: "rounded-xl shadow-lg bg-white/50 backdrop-blur-md p-6",
                      buttonPrimary:
                        "bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all",
                      headerTitle:
                        "text-center text-xl md:text-xl font-extrabold text-yellow-700 mb-2",
                      label: "text-yellow-800 font-medium mb-1",

                      input:
                        "w-full rounded-lg border border-yellow-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none px-4 py-2 mb-4 text-semibold",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Unauthenticated>

        <AuthLoading>
          <div className="transition-opacity duration-300 ease-in-out">
            <Loader />
          </div>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
