/**
 * Extrait une valeur numérique d'un élément HTML.
 * @param {string} elementId - ID de l'élément HTML.
 * @param {boolean} [allowDecimals=true] - Autorise les décimaux.
 * @param {boolean} [isAmericanFormat=true] - Indique si le texte est au format américain.
 * @returns {number} - Valeur numérique extraite.
 */
function getNumericValue(elementId, allowDecimals = true, isAmericanFormat = true) {
    const element = document.getElementById(elementId);
    if (!element) return 0;

    let text = element.textContent.trim();
    text = text.replace(/[^\d,-.]/g, '');

    if (isAmericanFormat) {
        text = text.replace(/,/g, '');
    } else {
        text = text.replace(/\./g, '').replace(/,/, '.');
    }

    const value = parseFloat(text);
    return allowDecimals ? value : Math.floor(value);
}


// Objet pour encapsuler les intervalles et éviter les variables globales
const paperclipAutomator = {
    isRunning: false,
    intervalId: null,

    /**
     * Extrait une valeur numérique d'un élément HTML.
     * @param {string} elementId - ID de l'élément HTML.
     * @param {boolean} [allowDecimals=true] - Autorise les décimaux.
     * @param {boolean} [isAmericanFormat=true] - Format américain (ex: 1,000).
     * @returns {number} - Valeur numérique extraite.
     */
    getNumericValue: function(elementId, allowDecimals = true, isAmericanFormat = true) {
        const element = document.getElementById(elementId);
        if (!element) return 0;

        let text = element.textContent.trim();
        text = text.replace(/[^\d,-.]/g, '');

        if (isAmericanFormat) {
            text = text.replace(/,/g, '');
        } else {
            text = text.replace(/\./g, '').replace(/,/, '.');
        }

        return allowDecimals ? parseFloat(text) : Math.floor(parseFloat(text));
    },

    /**
     * Clique automatiquement sur "Make Paperclip" jusqu'à ce qu'un autoclipper soit disponible.
     */
    start: function() {
        if (this.isRunning) return; // Évite les intervalles multiples

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            const makePaperclipButton = document.getElementById('btnMakePaperclip');
            if (makePaperclipButton && !makePaperclipButton.disabled) {
                makePaperclipButton.click();
            }

            // Vérifie si un autoclipper est disponible
            const autoClipperButton = document.getElementById('btnMakeClipper');
            const megaClipperButton = document.getElementById('btnMakeMegaClipper');

            if ((autoClipperButton && !autoClipperButton.disabled) ||
                (megaClipperButton && !megaClipperButton.disabled)) {
				wireBuyer.start();
				clipperBuyer.start(); // Démarre l'achat automatique des clippers
				console.log('Autoclipper disponible ! Lancement de l\'achat automatique.');
				priceManager.start(); // Démarre l'ajustement du prix
				console.log('Autoclipper disponible ! Achat et ajustement du prix activés.');
				projectBuyer.start();
				console.log('Autoclipper disponible ! Achat et ajustement du prix activés.');
				resourceBuyer.start();
				quantumComputer.start();
			}
        }, 100); // Intervalle de 100ms
    },

    /**
     * Arrête le clic automatique.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};


// Objet pour gérer l'achat automatique des clippers
const clipperBuyer = {
    isRunning: false,
    intervalId: null,

    /**
     * Achte le clipper le moins cher disponible si les fonds le permettent.
     */
    buyCheapestClipper: function() {
        const funds = paperclipAutomator.getNumericValue('funds');
        const autoClipperButton = document.getElementById('btnMakeClipper');
        const megaClipperButton = document.getElementById('btnMakeMegaClipper');

        // Vérifie si les boutons existent et ne sont pas désactivés
        if (autoClipperButton && !autoClipperButton.disabled) {
            const autoClipperCost = paperclipAutomator.getNumericValue('clipperCost'); // Remplace par l'ID réel du coût
            if (funds >= autoClipperCost) {
                autoClipperButton.click();
                console.log('Achat d\'un AutoClipper');
                return true;
            }
        }

        if (megaClipperButton && !megaClipperButton.disabled) {
            const megaClipperCost = paperclipAutomator.getNumericValue('megaClipperCost'); // Remplace par l'ID réel du coût
            if (funds >= megaClipperCost) {
                megaClipperButton.click();
                console.log('Achat d\'un MegaClipper');
                return true;
            }
        }

        return false;
    },

    /**
     * Démarre la vérification et l'achat automatique des clippers.
     */
    start: function() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.buyCheapestClipper();
        }, 1000); // Vérifie toutes les secondes
    },

    /**
     * Arrête l'achat automatique des clippers.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};

const wireBuyer = {
    // Éléments DOM
    btnBuyWire: document.getElementById('btnBuyWire'),
    wireBuyerDiv: document.getElementById('wireBuyerDiv'),
    btnToggleWireBuyer: document.getElementById('btnToggleWireBuyer'),
    wireBuyerStatus: document.getElementById('wireBuyerStatus'),

    // Interval ID pour gérer les boucles
    intervalId: null,

    // Délai entre les tentatives (en ms)
    delay: 100,

    // Vérifie si wireBuyerDiv est disponible
    isDivAvailable: function() {
        return this.wireBuyerDiv && this.wireBuyerDiv.offsetParent !== null;
    },

    // Vérifie si le statut est "ON"
    isStatusOn: function() {
        return this.wireBuyerStatus.textContent.trim() === 'ON';
    },

    // Phase 1 : Cliquer sur btnBuyWire jusqu'à ce que wireBuyerDiv soit disponible
    buyWirePhase: function() {
        if (!this.isDivAvailable()) {
            this.btnBuyWire.click();
        } else {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.toggleWireBuyerPhase(); // Passe à la phase 2
        }
    },

    // Phase 2 : Cliquer sur btnToggleWireBuyer jusqu'à ce que le statut soit "ON"
    toggleWireBuyerPhase: function() {
        this.intervalId = setInterval(() => {
            if (!this.isStatusOn()) {
                this.btnToggleWireBuyer.click();
            } else {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }, this.delay);
    },

    // Démarre l'automatisation (phase 1)
    start: function() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => this.buyWirePhase(), this.delay);
    },

    // Arrête tout
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
};


// Objet pour gérer l'ajustement automatique du prix
const priceManager = {
    isRunning: false,
    intervalId: null,

    /**
     * Ajuste le prix pour maintenir la demande à 100%.
     */
    adjustPriceForMaxDemand: function() {
        const demand = paperclipAutomator.getNumericValue('demand');
        if (demand < 100) {
            const lowerPriceButton = document.getElementById('btnLowerPrice');
            if (lowerPriceButton && !lowerPriceButton.disabled) {
                lowerPriceButton.click();
                console.log('Baisse du prix pour augmenter la demande à 100%.');
            }
        }
        // Optionnel : Si tu veux maximiser les profits, tu peux ajouter une logique pour augmenter le prix si la demande est très élevée (>95%) et que les ventes sont bonnes.
    },

    /**
     * Démarre l'ajustement automatique du prix.
     */
    start: function() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.adjustPriceForMaxDemand();
        }, 2000); // Vérifie toutes les 2 secondes
    },

    /**
     * Arrête l'ajustement automatique du prix.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};

// Liste des projets à exclure (par texte affiché)
const EXCLUDED_PROJECTS = [
    "Release the HypnoDrones",
    "Space Exploration"
];

// Objet pour gérer l'achat automatique des projets
const projectBuyer = {
    isRunning: false,
    intervalId: null,

    /**
     * Vérifie si un projet est dans la liste des exclus.
     * @param {HTMLElement} projectButton - Bouton du projet.
     * @returns {boolean} - True si le projet est exclu.
     */
    isProjectExcluded: function(projectButton) {
        const projectName = projectButton.querySelector('span').textContent;
        return EXCLUDED_PROJECTS.some(excluded => projectName.includes(excluded));
    },

    /**
     * Achete tous les projets disponibles et non exclus.
     */
    buyAvailableProjects: function() {
        const funds = paperclipAutomator.getNumericValue('funds');
        // Sélectionne tous les boutons de projet visibles et non désactivés
        const projectButtons = document.querySelectorAll('.projectButton:not([disabled]):not([style*="visibility: hidden"])');

        projectButtons.forEach(button => {
            if (this.isProjectExcluded(button)) {
                return; // Ignore les projets exclus
            }
			button.click();
			console.log(`Achat du projet : ${button.querySelector('span').textContent}`);
        });
    },

    /**
     * Démarre l'achat automatique des projets.
     */
    start: function() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.buyAvailableProjects();
        }, 3000); // Vérifie toutes les 3 secondes
    },

    /**
     * Arrête l'achat automatique des projets.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};

// Objet pour gérer l'achat automatique de mémoire et processeurs
const resourceBuyer = {
    isRunning: false,
    intervalId: null,
    targetMemory: 70,

    /**
     * Achte des ressources (mémoire ou processeurs) selon la stratégie.
     */
    buyResources: function() {
        const memory = paperclipAutomator.getNumericValue('memory');
        const processors = paperclipAutomator.getNumericValue('processors');

        // Boutons d'achat
        const btnAddMem = document.getElementById('btnAddMem');
        const btnAddProc = document.getElementById('btnAddProc');

        // Priorité : atteindre 70 mémoires
        if (memory < this.targetMemory) {
            if (btnAddMem && !btnAddMem.disabled) {
                btnAddMem.click();
                console.log(`Achat de mémoire (${memory + 1}/70).`);
                return;
            }
        }

        // Équilibre : processors = memory
        if (memory >= this.targetMemory) {
            if (processors < memory && btnAddProc && !btnAddProc.disabled) {
                btnAddProc.click();
                console.log(`Achat d'un processeur (${processors + 1} vs ${memory} mémoire).`);
            }
            // Si on a plus de processeurs que de mémoire, on achète de la mémoire
            else if (processors > memory && btnAddMem && !btnAddMem.disabled) {
                btnAddMem.click();
                console.log(`Achat de mémoire pour équilibrer (${processors} processeurs).`);
            }
        }
    },

    /**
     * Démarre l'achat automatique des ressources.
     */
    start: function() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.buyResources();
        }, 1000); // Vérifie toutes les secondes
    },

    /**
     * Arrête l'achat automatique des ressources.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};

// Objet pour gérer le calcul quantique automatique
const quantumComputer = {
    isRunning: false,
    intervalId: null,

    /**
     * Calcule la moyenne d'opacité des qChips.
     * @returns {number} - Moyenne des opacités.
     */
    getAverageOpacity: function() {
        const chips = document.querySelectorAll('.qChip');
        let sum = 0;
        chips.forEach(chip => {
            const opacity = parseFloat(chip.style.opacity);
            sum += opacity;
        });
        return sum / chips.length;
    },

    /**
     * Clique sur "Compute" si la moyenne d'opacité > 0.
     */
    computeIfReady: function() {
        const avgOpacity = this.getAverageOpacity();
        const btnQcompute = document.getElementById('btnQcompute');

        if (avgOpacity > 0 && btnQcompute && !btnQcompute.disabled) {
            btnQcompute.click();
            console.log(`Calcul quantique lancé (moyenne: ${avgOpacity.toFixed(3)}).`);
        }
    },

    /**
     * Démarre la vérification automatique.
     */
    start: function() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.computeIfReady();
        }, 500); // Vérifie toutes les 500ms pour plus de réactivité
    },

    /**
     * Arrête la vérification automatique.
     */
    stop: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
        }
    }
};

paperclipAutomator.start();
