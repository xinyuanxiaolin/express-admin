const express = require("express");
const RoleControler = require("../controller/role");
const router = express.Router();

router.post("/role/roleAdd", RoleControler.roleAdd);
router.delete("/role/roleDelete", RoleControler.roleDelete);
router.get("/role/roleMenuTreeList", RoleControler.roleMenuTreeList);
router.put("/role/roleEdit", RoleControler.roleEdit);
module.exports = router;
