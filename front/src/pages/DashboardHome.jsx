import { useState, useEffect, useContext } from "react";
//import {getTodasTransacoes} from "../services/api";
import { getMensal, getCategoria, getSemanal, getHistorico } from "../services/api";
import { UserContext } from "../context/UserContext";
import ChartCard from "../components/ChartCard";
import { toast } from "react-toastify";

import "../style/Dashboard.css";

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const processarDadosMensais = (dadosDoBanco) => {
  if (!Array.isArray(dadosDoBanco)) return { categories: [], entradas: [], saidas: [] };
  const categories = [];
  const entradas = [];
  const saidas = [];
  dadosDoBanco.forEach(item => {
    const [ano, mes] = item.mes_ano.split('-');
    const mesIndex = parseInt(mes, 10) - 1;

    if (MESES[mesIndex]) {
      categories.push(MESES[mesIndex]);
      entradas.push(parseFloat(item.entradas));
      saidas.push(parseFloat(item.saidas));
    }
  });
  return { categories, entradas, saidas };
};

const processarDadosCategoria = (dadosDoBanco) => {
  if (!Array.isArray(dadosDoBanco)) return [];
  return dadosDoBanco; 
};

const processarDadosSemanais = (dadosDoBanco) => {
  if (!Array.isArray(dadosDoBanco)) return { categories: [], entradas: [], saidas: [] };
  const categories = [];
  const entradas = [];
  const saidas = [];
  dadosDoBanco.forEach(item => {
    categories.push(item.semana_inicio);
    entradas.push(parseFloat(item.entradas)); // parseFloat por segurança
    saidas.push(parseFloat(item.saidas));
  });
  return { categories, entradas, saidas };
}

function DashboardHome() {
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    pizza: [],
    barras: { categories: [], entradas: [], saidas: [] },
    historico: [],
  });
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) { 
          return; 
      }
      setLoading(true); 

      try {
        //const response = await getTodasTransacoes(userId);
        /*const responseMensal = await getMensal(userId);
        const responseCategoria = await getCategoria(userId);
        const responseSemanal = await getSemanal(userId);
        */
        const [responseMensal, responseCategoria, responseSemanal, responseHistorico] = await Promise.all([
          getMensal(userId),
          getCategoria(userId),
          getSemanal(userId),
          getHistorico(userId)
        ]);
        //const transacoesBrutas = response?.data?.message || [];
        const dadosMensaisFormatados = processarDadosMensais(responseMensal.data.message);
        const dadosCategoriaFormatados = processarDadosCategoria(responseCategoria.data.message);
        const dadosSemanaisFormatados = processarDadosSemanais(responseSemanal.data.message);
        const dadosHistorico = responseHistorico.data.message;
        console.log(dadosHistorico);
        setDashboardData({
          pizza: dadosCategoriaFormatados,
          barras: dadosMensaisFormatados,
          semanal: dadosSemanaisFormatados,
          historico: dadosHistorico,
        });

      } catch (error) {
        toast.error(`Erro ao carregar dados do dashboard: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return (
        <div className="w-full h-screen flex items-center justify-center text-gray-600 gap-2">
            <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full"></div>
            {" "}Carregando dados...
        </div>
    )
  }

  return (
    <div className="dashboard-home-container">
      <div className="dashboard-grid">

        <div className="dashboard-cardPie">
          <div className="dashboard-cardPie-interno">
            <ChartCard 
              title="Saídas por Categoria" 
              defaultType="pie"
              defaultData="categoria"
              dashboardData={dashboardData} 
            />
          </div>
        </div>

        <div className="dashboard-cardMensal">
          <div className="dashboard-cardMensal-interno"> 
            <ChartCard 
              title="Balanço Mensal" 
              defaultType="bar"
              defaultData="mensal"
              dashboardData={dashboardData}
            />
          </div>
        </div>
        <div className="col-span-3 row-span-2 bg-linear-to-br from-purple-600/40 to-purple-800/100 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-md">
          <div className="w-16 h-16 bg-white/20 rounded-full mb-3 flex items-center justify-center text-4xl backdrop-blur-sm">
            💳
          </div>
          <h3 className="font-semibold text-base text-center">Métodos de Pagamento</h3>
          <p className="text-xs text-purple-200 mt-2 text-center">Cartão de Crédito Principal</p>
        </div>
        <div className="dashboard-cardLinha">
          <div className="dashboard-cardLinha-interno">
            <ChartCard 
              title="Evolução (Linha)" 
              defaultType="line"
              defaultData="semanal"
              dashboardData={dashboardData}
            />
          </div>
        </div>
        <div className="dashboard-cardHistorico">
          <h2 className="dashboard-cardHistorico-title">Histórico</h2>
          <p className="dashboard-cardHistorico-subtitle">Últimas 5 movimentações</p>
          
          <div className="dashboard-cardHistorico-list">
            {dashboardData.historico.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                <p>Nenhuma transação encontrada.</p>
              </div>
            ) : (
              dashboardData.historico.map((transacao, index) => (
                <div key={index} className="dashboard-cardHistorico-item">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-sm">{transacao.categoria || "Geral"}</span> 
                    <span className="text-xs text-gray-400">{transacao.descricao || "Sem descrição"}</span>
                  </div>
                  <span className={`text-sm font-bold ${transacao.tipo_de_transacao?.toLowerCase() === 'receita' ? "text-emerald-600" : "text-rose-500"}`}>
                    {transacao.tipo_de_transacao?.toLowerCase() === 'receita' ? '+' : '-'} 
                    R$ {parseFloat(transacao.valor).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;