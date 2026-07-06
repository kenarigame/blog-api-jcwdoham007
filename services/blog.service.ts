import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/api-error.js";
import { slugify } from "../utils/slug.js";

interface GetBlogsQuery {
  page: number;
  take: number;
  sortOrder: string;
  sortBy: string;
  search: string;
}

interface CreateBlogBody {
  title: string;
  description: string;
  category: string;
  content: string;
  thumbnail: string;
}

export const getBlogsService = async (query: GetBlogsQuery) => {
};

export const getBlogBySlugService = async (slug: string) => {
};

export const createBlogService = async (
  body: CreateBlogBody,
  userId: number,
) => {
  const blog = await prisma.blog.findUnique({
    where: { title: body.title },
  });

  if (blog) {
    throw new ApiError("Title already in use", 400);
  }

  const slug = slugify(body.title);

  await prisma.blog.create({
    data: {
      ...body,
      slug: slug,
      userId: userId,
    },
  });

  return { message: "create blog success" };
};