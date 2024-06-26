import { Request, Response } from 'express';
import {Blog} from '../models/Blog';
import User from '../models/user';
import { createBlogSchema, updateBlogSchema } from '../utils/validation';


export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { title, description, image } = req.body;
    const blog = new Blog({ title, description, image });
    await blog.save();
    res.status(201).json({message: 'Blog Created successfully', blog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { title, description, image } = req.body;
    const blog = await Blog.findByIdAndUpdate(id, { title, description, image }, { new: true });
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.status(200).json({message: 'Blog Updated successfully', blog});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const likeBlog = async (req: Request, res: Response): Promise<void> => {
  
  const blogId = req.params.id;
  const { userId } = req.body;
  
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    // Check if user is logged in
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
// Check if the user has already liked the blog
if (blog.likedBy.includes(userId)) {
  res.status(400).json({ message: 'User has already liked the blog' });
  return;
}

// Add the user's ID to the likedBy array and increment the likes count
blog.likedBy.push(userId);
blog.likes += 1;

await blog.save();
res.status(200).json({ message: 'Blog liked successfully',blog });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};


export const commentOnBlog = async (req: Request, res: Response): Promise<void> => {
 
  const blogId = req.params.id;
  const { name, comment } = req.body;
  
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    // Check if user is logged in
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }


// Add the comment to the blog's comments array
blog.comments.push({ name, comment });

await blog.save();
    res.status(200).json({ message: 'Comment added successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
