import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import fallbackPosts from "../data/fallbackPosts";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else {
                    const localPost = fallbackPosts.find((item) => item.$id === slug);
                    if (localPost) {
                        setPost(localPost);
                    } else {
                        navigate("/");
                    }
                }
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        if (post.userId === "local-content") {
            return;
        }
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const coverImage = post?.featuredImage
        ? post.featuredImage.startsWith("http")
            ? post.featuredImage
            : appwriteService.getFilePreview(post.featuredImage)
        : null;
    const plainText = post?.content ? post.content.replace(/<[^>]+>/g, " ") : "";
    const readTime = Math.max(1, Math.ceil(plainText.trim().split(/\s+/).length / 200));
    const sourceLabel = post?.userId === "local-content" ? "Curated post" : "Community post";

    return post ? (
        <div className="py-10">
            <Container>
                <div className="relative mb-6 w-full overflow-hidden rounded-2xl border border-app-accent/50 bg-app-surface p-2 shadow-glow">
                    <img
                        src={coverImage || "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80"}
                        alt={post.title}
                        className="h-[260px] w-full rounded-xl object-cover md:h-[420px]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-app-text" className="mr-3 text-app-surface">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-app-danger" textColor="text-white" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mx-auto mb-6 w-full max-w-3xl">
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-app-muted">
                        <span className="rounded-full bg-app-surface2 px-3 py-1">{sourceLabel}</span>
                        <span className="rounded-full bg-app-surface2 px-3 py-1">{readTime} min read</span>
                    </div>
                    <h1 className="text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
                </div>
                <article className="article-content mx-auto w-full max-w-3xl rounded-2xl border border-app-accent/40 bg-app-surface p-6 md:p-8">
                    {parse(post.content)}
                </article>
            </Container>
        </div>
    ) : (
        <div className="py-10 text-center text-app-muted">Loading post...</div>
    );
}