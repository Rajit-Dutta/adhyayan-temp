import { Check, X } from "lucide-react"

interface PasswordStrengthProps {
  password: string
  showRequirements?: boolean
}

export function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
  const requirements = [
    {
      label: "At least 8 characters",
      test: (pwd: string) => pwd.length >= 8,
    },
    {
      label: "Contains uppercase letter",
      test: (pwd: string) => /[A-Z]/.test(pwd),
    },
    {
      label: "Contains lowercase letter",
      test: (pwd: string) => /[a-z]/.test(pwd),
    },
    {
      label: "Contains number",
      test: (pwd: string) => /\d/.test(pwd),
    },
    {
      label: "Contains special character",
      test: (pwd: string) => /[@$!%*?&]/.test(pwd),
    },
  ]

  const passedRequirements = requirements.filter((req) => req.test(password)).length
  const strength = passedRequirements / requirements.length

  const getStrengthColor = () => {
    if (strength < 0.4) return "bg-destructive"
    if (strength < 0.7) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (strength < 0.4) return "Weak"
    if (strength < 0.7) return "Medium"
    return "Strong"
  }

  if (!password) return null

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold">Password Strength</span>
          <span
            className={`font-bold ${
              strength < 0.4 ? "text-destructive" : strength < 0.7 ? "text-yellow-600" : "text-green-600"
            }`}
          >
            {getStrengthText()}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full border-2 border-foreground overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strength * 100}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="space-y-1">
          {requirements.map((requirement, index) => {
            const passed = requirement.test(password)
            return (
              <div key={index} className="flex items-center gap-2 text-xs">
                {passed ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <X className="h-3 w-3 text-muted-foreground" />
                )}
                <span className={passed ? "text-green-600" : "text-muted-foreground"}>{requirement.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
