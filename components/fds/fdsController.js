const {query, save, queryOne, queryFor, queryForFilter, count} = require("./fdsService");

// get FDs from DB
const getFDs = async (req, res) => {
    try {
        const fds = await query();
        res.status(200).json({success: true, data: fds});
    } catch (error) {
        res.status(409).json({success: false, data: [], error: error});
    }
};
// get FDs from DB
const getBestList = async (req, res) => {
    try {
        const fds = await query({ is_best: true });
        const fourth = await queryFor(0, 4);
        res.render('index', { fds, fourth });
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
        let is_drink = "";
        let sort = "";
        const perPage = 4;
        let maxPage = null;
        let fds = null;
        let page = 0;
        if (req.query.is_drink == 'true') {
            is_drink = "&is_drink=true";
            maxPage = Math.ceil((await count({ is_drink: true })) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryForFilter({ is_drink: true }, (perPage * page) - perPage, perPage).sort(req.query.sort);
        } else if (req.query.is_drink == 'false') {
            is_drink = "&is_drink=false";
            maxPage = Math.ceil((await count({ is_drink: false })) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryForFilter({ is_drink: false }, (perPage * page) - perPage, perPage).sort(req.query.sort);
        } else {
            maxPage = Math.ceil((await count()) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryFor((perPage * page) - perPage, perPage).sort(req.query.sort);
        }
        if(req.query.sort == "price") {sort="&sort=price"} else if (req.query.sort == "-price") {sort="&sort=-price"}

        res.render('fds/menu', {
            fds,
            current: page,
            is_overload: page >= maxPage,
            is_notOne: maxPage > 1,
            pages: maxPage,
            next: parseInt(page) + 1,
            prev: (c = parseInt(page) - 1) ? c : 0,
            is_drink: is_drink,
            sort: sort
          });
    } catch (error) {
        console.log(error);
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
    getDetail,
    getBestList,
}