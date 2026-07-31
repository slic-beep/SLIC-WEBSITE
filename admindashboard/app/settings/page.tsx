import AdminPageShell from "@/components/AdminPageShell";

export default function SettingsPage() {
  return (
    <AdminPageShell title="Settings" description="Configure core SLIC admin preferences and API options.">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">General settings</h2>
          <div className="space-y-4 text-sm text-gray-500">
            <p>Update the admin dashboard settings in future versions with authentication and environment controls.</p>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">API host</p>
              <p className="mt-1 text-xs text-gray-500">{process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}</p>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Admin tools</h2>
          <div className="space-y-4 text-sm text-gray-500">
            <p>Use the backend and Appwrite collection routes directly for CRUD operations.</p>
            <p className="text-xs text-gray-500">This page is intentionally simple while the admin experience is built out.</p>
          </div>
        </section>
      </div>
    </AdminPageShell>
  );
}