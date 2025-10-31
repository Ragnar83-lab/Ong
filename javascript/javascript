/*
 * =========================================
 * JavaScript Principal - Animalândia (Entrega III)
 * =========================================
 *
 * Estrutura do arquivo:
 * 1. MÓDULO DE NAVEGAÇÃO (SPA BÁSICA)
 * 2. MÓDULO DE TEMPLATING (GALERIA DE ANIMAIS)
 * 3. MÓDULO DE VALIDAÇÃO (FORMULÁRIO DE VOLUNTÁRIO)
 * 4. MÓDULO DE UTILITÁRIOS (Copiar Chave PIX)
 * 5. INICIALIZAÇÃO
 * =========================================
 */

// Espera o DOM carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    /**
     * =========================================
     * 1. MÓDULO DE NAVEGAÇÃO (SPA BÁSICA)
     * =========================================
     * Implementa um sistema de Single Page Application (SPA) básico.
     * Esconde todas as seções e mostra apenas a clicada no menu.
     */
    const initSPAManagement = () => {
        const navLinks = document.querySelectorAll('.nav a');
        const sections = document.querySelectorAll('main > section');
        const header = document.querySelector('.header');

        // Função para mostrar a página/seção correta
        const showPage = (targetId) => {
            // Remove o '#' do ID
            const pageId = targetId.substring(1); 
            
            // 1. Esconde todas as seções
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // 2. Mostra a seção de destino
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.style.display = 'block';
            } else {
                // Se não encontrar (ex: link externo), mostra o início
                document.getElementById('inicio').style.display = 'block';
            }

            // 3. Atualiza a classe 'active' no menu
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
            
            // 4. Desmarca o checkbox do menu mobile (fecha o menu)
            document.getElementById('menu-toggle-checkbox').checked = false;
            
            // 5. Rola para o topo da seção (ou topo da página)
            window.scrollTo(0, 0);
        };

        // Adiciona evento de clique em cada link da navegação
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Só previne o padrão se for um link âncora interno
                if (targetId.startsWith('#')) {
                    e.preventDefault(); // Impede o "pulo" padrão do HTML
                    showPage(targetId);
                }
            });
        });

        // Mostra a página inicial (#inicio) ao carregar
        showPage('#inicio');
    };


    /**
     * =========================================
     * 2. MÓDULO DE TEMPLATING (GALERIA DE ANIMAIS)
     * =========================================
     * Carrega os animais de um objeto JS e os renderiza no DOM
     * usando um template literal.
     */
    const renderAnimalGallery = () => {
        const galleryContainer = document.getElementById('animal-gallery-container');
        if (!galleryContainer) return;

        // 1. Dados dos animais (simulando um banco de dados/API)
        const animaisData = [
            {
                imgSrc: './img/frajola.png',
                imgAlt: 'Frajola, fofinho, brincalhão e muito carinhoso',
                nome: 'Frajola',
                descricao: 'Macho, 8 meses, fofinho, brincalhão e muito carinhoso.'
            },
            {
                imgSrc: './img/caramelo.jpg',
                imgAlt: 'Bob, um cão vira-lata caramelo sorrindo.',
                nome: 'Bob',
                descricao: 'Macho, 2 anos, porte médio. Muito brincalhão!'
            },
            {
                imgSrc: './img/mia.jpg',
                imgAlt: 'Mia, uma gata siamesa com olhos azuis.',
                nome: 'Mia',
                descricao: 'Fêmea, 1 ano, porte pequeno. Calma e carinhosa.'
            }
        ];

        // 2. Limpa a galeria (o HTML original agora está vazio)
        galleryContainer.innerHTML = '';

        // 3. Cria o HTML de cada animal usando o template
        animaisData.forEach(animal => {
            const animalTemplate = `
                <div class="animais">
                    <picture><img src="${animal.imgSrc}" alt="${animal.imgAlt}" loading="lazy"></picture>
                    <div class="card-body">
                        <h3>${animal.nome}</h3>
                        <p>${animal.descricao}</p>
                    </div>
                </div>
            `;
            // Adiciona o template gerado ao container
            galleryContainer.innerHTML += animalTemplate;
        });
    };


    /**
     * =========================================
     * 3. MÓDULO DE VALIDAÇÃO (FORMULÁRIO DE VOLUNTÁRIO)
     * =========================================
     * Implementa a "verificação de consistência de dados"
     * com "aviso ao usuário" via JavaScript.
     */
    const initFormValidation = () => {
        const form = document.getElementById('form-voluntario');
        const messageContainer = document.getElementById('form-voluntario-msg');
        
        if (!form || !messageContainer) return;

        form.addEventListener('submit', (e) => {
            // 1. Impede o envio padrão do formulário
            e.preventDefault();
            
            // Limpa mensagens de erro/sucesso antigas
            messageContainer.innerHTML = '';
            messageContainer.className = '';

            // 2. Coleta de dados
            const nome = form.querySelector('#nome').value.trim();
            const email = form.querySelector('#email-voluntario').value.trim();
            const cep = form.querySelector('#cep').value.trim();
            
            let isValid = true;
            let errors = [];

            // 3. Regras de Verificação de Consistência
            
            // Regra 1: Nome deve ter pelo menos um espaço (nome e sobrenome)
            if (nome.indexOf(' ') === -1) {
                isValid = false;
                errors.push('Por favor, insira seu nome completo (nome e sobrenome).');
            }

            // Regra 2: E-mail deve ter formato válido (simplificado)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                errors.push('Por favor, insira um e-mail válido.');
            }
            
            // Regra 3: CEP deve seguir o padrão (o pattern do HTML é 00000-000)
            const cepPattern = /^\d{5}-\d{3}$/;
             if (!cepPattern.test(cep)) {
                isValid = false;
                errors.push('Por favor, insira um CEP válido no formato 00000-000.');
            }
            
            // 4. Exibição do Aviso ao Usuário
            if (!isValid) {
                // Mostra erros
                messageContainer.className = 'alert alert-danger';
                messageContainer.innerHTML = '<strong>Erro no formulário:</strong><br>' + errors.join('<br>');
            } else {
                // Mostra sucesso
                messageContainer.className = 'alert alert-success';
                messageContainer.innerHTML = '<strong>Obrigado!</strong> Seu cadastro foi enviado com sucesso.';
                form.reset(); // Limpa o formulário
            }
        });
    };
    
    
    /**
     * =========================================
     * 4. MÓDULO DE UTILITÁRIOS (Copiar Chave PIX)
     * =========================================
     * Adiciona funcionalidade ao botão "Copiar Chave"
     */
     const initUtilities = () => {
         const copyButton = document.getElementById('btn-copiar-pix');
         const pixKey = document.getElementById('chave-pix');
         
         if (!copyButton || !pixKey) return;
         
         copyButton.addEventListener('click', () => {
             const key = pixKey.textContent.trim();
             
             // Usa a API do Navegador para copiar
             navigator.clipboard.writeText(key).then(() => {
                 // Feedback visual
                 copyButton.textContent = 'Copiado!';
                 copyButton.disabled = true;
                 
                 setTimeout(() => {
                    copyButton.textContent = 'Copiar Chave';
                    copyButton.disabled = false;
                 }, 2000); // Reseta o botão após 2 segundos
                 
             }).catch(err => {
                 console.error('Falha ao copiar: ', err);
             });
         });
     };
    

    /**
     * =========================================
     * 5. INICIALIZAÇÃO
     * =========================================
     * Chama todos os módulos para iniciar a aplicação.
     */
    initSPAManagement();
    renderAnimalGallery();
    initFormValidation();
    initUtilities();

});