import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { LogoutButton } from '@/components/logout-button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-svh">
      <DashboardSidebar />
      <main className="flex-1 pl-56">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-end border-b border-border bg-background px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {data.claims.email}
            </span>
            <LogoutButton />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
