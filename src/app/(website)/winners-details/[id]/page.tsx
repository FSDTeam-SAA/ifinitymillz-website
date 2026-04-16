'use client'
import React from 'react'
import CampaignHero from '../_components/CampaignHero'
import EntryBundles from '../_components/EntryBundles'
import MissionTransparency from '../_components/MissionTransparency'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
// import CampaignHost from '../_components/CampaignHost'

function Page() {
  const params = useParams();
  const id = params.id;
  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  const { data: campaignData } = useQuery({
    queryKey: ['single-campaign', id],
    enabled: !!TOKEN,
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/campaigns/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      const json = await res.json()
      return json.data
    }
  })
  return (
    <div>
      <CampaignHero
        title={campaignData?.title}
        description={campaignData?.description}
        prizeImage={campaignData?.prizeImage}
        endDate={campaignData?.endDate}
        status={campaignData?.status}
      />
      <EntryBundles
        packages={campaignData?.packages ?? []}
        maxFreeEntries={campaignData?.maxFreeEntries ?? 1}
        campaignId={campaignData?._id}
        token={TOKEN}
      />
      <MissionTransparency />
      {/* <CampaignHost /> */}
    </div>
  )
}

export default Page
