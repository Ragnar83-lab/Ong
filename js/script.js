// js/form.js

// Espera o documento carregar para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. APLICAÇÃO DAS MÁSCARAS ---
    
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        IMask(cpfInput, { mask: '000.000.000-00' });
    }

    const telInput = document.getElementById('telefone');
    if (telInput) {
        IMask(telInput, { mask: '(00) 00000-0000' });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        IMask(cepInput, { mask: '00000-000' });
    }


    // --- 2. INTERATIVIDADE DA SEÇÃO DE DOAÇÃO ---

    const radioMetodos = document.querySelectorAll('input[name="metodo_doacao"]');
    const detalhesPix = document.getElementById('detalhes-pix');
    const detalhesCartao = document.getElementById('detalhes-cartao');
    const detalhesTransf = document.getElementById('detalhes-transferencia');
    
    function esconderTodosDetalhes() {
        if (detalhesPix) detalhesPix.classList.add('hidden');
        if (detalhesCartao) detalhesCartao.classList.add('hidden');
        if (detalhesTransf) detalhesTransf.classList.add('hidden');
    }

    radioMetodos.forEach(function(radio) {
        radio.addEventListener('change', function() {
            esconderTodosDetalhes();

            if (this.checked) {
                if (this.value === 'pix' && detalhesPix) {
                    detalhesPix.classList.remove('hidden');
                } else if (this.value === 'cartao' && detalhesCartao) {
                    detalhesCartao.classList.remove('hidden');
                } else if (this.value === 'transferencia' && detalhesTransf) {
                    detalhesTransf.classList.remove('hidden');
                }
            }
        });
    });

    // --- 3. NOVO: PREENCHIMENTO AUTOMÁTICO DE ENDEREÇO (API ViaCEP) ---
    
    if (cepInput) {
        // Adiciona um "ouvinte" que dispara quando o usuário sai do campo CEP
        cepInput.addEventListener('blur', function() {
            // Pega o valor do CEP e remove traços/pontos (ex: 01001-000 -> 01001000)
            const cepLimpo = cepInput.value.replace(/\D/g, '');

            // Verifica se o CEP tem 8 dígitos
            if (cepLimpo.length === 8) {
                buscarEndereco(cepLimpo);
            }
        });
    }

    // Função assíncrona para buscar dados na API
    async function buscarEndereco(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        try {
            // 1. Tenta buscar os dados
            const response = await fetch(url);
            
            // 2. Converte a resposta para o formato JSON
            const data = await response.json();

            // 3. Verifica se a API retornou um erro (CEP não encontrado)
            if (data.erro) {
                alert('CEP não encontrado. Por favor, verifique e tente novamente.');
                limparCamposEndereco();
            } else {
                // 4. Preenche os campos do formulário com os dados
                preencherCamposEndereco(data);
            }

        } catch (error) {
            // 5. Captura erros de rede (ex: sem internet)
            console.error('Erro ao buscar CEP:', error);
            alert('Não foi possível buscar o CEP. Verifique sua conexão.');
        }
    }

    function preencherCamposEndereco(data) {
        // Seleciona os campos de endereço
        const enderecoInput = document.getElementById('endereco');
        const cidadeInput = document.getElementById('cidade');
        const estadoInput = document.getElementById('estado');

        // Preenche os valores
        if (enderecoInput) enderecoInput.value = data.logradouro; // logradouro = rua/avenida
        if (cidadeInput) cidadeInput.value = data.localidade;
        if (estadoInput) estadoInput.value = data.uf; // uf = sigla do estado (SP, RJ)
    }

    function limparCamposEndereco() {
        const enderecoInput = document.getElementById('endereco');
        const cidadeInput = document.getElementById('cidade');
        const estadoInput = document.getElementById('estado');

        if (enderecoInput) enderecoInput.value = '';
        if (cidadeInput) cidadeInput.value = '';
        if (estadoInput) estadoInput.value = '';
    }

});