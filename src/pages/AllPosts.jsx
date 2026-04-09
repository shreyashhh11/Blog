import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import fallbackPosts from '../data/fallbackPosts';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService
            .getPosts([])
            .then((postsData) => {
                if (postsData?.documents?.length) {
                    setPosts(postsData.documents)
                    return
                }
                setPosts(fallbackPosts)
            })
            .catch(() => setPosts(fallbackPosts))
            .finally(() => setLoading(false))
    }, [])

  return (
    <div className='w-full py-12 md:py-14'>
        <Container>
            <div className='fade-in-up mb-6'>
                <h1 className='text-3xl font-semibold md:text-4xl'>All Posts</h1>
                <p className='mt-2 text-app-muted'>Explore every published article in one place.</p>
            </div>

            {loading && <div className='rounded-xl border border-app-surface2 bg-app-surface p-6 text-app-muted' role="status" aria-live="polite">Loading posts...</div>}
            {!loading && posts.length === 0 && (
                <div className='rounded-xl border border-app-surface2 bg-app-surface p-6 text-app-muted' role="status" aria-live="polite">No posts published yet. New content is coming soon.</div>
            )}

            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='fade-in-up w-full p-2 sm:w-1/2 lg:w-1/3'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts