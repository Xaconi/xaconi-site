// NodeJS Core
import fs from 'fs';
import path from 'path';

// Services
import { getPostBySlug } from '../../../services/postsService';

// Libs
import nodeHtmlToImage from 'node-html-to-image';

export default async (req, res) => {
    const postSlug = req.query.post;
    const post = await getPostBySlug(postSlug);

    if(post.attributes.image != null) {
        // Posts with images
        const filePath = path.resolve('./public/', post.attributes.image);
        const imageBuffer = fs.readFileSync(filePath);

        res.setHeader('Content-Type', 'image/jpg')
        res.send(imageBuffer);
    } else {
        // Posts without images
        const imageAvatar = fs.readFileSync('./public/xaconi.jpg');
        const base64Image = new Buffer.from(imageAvatar).toString('base64');
        const dataURI = 'data:image/jpeg;base64,' + base64Image

        const imageBuffer = await nodeHtmlToImage({
            html: `<html>
                <body>
                    <div class="social-image-content">
                        <h1>
                            {{ postTitle }}
                        </h1>
                        <div class="social-image-footer">
                            <div class="social-image-footer-left">
                                <img src="{{ dataImageAvatar }}" />
                                <span>Xaconi.dev</span>
                            </div>
                            <div class="social-image-footer-right">
                                {{ tags }}
                            </div>
                        </div>
                    </div>
                </body>
                <style>
                    html, body {
                        height : 100%;
                    }
                    body {
                        align-items : center;
                        display : flex;
                        height : 300px;
                        justify-content : center;
                        margin: 0;
                        width : 800px;
                    }
                    .social-image-content {
                        border : 2px solid black;
                        border-radius : 5px;
                        box-sizing: border-box;
                        display : flex;
                        flex-direction : column;
                        height : calc(100% - 40px);
                        margin : 20px;
                        padding : 20px;
                        width : calc(100% - 40px);
                    }
                    .social-image-footer {
                        display : flex;
                        flex-direction : row;
                        margin-top : auto;
                    }
                    .social-image-footer-left {
                        align-items: center;
                        display: flex;
                        flex-direction: row;
                        font-size : 18px;
                        font-weight : 600;
                        justify-content: center;
                    }
                    .social-image-footer-left img {
                        border : 2px solid black;
                        border-radius : 50%;
                        height : 40px;
                        margin-right : 10px;
                        width : 40px;
                    }
                    .social-image-footer-right {
                        align-items: center;
                        display: flex;
                        flex-direction: row;
                        height : 40px;
                        justify-content: center;
                        margin-left : auto;
                    }
                    * {
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                        font-weight : 600;
                    }
                </style>
            </html>`,
            content : {
                postTitle : post.attributes.title,
                tags : post.attributes.tags.map((tag) => {
                    return `#${tag}`
                }).join(' | '),
                dataImageAvatar : dataURI
            }
        });

        res.setHeader('Content-Type', 'image/jpg')
        res.send(imageBuffer);
    }
}