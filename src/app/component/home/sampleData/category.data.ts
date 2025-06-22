import { Category } from "../types/category";

export const categories: Category[] = [
    {
        id: 1,
        category: "Electronics",
    },
    {
        id: 2,
        category: "Fashion",
    },
    {
        id: 3,
        category: "Men",
        parentCategoryId: 2,
    },
    {
        id: 4,
        category: "Books",
    },
    {
        id: 5,
        category: "Novels",
        parentCategoryId: 4,
    },
    {
        id: 6,
        category: "Women",
        parentCategoryId: 2,
    },
    {
        id: 7,
        category: "phones",
        parentCategoryId: 1,
    }
]