import { getReferralById } from "@/app/api/referrals";
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
  const referral = resp ? parseReferral(resp) : undefined;
  return (
    <main className="min-h-screen max-w-4xl mx-auto py-20 px-24">
      <h3 className='text-center text-2xl font-bold'>Edit Referral</h3>
      <AddReferral isAdmin={isAdmin} referralId={referralId} referral={referral}/>
    </main>
  )
}