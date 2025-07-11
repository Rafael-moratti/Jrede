"document.addEventListener('DOMContentLoaded', () => {"
// ----- ESTADO INICIAL DA REDE (OBJETO DE DADOS) -----
let networkState = { pc1: {
"ip: '192.168.0.10',"
"mask: '255.255.255.0',"
gateway: '192.168.0.1'
"},"
router: {
"ip: '192.168.0.1',"
mask: '255.255.255.0'
}
};
// ----- ELEMENTOS DO DOM -----
// Abas
const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
// Modais e formulários
const pcModal = document.getElementById('pc-modal');
const routerModal = document.getElementById('router-modal');
const openPcModalBtn = document.getElementById('open-pc-modal');
const openRouterModalBtn = document.getElementById('open-router-modal'); const closePcModalBtn = document.getElementById('close-pc-modal');
const closeRouterModalBtn = document.getElementById('close-router-modal'); const pcForm = document.getElementById('pc-form');
const routerForm = document.getElementById('router-form');
// Displays de informação na Topologia
const pc1IpDisplay = document.getElementById('pc1-ip-display');
const pc1GatewayDisplay = document.getElementById('pc1-gateway-display'); const routerLanDisplay = document.getElementById('router-lan-display');
const pc1Status = document.getElementById('pc1-status');
const routerStatus = document.getElementById('router-status');
// Modelos OSI/TCP-IP
const layers = document.querySelectorAll('.layer');
const modelInfoPanel = document.getElementById('model-info');
// Serviço DNS
const dnsInput = document.getElementById('dns-input');
const dnsResolveBtn = document.getElementById('dns-resolve-btn'); const dnsResult = document.getElementById('dns-result');
// ----- LÓGICA DE NAVEGAÇÃO POR ABAS -----
tabs.forEach(tab => {
"tab.addEventListener('click', () => {"
// Remove a classe 'active' de todas as abas e conteúdos tabs.forEach(item => item.classList.remove('active')); tabContents.forEach(content => content.classList.remove('active'));
});
});
// Adiciona 'active' à aba clicada e ao conteúdo correspondente
tab.classList.add('active'); document.getElementById(tab.dataset.tab).classList.add('active');
// ----- LÓGICA DOS MODAIS (JANELAS DE CONFIGURAÇÃO) -----
openPcModalBtn.onclick = () => pcModal.style.display = 'block'; openRouterModalBtn.onclick = () => routerModal.style.display = 'block'; closePcModalBtn.onclick = () => pcModal.style.display = 'none'; closeRouterModalBtn.onclick = () => routerModal.style.display = 'none';
window.onclick = (event) => {
if (event.target == pcModal) pcModal.style.display = 'none';
if (event.target == routerModal) routerModal.style.display = 'none';
};
// ----- LÓGICA DE CONFIGURAÇÃO DA REDE -----
"pcForm.addEventListener('submit', (e) => { e.preventDefault();"
networkState.pc1.ip = document.getElementById('pc-ip').value; networkState.pc1.mask = document.getElementById('pc-mask').value; networkState.pc1.gateway = document.getElementById('pc-gateway').value; pcModal.style.display = 'none';
updateUI();
});
"routerForm.addEventListener('submit', (e) => {"
e.preventDefault();
networkState.router.ip = document.getElementById('router-ip').value; networkState.router.mask = document.getElementById('router-mask').value; routerModal.style.display = 'none';
updateUI();
});
// ----- FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO DA INTERFACE -----
function updateUI() {
// Atualiza os textos no diagrama pc1IpDisplay.textContent = `IP: ${networkState.pc1.ip}`;
pc1GatewayDisplay.textContent = `Gateway: ${networkState.pc1.gateway}`;
routerLanDisplay.textContent = `LAN: ${networkState.router.ip}`;
// Lógica de simulação de conexão
let isPcConnected = false;
let isRouterConfigOk = true; // Assume que o roteador está sempre OK se tiver um IP
// Validação simples: O gateway do PC deve ser o IP do roteador
// e ambos devem estar na mesma sub-rede (verificado pelo prefixo do IP)
"const pcSubnet = networkState.pc1.ip.substring(0, networkState.pc1.ip.lastIndexOf('.')); const routerSubnet = networkState.router.ip.substring(0,"
networkState.router.ip.lastIndexOf('.'));
if (networkState.pc1.gateway === networkState.router.ip && pcSubnet ===
routerSubnet) {
isPcConnected = true;
}
// Atualiza o status visual do PC
pc1Status.className = 'status-indicator'; // Limpa classes pc1Status.classList.add(isPcConnected ? 'online' : 'offline');
// Atualiza o status visual do Roteador (simples)
routerStatus.className = 'status-indicator'; // Limpa classes routerStatus.classList.add(isRouterConfigOk ? 'online' : 'offline');
}
// ----- LÓGICA DOS MODELOS OSI E TCP/IP -----
const modelInfo = {
"'osi-7': '<strong>Camada de Aplicação:</strong> Fornece serviços de rede para aplicações do usuário. Protocolos: HTTP, FTP, SMTP, DNS.',"
"'osi-6': '<strong>Camada de Apresentação:</strong> Formata e traduz dados para a camada de aplicação. Criptografia, compressão.',"
"'osi-5': '<strong>Camada de Sessão:</strong> Estabelece, gerencia e termina conexões (sessões) entre aplicações.',"
"'osi-4': '<strong>Camada de Transporte:</strong> Fornece transferência de dados confiável (TCP) ou não confiável (UDP) entre hosts. Controle de fluxo e de erro.',"
"'osi-3': '<strong>Camada de Rede:</strong> Responsável pelo endereçamento lógico (IP), roteamento e encaminhamento de pacotes entre redes. Protocolos: IPv4, IPv6, ICMP, IPsec.',"
"'osi-2': '<strong>Camada de Enlace:</strong> Lida com o endereçamento físico (MAC Address) e o acesso ao meio físico. Organiza bits em quadros (frames).',"
"'osi-1': '<strong>Camada Física:</strong> Transmite bits brutos por um meio de comunicação. Define especificações elétricas e físicas (cabos, conectores, sinais de rádio).',"
"'tcp-4': '<strong>Camada de Aplicação:</strong> Combina as funções das camadas de Aplicação, Apresentação e Sessão do modelo OSI. Protocolos: HTTP, SMTP, DNS.',"
"'tcp-3': '<strong>Camada de Transporte:</strong> Equivalente à camada de Transporte do OSI. Garante a comunicação fim a fim. Protocolos: TCP, UDP.',"
'tcp-2': '<strong>Camada Internet (Rede):</strong> Equivalente à camada de Rede do
"OSI. Responsável pelo endereçamento IP e roteamento. Protocolos: IP, ICMP.',"
'tcp-1': '<strong>Camada de Acesso à Rede:</strong> Combina as camadas de Enlace
e Física do OSI. Lida com todo o hardware e protocolos para a conexão física à rede.'
};
layers.forEach(layer => {
"layer.addEventListener('click', () => { layers.forEach(l => l.classList.remove('active')); layer.classList.add('active');"
const infoKey = layer.getAttribute('data-info'); modelInfoPanel.innerHTML = modelInfo[infoKey] || '<p>Informação não
encontrada.</p>';
});
});
// ----- LÓGICA DO SIMULADOR DNS -----
"const dnsDatabase = { 'www.google.com': '172.217.22.196',"
"'www.github.com': '140.82.121.4',"
"'www.uol.com.br': '200.147.3.29',"
'localhost': '127.0.0.1'
};
"dnsResolveBtn.addEventListener('click', () => {"
const domain = dnsInput.value.toLowerCase().trim(); if (dnsDatabase[domain]) {
dnsResult.innerHTML = `> Consulta para: <strong>${domain}</strong><br>> Endereço IP: <strong>${dnsDatabase[domain]}</strong>`;
} else {
dnsResult.innerHTML = `> Consulta para: <strong>${domain}</strong><br>> Erro: Nome de domínio não encontrado em nossa base de dados simulada.`;
}
});
});
// ----- INICIALIZAÇÃO DA UI -----
updateUI();
