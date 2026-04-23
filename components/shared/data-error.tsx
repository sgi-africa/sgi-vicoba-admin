import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft, ShieldX } from "lucide-react"
import Link from "next/link"
import { DataErrorProps } from "@/interfaces/interface"


export function DataError({ status, message, backHref = "/home" }: DataErrorProps) {
  const is403 = status === 403
  const is401 = status === 401

  const title = is403
    ? "Access denied"
    : is401
      ? "Session expired"
      : "Something went wrong"

  const description =
    message ??
    (is403
      ? "You do not have permission to view this resource."
      : is401
        ? "Your session has expired. Please sign in again."
        : "An unexpected error occurred. Please try again.")

  return (
    <Card className="mx-auto mt-16 max-w-md">
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        {is403 || is401 ? (
          <ShieldX className="size-12 text-muted-foreground" />
        ) : (
          <AlertTriangle className="size-12 text-muted-foreground" />
        )}
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {is401 ? (
          <Button asChild>
            <Link href="/auth/login">Sign in</Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={backHref}>
              <ArrowLeft className="mr-2 size-4" />
              Go back
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
