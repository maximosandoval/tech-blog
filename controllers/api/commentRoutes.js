const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => { 
    try {
        const commentData = await Comment.findAll();
        const comments = commentData.map(comment => comment.toJSON());
      
        res.status(200).render('/', { comments });
        console.log(comment)
        } catch (err) {
        res.status(500).json(err);
        }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
 
    try {
      const newComment = await Comment.create({
      
        ...req.body,
        comment: req.body.comment,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
        
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });


  
router.put('/:id', withAuth, async (req, res) => {
  try {
      const updateComment = await Comment.update(
          {
              user_id: req.session.user_id,
              comment: req.body.comment,
          },
          {
              where: {
                  id: req.params.id,
              },
          });
      if (!updateComment[0]) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
      }
      res.status(200).json(updateComment);
  } catch (e) {
      console.log(e);
      res.status(500).json(e);

  }
});


  // Delete function
router.delete('/:id', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
          },
      });
      if (!commentData) {
          res.status(404).json({ message: 'No comment found for this user!' });
          return;
      }
      res.status(200).json(commentData);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;