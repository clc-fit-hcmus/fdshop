const {query, save, queryOne, queryFor, count} = require("./fdsService");

// get FDs from DB
const getFDs = async (req, res) => {
    try {
        const fds = await query();
        res.status(200).json({success: true, data: fds});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

//get FDs from DB with name
const getFD = async (req, res) => {
    const fdname = req.params.fdname;
    try {
        const fds = await query({phone_number: fdname});
        res.status(200).json({success: true, data: fds});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

const postFD = async (req, res) => {
    try {
        const savedFD = await save(req);
        res.status(201).json({success: true, data: savedFD});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

const getList = async (req, res) => {
    try {
        const perPage = 8;
        const maxPage = Math.ceil((await count()) / perPage);
        const page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
        
        const fds = await queryFor((perPage * page) - perPage, perPage);

        res.render('fds/menu', {
            fds,
            current: page,
            is_overload: page >= maxPage,
            is_notOne: maxPage > 1,
            pages: maxPage,
            next: parseInt(page) + 1,
            prev: (c = parseInt(page) - 1) ? c : 0
          });
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

const getDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const fd = await queryOne({ _id: id });
        res.render('fds/detail', { fd });
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};

module.exports = {
    postFD,
    getFDs,
    getFD,
    getList,
    getDetail
}