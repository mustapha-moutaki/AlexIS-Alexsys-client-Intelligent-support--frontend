export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <nav className="mt-6 space-y-3">
        <a href="/dashboard">Home</a>
        <a href="/dashboard/users">Users</a>
        <a href="/dashboard/settings">Settings</a>
      </nav>
    </aside>
  )
}