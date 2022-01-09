const {queryFor, query, save, count} = require("./commentsService");

// get Comments from DB
const getComments = async (req, res, next) => {
    try {
        const perPage = 8;
        const maxPage = Math.ceil((await count()) / perPage);
        const page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
        
        const comments = await queryFor((perPage * page) - perPage, perPage);

        res.render('comment/comment', {
            user: req.user.toJSON(),
            comments,
            current: page,
            is_overload: page >= maxPage,
            is_notOne: maxPage > 1,
            pages: maxPage,
            next: parseInt(page) + 1,
            prev: (c = parseInt(page) - 1) ? c : 0
          });
    } catch (error) {
        console.log(error)
        res.status(409).json({success: false, data: [], error: error});
    }
}

// add Comment to DB
const postComment = async (req, res) => {
    try {
        const savedComment = await save(req);
        res.redirect('/comment');
    } catch (error) {
        console.log(error)
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postComment,
    getComments
}