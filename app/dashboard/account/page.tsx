import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardAccountPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your account details and contact information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="mt-1 font-medium">{data.user?.email ?? '—'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              User ID
            </label>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {data.user?.id ?? '—'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Password and security settings can be managed from your auth provider.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
