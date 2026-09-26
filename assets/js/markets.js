/* f:/FINANCE/DEMAT/assets/js/markets.js */

document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Instruments
    const instruments = [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            type: 'equities',
            price: '175.43',
            change: '+1.25%',
            isUp: true,
            volume: '54.2M',
            avgVol: '62.1M',
            marketCap: '2.8T',
            pe: '28.5'
        },
        {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            type: 'equities',
            price: '215.20',
            change: '-2.10%',
            isUp: false,
            volume: '112.5M',
            avgVol: '105.3M',
            marketCap: '685B',
            pe: '65.2'
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corp.',
            type: 'equities',
            price: '330.11',
            change: '+0.85%',
            isUp: true,
            volume: '22.1M',
            avgVol: '25.4M',
            marketCap: '2.4T',
            pe: '32.1'
        },
        {
            symbol: 'BTC/USD',
            name: 'Bitcoin',
            type: 'crypto',
            price: '43,250.00',
            change: '+3.40%',
            isUp: true,
            volume: '15.2B',
            avgVol: '18.5B',
            marketCap: '840B',
            pe: 'N/A'
        },
        {
            symbol: 'ETH/USD',
            name: 'Ethereum',
            type: 'crypto',
            price: '2,250.10',
            change: '-0.50%',
            isUp: false,
            volume: '8.4B',
            avgVol: '9.1B',
            marketCap: '270B',
            pe: 'N/A'
        },
        {
            symbol: 'EUR/USD',
            name: 'Euro / US Dollar',
            type: 'forex',
            price: '1.0854',
            change: '+0.12%',
            isUp: true,
            volume: 'N/A',
            avgVol: 'N/A',
            marketCap: 'N/A',
            pe: 'N/A'
        },
        {
            symbol: 'GBP/USD',
            name: 'British Pound / USD',
            type: 'forex',
            price: '1.2640',
            change: '-0.08%',
            isUp: false,
            volume: 'N/A',
            avgVol: 'N/A',
            marketCap: 'N/A',
            pe: 'N/A'
        },
        {
            symbol: 'NVDA',
            name: 'NVIDIA Corp.',
            type: 'equities',
            price: '485.20',
            change: '+4.15%',
            isUp: true,
            volume: '45.8M',
            avgVol: '50.2M',
            marketCap: '1.2T',
            pe: '110.5'
        }
    ];

    const marketGrid = document.getElementById('marketGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Modal elements
    const modalOverlay = document.getElementById('marketModalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalName = document.getElementById('modalName');
    const modalPrice = document.getElementById('modalPrice');
    const modalChange = document.getElementById('modalChange');
    const statBoxes = document.querySelectorAll('.stat-grid .stat-value');

    function renderCards(filterType) {
        if (!marketGrid) return;
        marketGrid.innerHTML = '';

        const filtered = filterType === 'all' 
            ? instruments 
            : instruments.filter(inst => inst.type === filterType);

        filtered.forEach(inst => {
            const card = document.createElement('div');
            card.className = 'card instrument-card';
            card.setAttribute('data-symbol', inst.symbol);

            const changeClass = inst.isUp ? 'up' : 'down';
            const changeIcon = inst.isUp ? 'ph-trend-up' : 'ph-trend-down';

            card.innerHTML = `
                <div class="card-header">
                    <h3>${inst.name}</h3>
                    <span class="symbol">${inst.symbol}</span>
                </div>
                <div class="price-row">
                    <span class="price">$${inst.price}</span>
                    <span class="change ${changeClass}"><i class="ph ${changeIcon}"></i> ${inst.change}</span>
                </div>
                <div class="mini-chart"></div>
                <button class="btn btn-outline" style="width: 100%; font-size: 0.875rem; padding: 8px;">View Details</button>
            `;

            // Add click listener to open modal
            card.addEventListener('click', () => openModal(inst));
            marketGrid.appendChild(card);
        });
    }

    function openModal(inst) {
        if (!modalOverlay) return;

        modalTitle.textContent = inst.symbol;
        modalName.textContent = inst.name;
        modalPrice.textContent = `$${inst.price}`;
        
        modalChange.textContent = inst.change;
        modalChange.className = 'change ' + (inst.isUp ? 'up' : 'down');
        const modalChart = document.getElementById('modalChart');
        if (modalChart) modalChart.classList.toggle('down', !inst.isUp);

        // Update stats
        if (statBoxes.length >= 4) {
            statBoxes[0].textContent = inst.volume;
            statBoxes[1].textContent = inst.avgVol;
            statBoxes[2].textContent = inst.marketCap;
            statBoxes[3].textContent = inst.pe;
        }

        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Initialize
    renderCards('all');

    // Filter Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Re-render
            const type = btn.getAttribute('data-filter');
            renderCards(type);
        });
    });

    // Close Modal Events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
            closeModal();
        }
    });
});
