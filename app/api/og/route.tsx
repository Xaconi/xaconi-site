import fs from 'fs';
import path from 'path';

import { getPostBySlug } from '../../../services/postsService';

import { ImageResponse } from 'next/og';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const hasSlug = searchParams.has('slug');
    const slug = hasSlug
        ? searchParams.get('slug')
        : 'My default title';

    const post = await getPostBySlug(slug);

    if (!post) return new ImageResponse(<h1>{slug}</h1>);

    const imageAvatar = fs.readFileSync('./public/xaconi.jpg');
    const base64Image = Buffer.from(imageAvatar).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;
    const originalDate = new Date(post.attributes.date);
    const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth() + 1)).slice(-2)}/${originalDate.getFullYear()}`;

    const tags = post.attributes.tags?.map((tag: string) => {
        return `#${tag}`
    }).join(' | ') || "";

    return new ImageResponse(
        (
            <>
                <span style={{
                    position: 'absolute',
                    top: '46px',
                    left: '46px',
                    width: '1048px',
                    backgroundColor: 'black',
                    height: '520px',
                    zIndex: -1,
                    borderRadius: '5px'
                }}></span>
                <div style={{
                    border: '2px solid black',
                    borderRadius: '5px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '520px',
                    margin: '40px',
                    padding: '20px',
                    width: '1048px',
                    position: 'relative',
                    backgroundColor: 'white',
                    zIndex: 10
                }}>
                    <h1 style={{
                        fontSize: '72px',
                        marginTop: '90px',
                        fontWeight: 900
                    }}>
                        {post.attributes.title}
                    </h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 'auto'
                    }}>
                        <div style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            fontSize: '28px',
                            fontWeight: '600',
                            justifyContent: 'center',
                            lineHeight: '40px'
                        }}>
                            <img
                                src={dataURI}
                                style={{
                                    border: '2px solid black',
                                    borderRadius: '50%',
                                    height: '40px',
                                    marginRight: '10px',
                                    width: '40px'
                                }}
                            />
                            <span>Xaconi.dev · {formattedDate} </span>
                        </div>
                        <div style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '40px',
                            justifyContent: 'center',
                            marginLeft: 'auto',
                            fontSize: '28px'
                        }}>
                            {tags}
                        </div>
                    </div>
                </div>
            </>
        ),
        {
            width: 1128,
            height: 600,

        });
}