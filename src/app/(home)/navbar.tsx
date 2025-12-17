import Link from "next/link"
import Image from "next/image"
import { Lobster } from "next/font/google"
import { SearchInput } from "./search-input"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
})

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex items-center gap-3 shrink-0 pr-6">
        {/* Logo Icon */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={36} />
        </Link>

        {/* Logo Text with Circles */}
        <div className="relative flex items-center justify-center space-x-1">
          {/* Yellow Circles */}
          <div className="absolute -z-10 flex items-center">
            <div className="w-3 h-3 bg-amber-400 rounded-full absolute -top-6 -right-12"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full absolute -top-6 -right-16"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full absolute -top-6 -right-20"></div>
            <div className="w-10 h-10 bg-amber-400 rounded-full absolute -right-2"></div>
          </div>

          {/* Stylized Text */}
          <h3
            className={`${lobster.className} text-4xl text-red-500 drop-shadow-[1px_1px_0_#3B0A0A]`}
            style={{
              WebkitTextStroke: "1px #3B0A0A", // adds dark outline
            }}
          >
            DocNest
          </h3>
        </div>
      </div>
      <SearchInput />
      <div className="flex gap-3 items-center pl-5">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  )
}
