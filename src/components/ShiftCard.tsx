import { roleColors, roleBgColors, getEmployeeById } from '../data/mockData'
import type { Shift } from '../data/mockData'

interface ShiftCardProps {
  shift: Shift
  showEmployee?: boolean
  showLabel?: boolean
}

export default function ShiftCard({ shift, showEmployee = true, showLabel = true }: ShiftCardProps) {
  const employee = getEmployeeById(shift.employeeId)
  if (!employee) return null

  const borderColor = roleColors[employee.role]
  const badgeClass = roleBgColors[employee.role]

  const durationLabel = Number.isInteger(shift.durationH)
    ? `${shift.durationH}h`
    : `${shift.durationH}h`.replace('.5', 'h30').replace('.', 'h')

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-3"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[15px] font-semibold text-slate-800">
                {shift.startTime} - {shift.endTime}
              </span>
              <span className="text-sm font-medium text-slate-500">{durationLabel}</span>
            </div>
            {showEmployee && (
              <p className="text-sm text-slate-600 font-medium">
                {employee.firstName} {employee.lastName}
              </p>
            )}
            <span className={`inline-block mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${badgeClass}`}>
              {employee.role}
            </span>
          </div>
          {showLabel && shift.label && (
            <div className="flex-shrink-0 max-w-[120px]">
              <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 font-medium leading-tight block text-right">
                {shift.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
