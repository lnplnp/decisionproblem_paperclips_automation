# decisionproblem_paperclips_automation
# Universal Paperclips Automation
**Automatisation avancée des clics et stratégies pour le jeu Universal Paperclips**

---
## 📌 Description
Ce projet automatise les actions répétitives dans le jeu [Universal Paperclips](http://www.decisionproblem.com/paperclips/) :
- Clic automatique pour fabriquer des trombones.
- Achat intelligent de clippers, mémoire, processeurs et projets.
- Ajustement dynamique des prix pour maximiser la demande.
- Gestion des ressources (mémoire, processeurs) et des projets stratégiques.
- Optimisation pour les phases avancées (quantum computing, tournois).

**Objectif** : Maximiser la production avec un minimum d’intervention manuelle, tout en gardant un code lisible, performant et documenté.

---

## 🔧 Fonctionnalités Principales
   Module               | Description                                                                 | Objet JavaScript          |
 |----------------------|-----------------------------------------------------------------------------|---------------------------|
 | Clic automatique     | Fabrique des trombones jusqu’à débloquer les autoclippers.                  | `paperclipAutomator`      |
 | Achat de clippers    | Achte le clipper le moins cher disponible selon les fonds.                 | `clipperBuyer`            |
 | Gestion des prix     | Ajuste le prix pour maintenir une demande à 100%.                           | `priceManager`            |
 | Achat de projets     | Achète tous les projets disponibles (sauf exclusions).                       | `projectBuyer`            |
 | Ressources           | Équilibre mémoire (cible : 70) et processeurs.                             | `resourceBuyer`           |
 | Quantum Computing    | Automatise les opérations quantiques une fois débloquées.                   | `quantumComputer`         |
 | Tournois             | Gère les inscriptions et les stratégies de tournoi.                        | `tournamentHandler`       |

**Exclusions par défaut** :
- Projets : *"Release the HypnoDrones"*, *"Space Exploration"* (configurable dans `EXCLUDED_PROJECTS`).

---

## 🛠 Installation & Exécution
1. **Prérequis** :
   - Navigateur moderne (Chrome, Firefox).
   - Accès au jeu [Universal Paperclips](http://www.decisionproblem.com/paperclips/).

2. **Utilisation** :
   - Ouvrir la console du navigateur (`F12` > onglet "Console").
   - Coller le code de [`paperclipAutomator.js`](lien_vers_le_fichier).
   - Lancer avec :
     ```javascript
     paperclipAutomator.start();
     ```
   - **Arrêter** :
     ```javascript
     paperclipAutomator.stop();
     ```

3. **Personnalisation** :
   - Modifier `EXCLUDED_PROJECTS` pour ajuster les exclusions.
   - Ajuster les intervalles (`setInterval`) pour optimiser les performances.

---

## 🔍 Optimisations & Refactorisations
### 1. **Performance**
- **Réduction des intervalles** :
  - Passer de `100ms` à `200ms` pour le clic automatique (moins gourmand en CPU).
  - Regrouper les vérifications de ressources/projets en un seul intervalle (ex: toutes les `1s` au lieu de `3s` + `2s`).
- **Cache des sélecteurs DOM** :
  - Stocker les éléments fréquemment utilisés (ex: `btnMakePaperclip`) dans des variables pour éviter les `document.getElementById` répétitifs.
  ```javascript
  // Exemple :
  const elements = {
      makePaperclip: document.getElementById('btnMakePaperclip'),
      autoClipper: document.getElementById('btnMakeClipper'),
      // ...
  };