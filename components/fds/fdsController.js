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
        let char = "";
        if (req.query.search) char = req.query.search;
        if (req.query.is_drink == 'true') {
            is_drink = "&is_drink=true";
            maxPage = Math.ceil((await count({is_drink: true, name: {$regex: char, $options: 'i'}})) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryForFilter({is_drink: false, name: {$regex: char, $options: 'i'}}, (perPage * page) - perPage, perPage).sort(req.query.sort);
        } else if (req.query.is_drink == 'false') {
            is_drink = "&is_drink=false";
            maxPage = Math.ceil((await count({is_drink: false, name: {$regex: char, $options: 'i'}})) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryForFilter({is_drink: false, name: {$regex: char, $options: 'i'}}, (perPage * page) - perPage, perPage).sort(req.query.sort);
        } else {
            maxPage = Math.ceil((await count({name: {$regex: char, $options: 'i'}})) / perPage);
            page = ((t = (req.query.page || 1)) <= maxPage) && (t > 0) ? t : 1;
            fds = await queryForFilter({name: {$regex: char, $options: 'i'}}, (perPage * page) - perPage, perPage).sort(req.query.sort);
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
            sort: sort,
            search: req.query.search ? "&search=" + char : null
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
        let min = null;
        let index = null;
        let temp = await query().sort("price");
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].name == fd.name) index = i;
        }
        if (index - 2 >= 0) {
            min = index - 2;
        }
        if (index + 2 > temp.length) {
            min = index - 3 - (index + 2 - temp.length);
        }
        let fds = await query().sort("price").skip(min).limit(5);
        for (var i = 0; i < fds.length; i++) {
            if (fds[i].name == fd.name) index = i;
        }
        fds.splice(index, 1);
        res.render('fds/detail', { fd, fds });
    } catch (error) {
        console.log(error);
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