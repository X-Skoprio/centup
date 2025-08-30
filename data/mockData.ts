import type { Fund, Transaction, Achievement } from "../types"

export const funds: Fund[] = [
  {
    id: "A",
    name: "Fonds A - Croissance",
    amount: 2450.8,
    performance: 8.5,
    color: "#4C9282",
    description:
      "Fonds diversifié axé sur la croissance à long terme avec une exposition aux marchés développés et émergents.",
    keyData: {
      risk: "Modéré",
      minInvestment: "50€",
      fees: "0.75%",
      category: "Actions",
    },
  },
  {
    id: "B",
    name: "Fonds B - Équilibré",
    amount: 1890.25,
    performance: 12.3,
    color: "#78BEAF",
    description: "Portefeuille équilibré combinant actions et obligations pour un profil de risque modéré.",
    keyData: {
      risk: "Faible à Modéré",
      minInvestment: "25€",
      fees: "0.65%",
      category: "Mixte",
    },
  },
  {
    id: "C",
    name: "Fonds C - Prudent",
    amount: 3200.15,
    performance: -2.1,
    color: "#6B7280",
    description:
      "Fonds prudent privilégiant la préservation du capital avec une exposition majoritaire aux obligations.",
    keyData: {
      risk: "Faible",
      minInvestment: "10€",
      fees: "0.45%",
      category: "Obligations",
    },
  },
]

export const allTransactions: Transaction[] = [
  // Janvier 2024
  { id: "1", type: "deposit", amount: 500, fund: "Fonds A - Growth", date: "2024-01-20", description: "Dépôt initial" },
  { id: "2", type: "auto-round", amount: 12.5, fund: "Fonds B - Balanced", date: "2024-01-20", description: "Arrondi Starbucks" },
  { id: "3", type: "recurring", amount: 150, fund: "Fonds A - Growth", date: "2024-01-19", description: "Virement mensuel" },
  { id: "4", type: "deposit", amount: 300, fund: "Fonds C - Prudent", date: "2024-01-18", description: "Bonus de janvier" },
  { id: "5", type: "auto-round", amount: 8.25, fund: "Fonds A - Growth", date: "2024-01-17", description: "Arrondi Uber Eats" },
  { id: "6", type: "withdrawal", amount: -100, fund: "Fonds B - Balanced", date: "2024-01-16", description: "Retrait d'urgence" },
  { id: "7", type: "deposit", amount: 200, fund: "Fonds B - Balanced", date: "2024-01-15", description: "Dépôt hebdomadaire" },
  { id: "8", type: "auto-round", amount: 15.75, fund: "Fonds C - Prudent", date: "2024-01-14", description: "Arrondi supermarché" },
  { id: "9", type: "recurring", amount: 75, fund: "Fonds C - Prudent", date: "2024-01-13", description: "Épargne automatique" },
  { id: "10", type: "deposit", amount: 450, fund: "Fonds A - Growth", date: "2024-01-12", description: "Prime performance" },
  { id: "11", type: "auto-round", amount: 6.50, fund: "Fonds B - Balanced", date: "2024-01-11", description: "Arrondi pharmacie" },
  { id: "12", type: "deposit", amount: 180, fund: "Fonds C - Prudent", date: "2024-01-10", description: "Dépôt weekend" },
  { id: "13", type: "withdrawal", amount: -250, fund: "Fonds A - Growth", date: "2024-01-09", description: "Achat équipement" },
  { id: "14", type: "auto-round", amount: 22.30, fund: "Fonds A - Growth", date: "2024-01-08", description: "Arrondi restaurant" },
  { id: "15", type: "recurring", amount: 120, fund: "Fonds B - Balanced", date: "2024-01-07", description: "Virement bi-mensuel" },
  
  // Décembre 2023
  { id: "16", type: "deposit", amount: 600, fund: "Fonds A - Growth", date: "2023-12-30", description: "Prime de fin d'année" },
  { id: "17", type: "auto-round", amount: 18.90, fund: "Fonds C - Prudent", date: "2023-12-29", description: "Arrondi shopping" },
  { id: "18", type: "deposit", amount: 350, fund: "Fonds B - Balanced", date: "2023-12-28", description: "Cadeau famille" },
  { id: "19", type: "withdrawal", amount: -180, fund: "Fonds C - Prudent", date: "2023-12-27", description: "Cadeaux Noël" },
  { id: "20", type: "auto-round", amount: 11.45, fund: "Fonds A - Growth", date: "2023-12-26", description: "Arrondi essence" },
  { id: "21", type: "recurring", amount: 150, fund: "Fonds A - Growth", date: "2023-12-25", description: "Virement mensuel" },
  { id: "22", type: "deposit", amount: 275, fund: "Fonds B - Balanced", date: "2023-12-24", description: "Économies décembre" },
  { id: "23", type: "auto-round", amount: 9.75, fund: "Fonds B - Balanced", date: "2023-12-23", description: "Arrondi boulangerie" },
  { id: "24", type: "deposit", amount: 400, fund: "Fonds C - Prudent", date: "2023-12-22", description: "Dépôt de sécurité" },
  { id: "25", type: "withdrawal", amount: -75, fund: "Fonds A - Growth", date: "2023-12-21", description: "Frais exceptionnels" },
  
  // Novembre 2023
  { id: "26", type: "auto-round", amount: 14.20, fund: "Fonds C - Prudent", date: "2023-11-30", description: "Arrondi cinéma" },
  { id: "27", type: "deposit", amount: 320, fund: "Fonds A - Growth", date: "2023-11-29", description: "Freelance payment" },
  { id: "28", type: "recurring", amount: 100, fund: "Fonds B - Balanced", date: "2023-11-28", description: "Épargne mensuelle" },
  { id: "29", type: "auto-round", amount: 7.85, fund: "Fonds A - Growth", date: "2023-11-27", description: "Arrondi transport" },
  { id: "30", type: "deposit", amount: 225, fund: "Fonds C - Prudent", date: "2023-11-26", description: "Remboursement" },
  { id: "31", type: "withdrawal", amount: -150, fund: "Fonds B - Balanced", date: "2023-11-25", description: "Voyage weekend" },
  { id: "32", type: "auto-round", amount: 13.60, fund: "Fonds B - Balanced", date: "2023-11-24", description: "Arrondi librairie" },
  { id: "33", type: "deposit", amount: 380, fund: "Fonds A - Growth", date: "2023-11-23", description: "Vente objets" },
  { id: "34", type: "recurring", amount: 90, fund: "Fonds C - Prudent", date: "2023-11-22", description: "Virement automatique" },
  { id: "35", type: "auto-round", amount: 5.35, fund: "Fonds A - Growth", date: "2023-11-21", description: "Arrondi café" },
  
  // Octobre 2023
  { id: "36", type: "deposit", amount: 550, fund: "Fonds B - Balanced", date: "2023-10-31", description: "Salaire supplémentaire" },
  { id: "37", type: "withdrawal", amount: -200, fund: "Fonds A - Growth", date: "2023-10-30", description: "Réparation voiture" },
  { id: "38", type: "auto-round", amount: 16.40, fund: "Fonds C - Prudent", date: "2023-10-29", description: "Arrondi shopping" },
  { id: "39", type: "recurring", amount: 150, fund: "Fonds A - Growth", date: "2023-10-28", description: "Virement mensuel" },
  { id: "40", type: "deposit", amount: 290, fund: "Fonds B - Balanced", date: "2023-10-27", description: "Cash back carte" },
  { id: "41", type: "auto-round", amount: 8.90, fund: "Fonds A - Growth", date: "2023-10-26", description: "Arrondi gym" },
  { id: "42", type: "deposit", amount: 170, fund: "Fonds C - Prudent", date: "2023-10-25", description: "Économies octobre" },
  { id: "43", type: "withdrawal", amount: -80, fund: "Fonds B - Balanced", date: "2023-10-24", description: "Sortie amis" },
  { id: "44", type: "auto-round", amount: 12.15, fund: "Fonds B - Balanced", date: "2023-10-23", description: "Arrondi streaming" },
  { id: "45", type: "deposit", amount: 420, fund: "Fonds A - Growth", date: "2023-10-22", description: "Projet terminé" },
  
  // Plus anciennes transactions (septembre-août 2023)
  { id: "46", type: "recurring", amount: 130, fund: "Fonds C - Prudent", date: "2023-09-30", description: "Fin de mois" },
  { id: "47", type: "deposit", amount: 350, fund: "Fonds A - Growth", date: "2023-09-25", description: "Rentrée scolaire" },
  { id: "48", type: "withdrawal", amount: -120, fund: "Fonds B - Balanced", date: "2023-09-20", description: "Fournitures bureau" },
  { id: "49", type: "auto-round", amount: 19.80, fund: "Fonds C - Prudent", date: "2023-09-15", description: "Arrondi vacances" },
  { id: "50", type: "deposit", amount: 500, fund: "Fonds A - Growth", date: "2023-09-10", description: "Retour vacances" },
  { id: "51", type: "recurring", amount: 150, fund: "Fonds A - Growth", date: "2023-08-31", description: "Virement mensuel" },
  { id: "52", type: "deposit", amount: 275, fund: "Fonds B - Balanced", date: "2023-08-28", description: "Prime été" },
  { id: "53", type: "withdrawal", amount: -300, fund: "Fonds C - Prudent", date: "2023-08-25", description: "Vacances été" },
  { id: "54", type: "auto-round", amount: 24.50, fund: "Fonds A - Growth", date: "2023-08-22", description: "Arrondi hôtel" },
  { id: "55", type: "deposit", amount: 180, fund: "Fonds B - Balanced", date: "2023-08-20", description: "Remboursement ami" },
]

// Données de détail des contributions par fonds
export const fundContributionDetails = {
  A: {
    totalContributed: 2260.00, // Total investi dans ce fonds
    manualDeposits: {
      amount: 1650.00,
      percentage: 73.0,
      gains: {
        amount: 120.45,
        percentage: 7.3
      }
    },
    autoRounds: {
      amount: 285.50,
      percentage: 12.6,
      gains: {
        amount: 20.85,
        percentage: 7.3
      }
    },
    recurringTransfers: {
      amount: 324.50,
      percentage: 14.4,
      gains: {
        amount: 23.70,
        percentage: 7.3
      }
    },
    totalGains: {
      amount: 165.00,
      percentage: 7.3
    }
  },
  B: {
    totalContributed: 1685.00,
    manualDeposits: {
      amount: 1125.00,
      percentage: 66.8,
      gains: {
        amount: 138.38,
        percentage: 12.3
      }
    },
    autoRounds: {
      amount: 225.75,
      percentage: 13.4,
      gains: {
        amount: 27.77,
        percentage: 12.3
      }
    },
    recurringTransfers: {
      amount: 334.25,
      percentage: 19.8,
      gains: {
        amount: 41.12,
        percentage: 12.3
      }
    },
    totalGains: {
      amount: 207.27,
      percentage: 12.3
    }
  },
  C: {
    totalContributed: 3268.00,
    manualDeposits: {
      amount: 2285.60,
      percentage: 69.9,
      gains: {
        amount: -47.99,
        percentage: -2.1
      }
    },
    autoRounds: {
      amount: 425.20,
      percentage: 13.0,
      gains: {
        amount: -8.93,
        percentage: -2.1
      }
    },
    recurringTransfers: {
      amount: 557.20,
      percentage: 17.1,
      gains: {
        amount: -11.70,
        percentage: -2.1
      }
    },
    totalGains: {
      amount: -68.62,
      percentage: -2.1
    }
  }
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Premier dépôt",
    description: "Effectuer votre premier dépôt",
    reward: 5,
    completed: true,
    progress: 1,
    maxProgress: 1,
  },
  {
    id: "2",
    title: "Investisseur régulier",
    description: "Effectuer 10 dépôts",
    reward: 15,
    completed: false,
    progress: 6,
    maxProgress: 10,
  },
  {
    id: "3",
    title: "Diversification",
    description: "Investir dans les 3 fonds",
    reward: 20,
    completed: true,
    progress: 3,
    maxProgress: 3,
  },
  {
    id: "4",
    title: "Économiseur",
    description: "Atteindre 1000€ d'investissement",
    reward: 25,
    completed: true,
    progress: 1000,
    maxProgress: 1000,
  },
  {
    id: "5",
    title: "Marathonien",
    description: "Investir pendant 30 jours consécutifs",
    reward: 50,
    completed: false,
    progress: 18,
    maxProgress: 30,
  },
  {
    id: "6",
    title: "Expert",
    description: "Atteindre 10000€ d'investissement",
    reward: 100,
    completed: false,
    progress: 7540,
    maxProgress: 10000,
  },
]

// Données de performance par timeframe et par fonds
export const performanceDataByTimeframe = {
  "7d": {
    A: [
      { name: "Lun", value: 2400, date: "2024-01-15", fullDate: "15 janvier 2024" },
      { name: "Mar", value: 2420, date: "2024-01-16", fullDate: "16 janvier 2024" },
      { name: "Mer", value: 2380, date: "2024-01-17", fullDate: "17 janvier 2024" },
      { name: "Jeu", value: 2450, date: "2024-01-18", fullDate: "18 janvier 2024" },
      { name: "Ven", value: 2430, date: "2024-01-19", fullDate: "19 janvier 2024" },
      { name: "Sam", value: 2460, date: "2024-01-20", fullDate: "20 janvier 2024" },
      { name: "Dim", value: 2450, date: "2024-01-21", fullDate: "21 janvier 2024" },
    ],
    B: [
      { name: "Lun", value: 1850, date: "2024-01-15", fullDate: "15 janvier 2024" },
      { name: "Mar", value: 1870, date: "2024-01-16", fullDate: "16 janvier 2024" },
      { name: "Mer", value: 1860, date: "2024-01-17", fullDate: "17 janvier 2024" },
      { name: "Jeu", value: 1880, date: "2024-01-18", fullDate: "18 janvier 2024" },
      { name: "Ven", value: 1885, date: "2024-01-19", fullDate: "19 janvier 2024" },
      { name: "Sam", value: 1890, date: "2024-01-20", fullDate: "20 janvier 2024" },
      { name: "Dim", value: 1890, date: "2024-01-21", fullDate: "21 janvier 2024" },
    ],
    C: [
      { name: "Lun", value: 3250, date: "2024-01-15", fullDate: "15 janvier 2024" },
      { name: "Mar", value: 3230, date: "2024-01-16", fullDate: "16 janvier 2024" },
      { name: "Mer", value: 3210, date: "2024-01-17", fullDate: "17 janvier 2024" },
      { name: "Jeu", value: 3200, date: "2024-01-18", fullDate: "18 janvier 2024" },
      { name: "Ven", value: 3195, date: "2024-01-19", fullDate: "19 janvier 2024" },
      { name: "Sam", value: 3200, date: "2024-01-20", fullDate: "20 janvier 2024" },
      { name: "Dim", value: 3200, date: "2024-01-21", fullDate: "21 janvier 2024" },
    ],
  },
  "1m": {
    A: [
      { name: "S1", value: 2200, date: "2024-01-01", fullDate: "1ère semaine janvier" },
      { name: "S2", value: 2280, date: "2024-01-08", fullDate: "2ème semaine janvier" },
      { name: "S3", value: 2350, date: "2024-01-15", fullDate: "3ème semaine janvier" },
      { name: "S4", value: 2450, date: "2024-01-22", fullDate: "4ème semaine janvier" },
    ],
    B: [
      { name: "S1", value: 1750, date: "2024-01-01", fullDate: "1ère semaine janvier" },
      { name: "S2", value: 1820, date: "2024-01-08", fullDate: "2ème semaine janvier" },
      { name: "S3", value: 1860, date: "2024-01-15", fullDate: "3ème semaine janvier" },
      { name: "S4", value: 1890, date: "2024-01-22", fullDate: "4ème semaine janvier" },
    ],
    C: [
      { name: "S1", value: 3300, date: "2024-01-01", fullDate: "1ère semaine janvier" },
      { name: "S2", value: 3250, date: "2024-01-08", fullDate: "2ème semaine janvier" },
      { name: "S3", value: 3220, date: "2024-01-15", fullDate: "3ème semaine janvier" },
      { name: "S4", value: 3200, date: "2024-01-22", fullDate: "4ème semaine janvier" },
    ],
  },
  "3m": {
    A: [
      { name: "Nov", value: 1800, date: "2023-11-01", fullDate: "Novembre 2023" },
      { name: "Déc", value: 2100, date: "2023-12-01", fullDate: "Décembre 2023" },
      { name: "Jan", value: 2450, date: "2024-01-01", fullDate: "Janvier 2024" },
    ],
    B: [
      { name: "Nov", value: 1600, date: "2023-11-01", fullDate: "Novembre 2023" },
      { name: "Déc", value: 1750, date: "2023-12-01", fullDate: "Décembre 2023" },
      { name: "Jan", value: 1890, date: "2024-01-01", fullDate: "Janvier 2024" },
    ],
    C: [
      { name: "Nov", value: 3400, date: "2023-11-01", fullDate: "Novembre 2023" },
      { name: "Déc", value: 3300, date: "2023-12-01", fullDate: "Décembre 2023" },
      { name: "Jan", value: 3200, date: "2024-01-01", fullDate: "Janvier 2024" },
    ],
  },
  "1y": {
    A: [
      { name: "T1", value: 1000, date: "2023-01-01", fullDate: "T1 2023" },
      { name: "T2", value: 1400, date: "2023-04-01", fullDate: "T2 2023" },
      { name: "T3", value: 1800, date: "2023-07-01", fullDate: "T3 2023" },
      { name: "T4", value: 2450, date: "2023-10-01", fullDate: "T4 2023" },
    ],
    B: [
      { name: "T1", value: 1200, date: "2023-01-01", fullDate: "T1 2023" },
      { name: "T2", value: 1450, date: "2023-04-01", fullDate: "T2 2023" },
      { name: "T3", value: 1650, date: "2023-07-01", fullDate: "T3 2023" },
      { name: "T4", value: 1890, date: "2023-10-01", fullDate: "T4 2023" },
    ],
    C: [
      { name: "T1", value: 3500, date: "2023-01-01", fullDate: "T1 2023" },
      { name: "T2", value: 3400, date: "2023-04-01", fullDate: "T2 2023" },
      { name: "T3", value: 3300, date: "2023-07-01", fullDate: "T3 2023" },
      { name: "T4", value: 3200, date: "2023-10-01", fullDate: "T4 2023" },
    ],
  },
  "all": {
    A: [
      { name: "2020", value: 500, date: "2020-01-01", fullDate: "2020" },
      { name: "2021", value: 800, date: "2021-01-01", fullDate: "2021" },
      { name: "2022", value: 1200, date: "2022-01-01", fullDate: "2022" },
      { name: "2023", value: 1800, date: "2023-01-01", fullDate: "2023" },
      { name: "2024", value: 2450, date: "2024-01-01", fullDate: "2024" },
    ],
    B: [
      { name: "2020", value: 600, date: "2020-01-01", fullDate: "2020" },
      { name: "2021", value: 900, date: "2021-01-01", fullDate: "2021" },
      { name: "2022", value: 1300, date: "2022-01-01", fullDate: "2022" },
      { name: "2023", value: 1650, date: "2023-01-01", fullDate: "2023" },
      { name: "2024", value: 1890, date: "2024-01-01", fullDate: "2024" },
    ],
    C: [
      { name: "2020", value: 3800, date: "2020-01-01", fullDate: "2020" },
      { name: "2021", value: 3700, date: "2021-01-01", fullDate: "2021" },
      { name: "2022", value: 3600, date: "2022-01-01", fullDate: "2022" },
      { name: "2023", value: 3400, date: "2023-01-01", fullDate: "2023" },
      { name: "2024", value: 3200, date: "2024-01-01", fullDate: "2024" },
    ],
  },
}

// Données de performance pour la page d'accueil avec plus de variations
export const performanceData = [
  { name: "J1", value: 7200, date: "2024-01-01", fullDate: "1 janvier 2024" },
  { name: "J2", value: 7180, date: "2024-01-02", fullDate: "2 janvier 2024" },
  { name: "J3", value: 7220, date: "2024-01-03", fullDate: "3 janvier 2024" },
  { name: "J4", value: 7150, date: "2024-01-04", fullDate: "4 janvier 2024" },
  { name: "J5", value: 7190, date: "2024-01-05", fullDate: "5 janvier 2024" },
  { name: "J6", value: 7250, date: "2024-01-06", fullDate: "6 janvier 2024" },
  { name: "J7", value: 7280, date: "2024-01-07", fullDate: "7 janvier 2024" },
  { name: "J8", value: 7320, date: "2024-01-08", fullDate: "8 janvier 2024" },
  { name: "J9", value: 7300, date: "2024-01-09", fullDate: "9 janvier 2024" },
  { name: "J10", value: 7350, date: "2024-01-10", fullDate: "10 janvier 2024" },
  { name: "J11", value: 7380, date: "2024-01-11", fullDate: "11 janvier 2024" },
  { name: "J12", value: 7420, date: "2024-01-12", fullDate: "12 janvier 2024" },
  { name: "J13", value: 7400, date: "2024-01-13", fullDate: "13 janvier 2024" },
  { name: "J14", value: 7450, date: "2024-01-14", fullDate: "14 janvier 2024" },
  { name: "J15", value: 7480, date: "2024-01-15", fullDate: "15 janvier 2024" },
  { name: "J16", value: 7460, date: "2024-01-16", fullDate: "16 janvier 2024" },
  { name: "J17", value: 7500, date: "2024-01-17", fullDate: "17 janvier 2024" },
  { name: "J18", value: 7520, date: "2024-01-18", fullDate: "18 janvier 2024" },
  { name: "J19", value: 7510, date: "2024-01-19", fullDate: "19 janvier 2024" },
  { name: "J20", value: 7540, date: "2024-01-20", fullDate: "20 janvier 2024" },
  { name: "J21", value: 7560, date: "2024-01-21", fullDate: "21 janvier 2024" },
  { name: "J22", value: 7580, date: "2024-01-22", fullDate: "22 janvier 2024" },
  { name: "J23", value: 7550, date: "2024-01-23", fullDate: "23 janvier 2024" },
  { name: "J24", value: 7590, date: "2024-01-24", fullDate: "24 janvier 2024" },
  { name: "J25", value: 7610, date: "2024-01-25", fullDate: "25 janvier 2024" },
  { name: "J26", value: 7630, date: "2024-01-26", fullDate: "26 janvier 2024" },
  { name: "J27", value: 7620, date: "2024-01-27", fullDate: "27 janvier 2024" },
  { name: "J28", value: 7650, date: "2024-01-28", fullDate: "28 janvier 2024" },
  { name: "J29", value: 7670, date: "2024-01-29", fullDate: "29 janvier 2024" },
  { name: "J30", value: 7690, date: "2024-01-30", fullDate: "30 janvier 2024" },
]
