import { Admin } from "../02-models/adminModel.js"
import Post from "../02-models/postModel.js"

// post controllers
export const createPost = async (req, res) => {
    try {
        const post = await Post.create({
            postTitle: req.body.postTitle,
            postText: req.body.postText,
            postCategory: req.body.postCategory,
            adminID: req.user.id
        });
        res.redirect('/admin/posts');
    }
    catch (error) {
        res.status(400).json({ error: error.message })    ;
    }
}

export const getRecentPosts = async (req, res) => {
    try {
        const recentPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });
        console.log(recentPosts);
        res.render('index', { posts: recentPosts });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPost = async (req, res) => {
    try {
        const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan','Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        
        const postID = req.params.id;
        const post = await Post.findByPk(postID);
        if(!post){
            return res.status(404).send("Post not found!");
        }

        const author = await Admin.findByPk(post.adminID);
        if(!author){
            return res.status(404).send('Author not found!');
        }

        const dateString = post.createdAt;
        const date = new Date(dateString);
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const newdate = month + " " + year;

        res.render('postview', { "post": post, "admin": author, "date": newdate });

    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");    
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            const updatedData = {
                postTitle: req.body.postTitle,
                postText: req.body.postText,
                postCategory: req.body.postCategory
            };
            
            await Post.update(updatedData, { where: { id: req.params.id } });


            res.redirect('/admin/posts');
        }
        else{
            res.status(404).send("Post not found!");
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const deletePost = async (req, res) => {
    console.log('Entered to delete');
    try {
        const postID = req.params.id;
        const deletedPost = await Post.destroy({ where: { id: postID } });

        if (deletedPost <= 0) {
            console.log('No post found with ID ', postID);
            return res.status(404).send('Post not found');
        }
        res.redirect(303, '/admin/posts');
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

// admin page controllers


export const getAdminPage = async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.render('admin/admin-page', { posts });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const getNewPostForm = async (req, res) => {
    res.render('admin/new-post');
}

export const getEditPostForm = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.render('admin/edit-post', { post });
        }
        else {
            res.status(400).send('Post not found!');
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
