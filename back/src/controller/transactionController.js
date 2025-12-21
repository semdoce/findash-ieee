const transactionService = require("../services/transactionService.js");
const autenticar = require("../middleware/auth.js");
const { get } = require("../routes/transactionRoutes.js");

function idCheck(userId, idAuth){
  if(Number(userId) !== Number(idAuth)){
    return res.status(403).json({ message: "ID do usuário não corresponde ao ID autenticado."});
  }
}
async function getAllTransactions(req, res) {
  try {
    const id = req.params.id
    const idAuth = req.id
    
    idCheck(id, idAuth);

    const transactions = await transactionService.getAllTransactions(id);
    res.status(200).json({ message: transactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTransaction(req, res) {
  try {
    const transactionId = req.params.idTransacao;
    const idAuth = req.id;
    const idParam = Number(req.params.id);

    idCheck(idParam, idAuth);
    const transaction = await transactionService.getTransaction(transactionId);

    if (transaction.id_do_usuario !== idAuth) {
      return res.status(403).json({ message: "Você não tem permissão para acessar esta transação." });
    }

    return res.status(200).json({ transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createTransaction(req, res) {
  try{
    const transactionData = req.body

    const idAuth = req.id
    const idParam = Number(req.params.id)
    idCheck(idParam, idAuth);
    const newTransaction = await transactionService.createTransaction(idParam, transactionData, idAuth);

    return res.status(201).json({
      message: "Transação criada com sucesso!",
      transaction: newTransaction
    });

  }catch (err){
    res.status(500).json({ message: err.message });
  }
}

async function deleteTransaction(req, res) {
  try{
    const idAuth = req.id
    const transactionId = req.params.idTransacao;
    const idParam = Number(req.params.id)

    idCheck(idParam, idAuth);
    const result = await transactionService.deleteTransaction(transactionId, idAuth);

    return res.status(200).json({ message: result });

  } catch(err){
      res.status(500).json({message: err.message});
    }
}

async function updateTransaction(req, res) {
  try {
    const IDs = {
      idTransacao: Number(req.params.idTransacao),
      id: Number(req.params.id),
      idAuth: Number(req.id),
    } 
    const updatedData = req.body;
    
    idCheck(IDs.id, IDs.idAuth);

    const transaction = await transactionService.getTransaction(IDs.idTransacao);
    if (!transaction || transaction.id_do_usuario !== IDs.idAuth) {
      return res.status(403).json({ message: "Não autenticado ou sem transação."});
    }

    updatedData.userId = IDs.idAuth;
    const updatedTransaction = await transactionService.updateTransaction(IDs.idTransacao,updatedData, IDs.idAuth);
    return res.status(200).json({
      message: "Transação atualizada com sucesso!",
      transacao: updatedTransaction
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/*this code isnt used anywhere else
  async function getDashboardData(req, res) {
  try {
    const id = req.params.id;
    const idAuth = req.id;

    if (Number(id) !== Number(idAuth)) {
      return res.status(403).json({ message: "O ID inserido não corresponde ao usuário logado." });
    }

    const dashboardData = await transactionService.getAggregatedDashboardData(id);

    return res.status(200).json(dashboardData);
  } catch (err) {
    console.error("Erro ao buscar dados do dashboard:", err);
    return res.status(500).json({message: "Erro no processamento de  dados do dashboard."});
  } 
}*/

/*async function filterByRange(req, res) {
  try {
    const id = req.params.id;
    const idAuth = req.id;
    const { startData } = req.params.startDate
    const endDate = req.params.endDate;
    idCheck(id,idAuth);

    const filteredData = await transactionService.filterByRange(id, startData, endDate);
    return res.status(200).json({ message: filteredData });
  } catch (err) {
    console.error("Erro ao buscar dados do dashboard:", err);
    res.status(500).json({ message: err.message });
  }
}*/

async function getMensal(req, res) {
  try{
    const userId = req.params.id;
    const idAuth = req.id;
    idCheck(userId,idAuth);

    const mensalData = await transactionService.getMensal(userId);
    return res.status(200).json({ message: mensalData });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
}

async function getCategoria(req, res) {
  try{
    const userId = req.params.id;
    const idAuth = req.id;
    idCheck(userId,idAuth);
    const categoriaData = await transactionService.getCategoria(userId);
    return res.status(200).json({ message: categoriaData });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
}

async function getSemanal(req, res) {
  try{
    const userId = req.params.id;
    const idAuth = req.id;
    idCheck(userId,idAuth);
    const semanalData = await transactionService.getSemanal(userId);
    return res.status(200).json({ message: semanalData });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
}

async function getHistorico(req, res) {
  try{
    const userId = req.params.id;
    const idAuth = req.id;
    idCheck(userId,idAuth);
    const historicoData = await transactionService.getHistorico(userId);
    return res.status(200).json({ message: historicoData });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllTransactions,
  getTransaction,
//  getDashboardData,
  createTransaction,
  deleteTransaction,
  updateTransaction,
//  filterByRange,
  getMensal,
  getCategoria,
  getSemanal,
  getHistorico
}