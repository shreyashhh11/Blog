import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const imageUrl =
    featuredImage?.startsWith?.("http") ? featuredImage : featuredImage ? appwriteService.getFilePreview(featuredImage) : null

  return (
    <Link to={`/post/${$id}`} aria-label={`Read post: ${title}`}>
        <div className='group h-full w-full rounded-xl border border-app-accent/40 bg-app-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-app-accent/70 hover:shadow-glow'>
            <div className='mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-app-surface2'>
                {imageUrl ? (
                  <img src={imageUrl} alt={title} className='h-full w-full object-cover transition duration-500 group-hover:scale-105' />
                ) : (
                  <div className='text-xl font-semibold text-app-muted'>No Cover</div>
                )}
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
            <p className='mt-2 text-sm text-app-muted'>Read article</p>
        </div>
    </Link>
  )
}


export default PostCard