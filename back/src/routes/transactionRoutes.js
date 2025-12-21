const router = require("express").Router();
const transactionController = require("../controller/transactionController");

const auth = require("../middleware/auth");

router.get("/read/all-transactions/:id", auth, transactionController.getAllTransactions);
router.get("/read/get-transaction/:idTransacao/:id", auth, transactionController.getTransaction);
router.post("/create/transaction/:id", auth, transactionController.createTransaction);
router.patch("/update/transaction/:idTransacao/:id", auth, transactionController.updateTransaction);
router.delete("/delete/transaction/:idTransacao/:id", auth, transactionController.deleteTransaction);

//router.get("/read/dashboard-data/:id", auth, transactionController.getDashboardData);

//router.get("/read/filter-by-range/:id/:startDate/:endDate", auth, transactionController.filterByRange);
router.get("/read/mensal/:id", auth, transactionController.getMensal);
router.get("/read/categoria/:id", auth, transactionController.getCategoria);
router.get("/read/semanal/:id", auth, transactionController.getSemanal);
router.get("/read/historico/:id", auth, transactionController.getHistorico);
module.exports = router;