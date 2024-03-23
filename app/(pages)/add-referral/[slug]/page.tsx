import { getReferralById } from "@/app/api";
import AddReferral from "../../../components/AddReferrals";
import { parseReferral } from "@/app/misc/utils";

export default async function AddReferralPage ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let referralId: string = '';
  if(!Array.isArray(params.slug)) {
    referralId = params.slug || '';
  }
  const isAdmin = searchParams?.admin === "true";
  const resp = await getReferralById(referralId)
  const referral = parseReferral(resp);
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-24">
      <h3 className='text-center text-2xl font-bold'>Edit Referral</h3>
      <AddReferral isAdmin={isAdmin} referralId={referralId} referral={referral}/>
    </main>
  )
}