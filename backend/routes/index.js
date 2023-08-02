const express = require("express");
const router = express.Router();

// router.get("/hello/world", function (req, res) {
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     res.send("Hello World!");
// });

// Add a XSRF_TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "XSRF_TOKEN": csrfToken
    });
});



module.exports = router;
