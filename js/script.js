document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = '51941737379';

    // 1. Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
            mobileMenuBtn.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}"></i>`;
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menú');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    // 2. Simulador interactivo del celular en Hero
    const mockCatalogData = {
        platos: [
            { name: 'Ceviche Clásico', desc: 'Pesca del día + camote y cancha', price: 'S/ 22' },
            { name: '1/2 Pollo a la Brasa', desc: 'Papas doradas + ensalada fresca', price: 'S/ 34' },
            { name: 'Arroz Chaufa Especial', desc: 'Porción generosa al wok', price: 'S/ 18' }
        ],
        bebidas: [
            { name: 'Chicha Morada 1L', desc: 'Maíz morado natural helado', price: 'S/ 10' },
            { name: 'Limonada Frozen', desc: 'Jarra de 1 litro refrescante', price: 'S/ 12' },
            { name: 'Gaseosa 1.5L', desc: 'Inca Kola / Coca-Cola', price: 'S/ 9' }
        ],
        promos: [
            { name: 'Dúo Marino', desc: 'Ceviche + Chicharrón de pescado', price: 'S/ 38' },
            { name: 'Combo Familiar', desc: '1 Pollo + papas + gaseosa 1.5L', price: 'S/ 62' }
        ]
    };

    const mockContainer = document.getElementById('mockItemsContainer');
    const mockTabs = document.querySelectorAll('.mock-tab');

    function renderMockItems(category) {
        if (!mockContainer) return;
        const items = mockCatalogData[category] || [];
        mockContainer.innerHTML = items.map(item => `
            <div class="mock-item-row">
                <div>
                    <strong>${item.name}</strong>
                    <span>${item.desc}</span>
                </div>
                <div class="mock-price">${item.price}</div>
            </div>
        `).join('');
    }

    mockTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            mockTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMockItems(tab.dataset.mock);
        });
    });

    renderMockItems('platos');

    // 3. Filtro de galería de ejemplos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const exampleCards = document.querySelectorAll('.example-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            exampleCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Modal de Vista Previa de Ejemplos
    const modal = document.getElementById('previewModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPlan = document.getElementById('modalPlan');
    const modalItemsList = document.getElementById('modalItemsList');

    document.querySelectorAll('.open-preview').forEach(btn => {
        btn.addEventListener('click', () => {
            modalTitle.textContent = btn.dataset.title;
            modalPlan.textContent = btn.dataset.plan;
            const rawItems = btn.dataset.items.split('|');

            modalItemsList.innerHTML = rawItems.map(entry => {
                const [name, price] = entry.split(' - ');
                return `
                    <div class="modal-item-row">
                        <span>${name}</span>
                        <strong>${price}</strong>
                    </div>
                `;
            }).join('');

            modal.classList.add('active');
        });
    });

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // 5. Envío del formulario de cotización hacia WhatsApp (+51 941 737 379)
    const quoteForm = document.getElementById('whatsappQuoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value.trim();
            const business = document.getElementById('businessType').value;
            const pkg = document.getElementById('selectedPackage').value;
            const details = document.getElementById('clientMessage').value.trim();

            let message = `Hola *CATÁLOGIX*, solicito información para mi catálogo digital:%0A%0A`;
            message += `• *Cliente / Negocio:* ${encodeURIComponent(name)}%0A`;
            message += `• *Rubro:* ${encodeURIComponent(business)}%0A`;
            message += `• *Paquete:* ${encodeURIComponent(pkg)}%0A`;
            if (details) {
                message += `• *Detalles:* ${encodeURIComponent(details)}%0A`;
            }

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});
