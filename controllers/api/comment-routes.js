// consts //

const router = require('express').Router();

// comment model //
const { Comment } = require('../../models');

// auth helper //
const withAuth = require('../../utils/auth');

// Routes //

// GET comments  //
router.get('/', (req, res) => {
    // findAll //
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    // if there is a server error, run error //
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Post a new comment //
router.post('/', withAuth, (req, res) => {
    // create a comment /
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.under_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// Delete comment //
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        res.status(404.json({ message: 'no comment found with this id' }));
    }) return;
}
res.json(dbCommentData);
}) 
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;