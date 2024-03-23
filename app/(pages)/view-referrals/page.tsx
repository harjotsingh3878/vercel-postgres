import { getAllReferrals } from "@/app/api";
import ManageReferrals from "@/app/components/ManageReferrals";

export default async function ViewReferralPage ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isAdmin = searchParams?.admin === "true";
  const referrals  = await getAllReferrals()
  return (
    <main className="min-h-screen p-24">
      <ManageReferrals referrals={referrals} isAdmin={isAdmin}/>
    </main>
  )
}