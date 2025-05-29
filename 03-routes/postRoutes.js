import express from "express";
import { isAdmin } from "../middleware/auth.js";

import {
    getRecentPosts,
    createPost,
    getPost,
    getAdminPage,
    getNewPostForm,
    getEditPostForm,
    updatePost,
    deletePost,
    getPostsByCategory,
    searchPosts,
} from "../01-controllers/postController.js";
import passport from "passport";

const router = express.Router()

// blog routes
router.get("/", getRecentPosts)
router.get("/post/:slug", getPost)
router.get("/category/:categoryName", getPostsByCategory)
router.get("/search", searchPosts)

// admin page routes
router.get("/admin/posts", isAdmin, getAdminPage)
router.post("/admin/posts/new", isAdmin, createPost)

router.get("/admin/posts/new", isAdmin, getNewPostForm)
router.get("/admin/posts/:id", isAdmin, getEditPostForm)

router.put("/admin/posts/:id", isAdmin, updatePost)
router.delete("/admin/posts/:id", isAdmin, deletePost)

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/posts',
    failureRedirect: '/login'
}));

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redirect to home or login page
    });
});

router.get('/login', (req, res) => {
    res.render('login')
});


export default router