import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import fallbackPosts from '../data/fallbackPosts';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService
            .getPosts()
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
                <section className='fade-in-up relative mb-10 overflow-hidden rounded-2xl border border-app-accent/60 bg-app-surface p-6 shadow-glow md:p-10'>
                    <div className='pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-app-accent2/70 blur-2xl' />
                    <div className='pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-app-accent/60 blur-2xl' />

                    <h1 className='relative z-10 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl'>
                        Thoughts Worth Sharing
                    </h1>
                    <p className='relative z-10 mt-4 max-w-2xl text-base leading-7 text-app-muted md:text-lg'>
                        A space where ideas, experiences, and lessons come together to inspire and inform.
                    </p>
                </section>

                {loading && (
                    <div className='rounded-xl border border-app-surface2 bg-app-surface p-6 text-app-muted' role="status" aria-live="polite">
                        Loading latest posts...
                    </div>
                )}

                {!loading && posts.length === 0 && (
                    <div className='rounded-xl border border-app-surface2 bg-app-surface p-6 text-app-muted' role="status" aria-live="polite">
                        Fresh stories are on the way. Check back soon.
                    </div>
                )}

                <div className='mt-6 flex flex-wrap'>
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

export default Home