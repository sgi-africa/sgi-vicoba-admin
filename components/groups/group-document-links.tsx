"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { GroupRegistrationDocument } from "@/interfaces/interface"
import { BookMarked, ChevronDown, ClipboardSignature } from "lucide-react"

export function GroupDocumentLinks({
  constitutionUrl,
  registrationDocuments,
}: {
  constitutionUrl: string | null
  registrationDocuments: GroupRegistrationDocument[]
}) {
  const hasConstitution = Boolean(constitutionUrl?.trim())
  const docs = registrationDocuments.filter((d) => d.fileUrl.trim().length > 0)

  return (
    <div className="grid grid-cols-2 gap-2">
      {hasConstitution ? (
        <Button asChild variant="outline" size="sm" className="w-full px-2">
          <a
            href={constitutionUrl!}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookMarked className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">Constitution</span>
          </a>
        </Button>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full px-2"
          disabled
          title="No constitution file on record"
        >
          <BookMarked className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">Constitution</span>
        </Button>
      )}

      {docs.length === 0 ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full px-2"
          disabled
          title="No registration documents on record"
        >
          <ClipboardSignature className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">Registration</span>
        </Button>
      ) : docs.length === 1 ? (
        <Button asChild variant="outline" size="sm" className="w-full px-2">
          <a
            href={docs[0].fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ClipboardSignature className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">Registration</span>
          </a>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full px-2"
            >
              <ClipboardSignature className="size-3.5 shrink-0" aria-hidden />
              <span className="truncate">Registration</span>
              <ChevronDown className="size-3 shrink-0 opacity-60" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[12rem]">
            {docs.map((d) => (
              <DropdownMenuItem key={d.id} asChild>
                <a
                  href={d.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.documentType.trim() || "Document"}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
