export type ApiActionResult = | { ok: true } | { ok: false; error: string; status?: number }

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  status: number
  message: string
}

export interface DataErrorProps {
  status?: number
  message?: string
  backHref?: string
}

export interface StatCardProps {
  title: string
  value: string | number | undefined
  sub?: string
  icon: React.ReactNode
}


export interface DashboardPdfDownloadProps {
  from: string
  to: string
  summary: AnalyticsSummary | null
  health: HealthStatus | null
}


export interface UsersPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    q?: string
    systemRole?: string
    isActive?: string
    kycVerified?: string
  }>
}

export interface UserDetailPageProps {
  params: Promise<{ userId: string }>
}

export interface UserDetailCardProps {
  user: AdminUser
}

export interface UserActionsProps {
  user: AdminUser
}

export interface GroupsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    q?: string
    billingStatus?: string
    isActive?: string
    isDeleted?: string
  }>
}


export interface GroupDetailCardProps {
  group: AdminGroup
}

export interface GroupMembersTableProps {
  members: GroupMember[]
}

export interface GroupActionsProps {
  group: AdminGroup
}

export interface GroupDetailPageProps {
  params: Promise<{ groupId: string }>
  searchParams: Promise<{ page?: string; limit?: string }>
}

export interface NotificationsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    status?: string
    from?: string
    to?: string
  }>
}

export interface SearchInputProps {
  placeholder?: string
  paramKey?: string
}

export interface NotificationsTableProps {
  notifications: Notification[]
}

export interface StatusBadgeProps {
  status: string | boolean
  label?: string
  prettyLabel?: boolean
}

export interface HealthStatus {
  status: string
  uptime?: number
  timestamp?: string
}

export interface SummaryCardsProps {
  summary: AnalyticsSummary | null
  health: HealthStatus | null
}


export type SystemRole = "ADMIN" | "USER"

export interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  systemRole: SystemRole
  isActive: boolean
  isDeleted: boolean
  kycVerified: boolean
  createdAt: string
  updatedAt: string
  memberships?: GroupMembership[]
}

export interface GroupMembership {
  id: string
  groupId: string
  role: string
  joinedAt: string
  group?: {
    id: string
    name: string
  }
}

export interface GetUsersParams {
  page?: number
  limit?: number
  q?: string
  systemRole?: SystemRole
  isActive?: string
  isDeleted?: string
  kycVerified?: string
}

export type BillingStatus = "INACTIVE" | "ACTIVE" | "OVERDUE"

export interface AdminGroup {
  id: string
  name: string
  description?: string
  isActive: boolean
  isDeleted: boolean
  billingStatus: BillingStatus
  memberCount?: number
  createdAt: string
  updatedAt: string
}

export interface GroupMember {
  id: string
  userId: string
  groupId: string
  role: string
  joinedAt: string
  user?: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    isActive: boolean
    kycVerified: boolean
  }
}

export interface GetGroupsParams {
  page?: number
  limit?: number
  q?: string
  billingStatus?: BillingStatus
  isActive?: string
  isDeleted?: string
}

export interface GetGroupMembersParams {
  page?: number
  limit?: number
}

export interface ContributionsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    type?: string
    groupId?: string
    userId?: string
    from?: string
    to?: string
    q?: string
  }>
}


export type PaymentStatus = "PENDING" | "PAID" | "FAILED"

export interface Billing {
  id: string
  groupId: string
  status: PaymentStatus
  amount: number
  billingMonth: string
  paidAt?: string
  createdAt: string
  updatedAt: string
  group?: {
    id: string
    name: string
  }
}

export interface GetBillingsParams {
  page?: number
  limit?: number
  status?: PaymentStatus
  groupId?: string
  billingMonthFrom?: string
  billingMonthTo?: string
}

export interface UpdateBillingStatusBody {
  status: PaymentStatus
  paidAt?: string
}

export type ContributionType = "savings" | "jamii" | "loanRepayment"

export interface Contribution {
  id: string
  type: ContributionType
  amount: number
  groupId: string
  userId: string
  createdAt: string
  updatedAt: string
  group?: {
    id: string
    name: string
  }
  user?: {
    id: string
    firstName: string
    lastName: string
  }
}

export interface GetContributionsParams {
  page?: number
  limit?: number
  type?: ContributionType
  groupId?: string
  userId?: string
  from?: string
  to?: string
  q?: string
}

export interface Notification {
  id: string
  userId?: string
  status: string
  message: string
  createdAt: string
  updatedAt: string
  user?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export interface GetNotificationsParams {
  page?: number
  limit?: number
  userId?: string
  status?: string
  from?: string
  to?: string
}

export interface AnalyticsSummary {
  totalUsers?: number
  activeUsers?: number
  totalGroups?: number
  activeGroups?: number
  totalContributions?: number
  totalContributionAmount?: number
  totalBillings?: number
  pendingBillings?: number
  paidBillings?: number
  failedBillings?: number
  totalRevenue?: number
  [key: string]: number | string | undefined
}

export interface GetAnalyticsSummaryParams {
  from: string
  to: string
}
