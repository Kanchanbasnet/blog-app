import { createNewBlog, deleteBlog, getBlogs, getBlogsById, updateBlogs } from "../controllers/blog.controller.js";
import express from 'express';


const router = express.Router();


router.post('/', createNewBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogsById);
router.put('/:id', updateBlogs);
router.delete('/:id', deleteBlog)



export default router;