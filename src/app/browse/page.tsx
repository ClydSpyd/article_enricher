"use client"
import { useEffect, useState } from "react";
import API from "../../../api";
import BrowseContent from "./browse-content";

export default function BrowsePage() {
  const [articles, setArticles] = useState<Article[]|null>(null)

  const fetchArticles = async () => {
    const {data} = await API.article.getAllArticles();
    if(data)setArticles(data);
  }
  
  useEffect(() => {
    fetchArticles();
  }, []);

  return articles ? <BrowseContent articles={articles} /> : <h1>loading...</h1>;
}
