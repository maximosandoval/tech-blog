const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', withAuth, async (req, res) => {
  
  console.log("YOU HIT /api/post");
  console.log("REQ.BODY IS=", req.body);

  try {
    const updateBlog = await Blog.update(
      {
        user_id: req.session.user_id,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      });
    if (!updateBlog[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(updateBlog);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.log('I AM THE ERROR', err);
    res.status(500).json(err);
  }
});


module.exports = router;

