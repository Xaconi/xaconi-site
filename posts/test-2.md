---
title: Test article
date: '2021-02-14'
image: 'js_image.png'
description: Test description.
active: false
tags:
- test
---

## This is a test Heading ##

And this is a test paragraph.

Test done `oki doki` ok?

Test code

```javascript
// Test comment
const test = 2;
export async function getServerSideProps({ params, res }) {
    const post = getPostBySlug(params.slug);

    if(post === null) {
        res.statusCode = 404;
        return {
            props : {
                postContent : {
                    title : 'test',
                    description : '',
                    image : '',
                    content : ''
                }
            }
        };    
    } else {
        return{
            props : {
                postContent : {
                    title : post.attributes.title,
                    description : post.attributes.description,
                    image : post.attributes.image,
                    content : post.body,
                    link : post.attributes.link
                }
            }
        };
    }
}
```