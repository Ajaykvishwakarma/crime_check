const express = require('express');
const Post = require('../models/post.model');

const router = express.Router();

router.post('/post',  async (req, res) => {
    try{
        const post = await Post.create(req.body)
        return res.status(200).send(post)
    }
    catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.get('/posts', async(req, res) => {
    try{
        let posts = await Post.aggregate(
            [
                {
                    $lookup:
                      {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as:"userdata" ,
                      }
                 },
                 {
                    $sort: { "date" : 1 }
                 }
            ]
        )
        return res.send(posts);

    } catch(error) {
        return res.status(500).send({message : error.message})
    }

})


router.delete("/post/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
  
      res.status(200).send(post);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

module.exports = router