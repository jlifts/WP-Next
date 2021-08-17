/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Link from 'next/link';
import { PostProps } from 'typings/global';
import Heading from './Heading';

function Posts({
  posts,
  intro,
  heading,
  id,
  headingLevel = 'h1',
  postTitleLevel = 'h2',
  readMoreText = 'Read more',
}: PostProps): JSX.Element {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section
      {...(id && { id })}
      className="text-white font-rale cursor-default"
    >
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          {heading && (
            <div className="text-xl font-bold">
              <Heading level={headingLevel}>{heading}</Heading>
            </div>
          )}
          {intro && <p>{intro}</p>}
        </div>
        <div className="posts">
          {posts &&
            posts.map((post) => (
              <div key={post.id} id={`post-${post.id}`} className="py-8 px-32">
                <div>
                  <div className="font-bold text-lg">
                    <Heading level={postTitleLevel}>
                      <Link href={post.uri}>
                        <a>{post.title}</a>
                      </Link>
                    </Heading>
                  </div>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: post.excerpt ?? '' }}
                  />
                  <Link href={post.uri}>
                    <a
                      aria-label={`Read more about ${post.title || 'the post'}`}
                    >
                      {readMoreText}
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          {posts && posts?.length < 1 && <p>No posts found.</p>}
        </div>
      </div>
    </section>
  );
}

export default Posts;
