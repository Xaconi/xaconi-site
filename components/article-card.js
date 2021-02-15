export default function ArticleCard({ title, image, description }) {
    return(
        <>
            { title }
            { description }
            <img src={ image } />
        </>
    )
}