import React from 'react'
import CampaignHero from '../_components/CampaignHero'
import EntryBundles from '../_components/EntryBundles'
import MissionTransparency from '../_components/MissionTransparency'
import CampaignHost from '../_components/CampaignHost'

function page() {
  return (
    <div>
      <CampaignHero />
      <EntryBundles />
      <MissionTransparency />
      <CampaignHost />
    </div>
  )
}

export default page
