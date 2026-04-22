import axios from "axios"
import type { ApiError } from "@/interfaces/interface"

export function handleApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
        return {
            status: error.response?.status ?? 500,
            message: error.response?.data?.message ?? error.message ?? "Request failed",
        }
    }
    if (error instanceof Error) {
        return { status: 500, message: error.message }
    }
    return { status: 500, message: "Unexpected error" }
}
