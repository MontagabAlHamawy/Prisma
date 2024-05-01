import { Article } from "@/utils/types";
import Link from "next/link";

interface ArticleItemProps {
    article: Article;
}

export default function ArticleItem({article}:ArticleItemProps) {

    return (
        <div  className="p-5 rounded-lg  my-1 shadow-lg border-2 border-gray-400 hover:border-gray-200 w-full md:w-2/5 lg:w-1/4 flex flex-col justify-between">
            <h1 className="text-lg font-bold text-gray-900 line-clamp-1">{article.title}</h1>
            <p className="text-base text-gray-500 my-2 p-1 line-clamp-1">{article.body}</p>
            <Link className="text-xl bg-purple-700 hover:bg-purple-900 w-full block text-center p-1 text-white rounded-lg" href={`/articles/${article.id}`}>
                Read More
            </Link>
        </div>
    )
}
