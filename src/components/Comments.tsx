'use client'

import { DiscussionEmbed } from 'disqus-react'

interface CommentsProps {
  id: string
  title: string
  path: string
}

export default function Comments({ id, title, path }: CommentsProps) {
  const disqusConfig = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
    identifier: id,
    title: title
  }

  return (
    <div className="w-full">
      <DiscussionEmbed
        shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME || ''}
        config={disqusConfig}
      />
    </div>
  )
} 