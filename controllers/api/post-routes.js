// consts //
const router = require('express').Router();

// user, post, comment models //
const { User, Post, Comment } = require('../../models');

// sequelize //
const sequelize = require('../../config/connection');

// Authorization //
const withAuth = require('../../utils/auth');

// routes //

// GET blog Posts //
router.get('/', (req, res) => {
  Post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
          {
              model: Comment,
              attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => res.status(500).json(err));
});
});

// get One blog post by id//
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        // id parameter in the query //
        id: req.params.id
      },
      // Query configuration //
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: [
              'id', 
              'comment_text', 
              'post_id', 
              'user_id', 
              'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
      .then(dbPostData => {
        // if error //
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        // send error //
        console.log(err);
        res.status(500).json(err);
      });
  });




// POST create new blog post //

router.post('/', withAuth, (req, res) => {
    // expects object of the form
    // {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', 
    // user_id: 1}
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT update blog post //
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


// DELETE delete blog post //
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;