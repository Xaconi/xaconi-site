
import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleCard from "../components/article-card";

describe("Article Card", () => {
    it("should render the article card", () => {
        const title = "Article Card Title";
        const description = "Basic Article Card Description";
        const link = "article-card-link";
        const key = "article-card-key";
        render(
            <ArticleCard
                title={title}
                description={description}
                image=""
                link={link}
                key={key}
            />
        );

        const articleCartTitle = screen.getByText(title);
        const articleCartDescription = screen.getByText(description);

        expect(articleCartTitle).toBeInTheDocument();
        expect(articleCartDescription).toBeInTheDocument();
    });
});