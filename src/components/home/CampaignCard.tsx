'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string; // ✅ string path
  raised: number;
  goal: number;
  daysLeft?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;

  const raisedFormatted = `$${campaign.raised.toLocaleString()}`;
  const goalFormatted = `$${campaign.goal.toLocaleString()}`;

  return (
    <Card className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      
      {/* Image Section */}
      <div className="relative w-full h-[257px] bg-gray-200 overflow-hidden">
        
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover w-full h-full"
        />

        {campaign.daysLeft && (
          <div className="absolute top-4 right-4 bg-[#BDBDBD8F] text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
            {campaign.daysLeft}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {campaign.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {campaign.description}
        </p>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#7DBAED]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <p className="text-sm font-semibold text-gray-900">
            {raisedFormatted}
          </p>

          <p className="text-xs text-gray-500">
            Raise goal {goalFormatted}
          </p>
        </div>

        {/* View Details Button */}
        <Link href={`/all-campaigns/${campaign.id}`}>
          <button className="w-full border-2 border-gray-300 text-gray-900 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </Card>
  );
}