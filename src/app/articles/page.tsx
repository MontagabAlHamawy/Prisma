import { Article } from "@/utils/types";
import ArticleItem from '../../components/Articles/articleItem';
import { error } from "console";

export default async function Articles() {
    const response = await fetch("http://localhost:3000/api/articles");  
    if(!response.ok){
        throw Error("Failed Fetch Articles Data");
    }
    const articles: Article[] = await response.json();

    return (
            <section className="container m-auto px-5 mt-10">
                <div className="flex items-center justify-center flex-wrap gap-7">
                {articles.map(item => (
                        <ArticleItem article={item}  key={item.id}/>
                ))}
                </div>
            </section>
    )
}
