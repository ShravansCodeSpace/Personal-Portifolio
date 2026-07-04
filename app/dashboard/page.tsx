import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Owner Dashboard | Shravankumar Chinnaram",
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  );
}
