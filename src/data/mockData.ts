export type Role =
  | 'Directeur'
  | 'Musicien(ne)'
  | 'Ingenieur Son'
  | 'Barman/Barmaid'
  | 'Serveur/Serveuse'
  | 'Hotesse/Hote'
  | 'Caissier/Caissiere'
  | 'Technicien Lumiere'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  role: Role
  avatar: string
  color: string
}

export interface Shift {
  id: string
  employeeId: string
  date: string // YYYY-MM-DD
  startTime: string // HH:mm
  endTime: string // HH:mm
  durationH: number
  label?: string // nom du concert / set
  note?: string
}

export interface LeaveBalance {
  label: string
  period: string
  balanceDays: number
}

export interface Notification {
  id: string
  message: string
  type: 'info' | 'warning' | 'success'
  date: string
}

// Couleur par role (bande gauche des cartes shift)
export const roleColors: Record<Role, string> = {
  'Directeur': '#1A1A2E',
  'Musicien(ne)': '#7C3AED',
  'Ingenieur Son': '#2563EB',
  'Barman/Barmaid': '#C9A227',
  'Serveur/Serveuse': '#16A34A',
  'Hotesse/Hote': '#DB2777',
  'Caissier/Caissiere': '#EA580C',
  'Technicien Lumiere': '#0891B2',
}

export const roleBgColors: Record<Role, string> = {
  'Directeur': 'bg-slate-100 text-slate-800',
  'Musicien(ne)': 'bg-purple-100 text-purple-800',
  'Ingenieur Son': 'bg-blue-100 text-blue-800',
  'Barman/Barmaid': 'bg-amber-100 text-amber-800',
  'Serveur/Serveuse': 'bg-green-100 text-green-800',
  'Hotesse/Hote': 'bg-pink-100 text-pink-800',
  'Caissier/Caissiere': 'bg-orange-100 text-orange-800',
  'Technicien Lumiere': 'bg-cyan-100 text-cyan-800',
}

export const employees: Employee[] = [
  {
    id: 'e1',
    firstName: 'Robin',
    lastName: 'Dumont',
    role: 'Directeur',
    avatar: '👤',
    color: '#1A1A2E',
  },
  {
    id: 'e2',
    firstName: 'Marie',
    lastName: 'Leblanc',
    role: 'Musicien(ne)',
    avatar: '🎹',
    color: '#7C3AED',
  },
  {
    id: 'e3',
    firstName: 'Thomas',
    lastName: 'Dupont',
    role: 'Musicien(ne)',
    avatar: '🎸',
    color: '#7C3AED',
  },
  {
    id: 'e4',
    firstName: 'Julien',
    lastName: 'Martel',
    role: 'Musicien(ne)',
    avatar: '🥁',
    color: '#7C3AED',
  },
  {
    id: 'e5',
    firstName: 'Sophie',
    lastName: 'Martin',
    role: 'Ingenieur Son',
    avatar: '🎧',
    color: '#2563EB',
  },
  {
    id: 'e6',
    firstName: 'Lucas',
    lastName: 'Bernard',
    role: 'Barman/Barmaid',
    avatar: '🍸',
    color: '#C9A227',
  },
  {
    id: 'e7',
    firstName: 'Camille',
    lastName: 'Rousseau',
    role: 'Serveur/Serveuse',
    avatar: '🍾',
    color: '#16A34A',
  },
  {
    id: 'e8',
    firstName: 'Antoine',
    lastName: 'Moreau',
    role: 'Hotesse/Hote',
    avatar: '🎩',
    color: '#DB2777',
  },
  {
    id: 'e9',
    firstName: 'Lea',
    lastName: 'Fontaine',
    role: 'Caissier/Caissiere',
    avatar: '💳',
    color: '#EA580C',
  },
  {
    id: 'e10',
    firstName: 'Hugo',
    lastName: 'Petit',
    role: 'Technicien Lumiere',
    avatar: '💡',
    color: '#0891B2',
  },
]

export const currentUser = employees[0] // Robin

// Semaine S10: 2 mars – 8 mars 2026
export const shifts: Shift[] = [
  // Lundi 2 mars
  { id: 's1', employeeId: 'e5', date: '2026-03-02', startTime: '17:00', endTime: '23:30', durationH: 6.5, label: 'Soiree Blues Session' },
  { id: 's2', employeeId: 'e6', date: '2026-03-02', startTime: '18:00', endTime: '23:30', durationH: 5.5 },
  { id: 's3', employeeId: 'e7', date: '2026-03-02', startTime: '19:00', endTime: '23:30', durationH: 4.5 },
  { id: 's4', employeeId: 'e8', date: '2026-03-02', startTime: '19:00', endTime: '23:00', durationH: 4 },

  // Mercredi 4 mars - Jam Session
  { id: 's5', employeeId: 'e5', date: '2026-03-04', startTime: '18:00', endTime: '01:00', durationH: 7, label: 'Jam Session Ouverte' },
  { id: 's6', employeeId: 'e10', date: '2026-03-04', startTime: '17:30', endTime: '01:00', durationH: 7.5, label: 'Jam Session Ouverte' },
  { id: 's7', employeeId: 'e2', date: '2026-03-04', startTime: '20:00', endTime: '00:00', durationH: 4, label: 'Jam Session Ouverte' },
  { id: 's8', employeeId: 'e3', date: '2026-03-04', startTime: '20:00', endTime: '00:00', durationH: 4, label: 'Jam Session Ouverte' },
  { id: 's9', employeeId: 'e4', date: '2026-03-04', startTime: '20:00', endTime: '00:00', durationH: 4, label: 'Jam Session Ouverte' },
  { id: 's10', employeeId: 'e6', date: '2026-03-04', startTime: '19:00', endTime: '01:00', durationH: 6 },
  { id: 's11', employeeId: 'e7', date: '2026-03-04', startTime: '19:00', endTime: '01:00', durationH: 6 },
  { id: 's12', employeeId: 'e9', date: '2026-03-04', startTime: '19:00', endTime: '01:00', durationH: 6 },
  { id: 's13', employeeId: 'e8', date: '2026-03-04', startTime: '19:30', endTime: '00:00', durationH: 4.5 },
  { id: 's14', employeeId: 'e1', date: '2026-03-04', startTime: '18:00', endTime: '01:00', durationH: 7, label: 'Jam Session Ouverte' },

  // Jeudi 5 mars
  { id: 's15', employeeId: 'e5', date: '2026-03-05', startTime: '18:00', endTime: '00:00', durationH: 6, label: 'Concert Trio Diaz' },
  { id: 's16', employeeId: 'e10', date: '2026-03-05', startTime: '17:00', endTime: '00:00', durationH: 7 },
  { id: 's17', employeeId: 'e6', date: '2026-03-05', startTime: '19:00', endTime: '00:30', durationH: 5.5 },
  { id: 's18', employeeId: 'e7', date: '2026-03-05', startTime: '19:00', endTime: '00:30', durationH: 5.5 },
  { id: 's19', employeeId: 'e8', date: '2026-03-05', startTime: '19:30', endTime: '23:30', durationH: 4 },
  { id: 's20', employeeId: 'e9', date: '2026-03-05', startTime: '19:00', endTime: '00:30', durationH: 5.5 },

  // Vendredi 6 mars - Concert special
  { id: 's21', employeeId: 'e1', date: '2026-03-06', startTime: '17:00', endTime: '02:00', durationH: 9, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's22', employeeId: 'e5', date: '2026-03-06', startTime: '16:00', endTime: '02:00', durationH: 10, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's23', employeeId: 'e10', date: '2026-03-06', startTime: '15:00', endTime: '02:00', durationH: 11, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's24', employeeId: 'e2', date: '2026-03-06', startTime: '20:00', endTime: '01:30', durationH: 5.5, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's25', employeeId: 'e3', date: '2026-03-06', startTime: '20:00', endTime: '01:30', durationH: 5.5, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's26', employeeId: 'e4', date: '2026-03-06', startTime: '20:00', endTime: '01:30', durationH: 5.5, label: 'Grande Nuit Jazz - Robin Quartet' },
  { id: 's27', employeeId: 'e6', date: '2026-03-06', startTime: '18:00', endTime: '02:00', durationH: 8 },
  { id: 's28', employeeId: 'e7', date: '2026-03-06', startTime: '18:30', endTime: '02:00', durationH: 7.5 },
  { id: 's29', employeeId: 'e8', date: '2026-03-06', startTime: '19:00', endTime: '01:00', durationH: 6 },
  { id: 's30', employeeId: 'e9', date: '2026-03-06', startTime: '19:00', endTime: '02:00', durationH: 7 },

  // Samedi 7 mars
  { id: 's31', employeeId: 'e5', date: '2026-03-07', startTime: '17:00', endTime: '02:00', durationH: 9, label: 'Soiree Manouche' },
  { id: 's32', employeeId: 'e10', date: '2026-03-07', startTime: '16:00', endTime: '02:00', durationH: 10 },
  { id: 's33', employeeId: 'e2', date: '2026-03-07', startTime: '20:30', endTime: '01:30', durationH: 5, label: 'Soiree Manouche' },
  { id: 's34', employeeId: 'e3', date: '2026-03-07', startTime: '20:30', endTime: '01:30', durationH: 5, label: 'Soiree Manouche' },
  { id: 's35', employeeId: 'e6', date: '2026-03-07', startTime: '18:00', endTime: '02:30', durationH: 8.5 },
  { id: 's36', employeeId: 'e7', date: '2026-03-07', startTime: '18:00', endTime: '02:30', durationH: 8.5 },
  { id: 's37', employeeId: 'e8', date: '2026-03-07', startTime: '19:00', endTime: '01:00', durationH: 6 },
  { id: 's38', employeeId: 'e9', date: '2026-03-07', startTime: '18:30', endTime: '02:30', durationH: 8 },
  { id: 's39', employeeId: 'e1', date: '2026-03-07', startTime: '17:00', endTime: '02:30', durationH: 9.5, label: 'Soiree Manouche' },
]

export const leaveBalances: LeaveBalance[] = [
  { label: 'Conges payes 2024 a 2025', period: '2024-2025', balanceDays: 13 },
  { label: 'Conges payes 2025 a 2026', period: '2025-2026', balanceDays: 8.5 },
]

export const notifications: Notification[] = [
  {
    id: 'n1',
    message: 'Demande de remplacement recue de Lucas Bernard pour le sam. 14 mars',
    type: 'info',
    date: '2026-03-05',
  },
  {
    id: 'n2',
    message: 'Votre conge du 20 mars a ete approuve par la direction',
    type: 'success',
    date: '2026-03-04',
  },
]

export const WEEK_DATES = [
  '2026-03-02', // Lun
  '2026-03-03', // Mar
  '2026-03-04', // Mer
  '2026-03-05', // Jeu
  '2026-03-06', // Ven
  '2026-03-07', // Sam
  '2026-03-08', // Dim
]

export const DAY_LABELS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
export const DAY_LABELS_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
export const MONTH_LABELS = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const day = DAY_LABELS_FULL[d.getDay() === 0 ? 6 : d.getDay() - 1]
  const month = MONTH_LABELS[d.getMonth()]
  return `${day} ${d.getDate()} ${month} ${d.getFullYear()}`
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  const day = DAY_LABELS_SHORT[d.getDay() === 0 ? 6 : d.getDay() - 1]
  return `${day}. ${d.getDate()} mars`
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id)
}

export function getShiftsForDate(date: string): Shift[] {
  return shifts.filter((s) => s.date === date)
}

export function getShiftsForEmployee(employeeId: string, date: string): Shift[] {
  return shifts.filter((s) => s.employeeId === employeeId && s.date === date)
}

export function getTotalHoursForWeek(employeeId: string): number {
  return shifts
    .filter((s) => s.employeeId === employeeId && WEEK_DATES.includes(s.date))
    .reduce((sum, s) => sum + s.durationH, 0)
}
