import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { BackofficeSidebar } from '@/components/admin/BackofficeSidebar'
import { BackofficeHeader } from '@/components/admin/BackofficeHeader'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function BackofficeLayout({ children, params }: Props) {
  const session = await auth()
  const { locale } = await params

  // Redirect if not authenticated
  if (!session?.user) {
    redirect(`/${locale}/connexion?callbackUrl=/${locale}/backoffice`)
  }

  // Check if user is active
  if (!session.user.isActive) {
    redirect(`/${locale}/compte-desactive`)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark-900">
      {/* Sidebar */}
      <BackofficeSidebar user={session.user} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <BackofficeHeader user={session.user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
