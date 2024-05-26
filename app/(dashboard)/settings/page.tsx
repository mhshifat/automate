import { getUserDetails } from "@/actions/users";
import SaveUserSettingsForm from "@/components/modules/settings/save-user-settings-form";
import DashboardLayout from "@/components/shared/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const userDetails = await getUserDetails();

  return (
    <DashboardLayout
      title="Settings"
    >
      <Card>
        <CardHeader>
          <CardTitle>User profile</CardTitle>
          <CardDescription>Add or update your information</CardDescription>
        </CardHeader>
        <CardContent>
          <SaveUserSettingsForm
            defaultValues={{
              email: userDetails?.email,
              name: userDetails?.name,
              avatar: userDetails?.avatar,
            }}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}