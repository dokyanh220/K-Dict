function Icon({ children, className = "h-4 w-4", ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function AlertCircle(props) {
  return <Icon {...props}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></Icon>
}

export function Apple(props) {
  return <Icon fill="currentColor" stroke="none" {...props}><path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.5-1.3 0-1.8-.8-3.3-.8s-2 .8-3.3.8c-1.3.1-2.3-1.3-3.1-2.5-1.7-2.5-3-7.1-1.3-10.1.9-1.5 2.4-2.5 4.1-2.5 1.3 0 2.5.9 3.3.9s2.3-1.1 3.8-.9c.7 0 2.5.3 3.6 2-.1.1-2.2 1.3-2.1 3.8 0 3 2.6 4 2.7 4-.1.1-.5 1.5-1.4 2.8zM16 4.2c.7-.8 1.1-1.9 1-3.1-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 3 1.1.1 2.2-.6 2.9-1.4z" /></Icon>
}

export function BookOpen(props) {
  return <Icon {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></Icon>
}

export function Check(props) {
  return <Icon {...props}><path d="M20 6 9 17l-5-5" /></Icon>
}

export function ChevronRight(props) {
  return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
}

export function Languages(props) {
  return <Icon {...props}><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></Icon>
}

export function Loader2(props) {
  return <Icon {...props}><path d="M21 12a9 9 0 1 1-6.2-8.6" /></Icon>
}

export function LogIn(props) {
  return <Icon {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></Icon>
}

export function Mail(props) {
  return <Icon {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>
}

export function PanelLeftClose(props) {
  return <Icon {...props}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" /></Icon>
}

export function Save(props) {
  return <Icon {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8" /><path d="M7 3v5h8" /></Icon>
}

export function Search(props) {
  return <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
}

// Moon icon for theme toggle
export function Moon(props) {
  return (
    <Icon {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </Icon>
  )
}

// Sun icon for theme toggle
export function Sun(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </Icon>
  )
}


export function Trash2(props) {
  return <Icon {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></Icon>
}

export function Wand2(props) {
  return <Icon {...props}><path d="m21.6 11.6-9.2 9.2a2 2 0 0 1-2.8 0l-1.4-1.4a2 2 0 0 1 0-2.8l9.2-9.2" /><path d="m14.5 4.5 5 5" /><path d="M5 2v4" /><path d="M3 4h4" /><path d="M7 8v4" /><path d="M5 10h4" /></Icon>
}

export function X(props) {
  return <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>
}

export function Volume2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />

      <path d="M15.5 8.5a5 5 0 0 1 0 7" />

      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  )
}

export function Dumbbell(props) {
  return (
    <Icon {...props}>
      <path d="M6.5 6.5 4 9M17.5 17.5l-2.5 2.5M8.5 14l-2 2M15.5 8l-2 2M8 10l6 6M10 8l6 6M3 13.5l1.5-1.5M19.5 9l1.5-1.5M12.5 3l-1.5 1.5M9.5 21l-1.5 1.5" />
    </Icon>
  )
}

export function User(props) {
  return (
    <Icon {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  )
}

export function Settings(props) {
  return (
    <Icon {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  )
}

export function HelpCircle(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
  )
}

export function Star(props) {
  return (
    <Icon {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
  )
}

export function Target(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Icon>
  )
}

export function Flame(props) {
  return (
    <Icon {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Icon>
  )
}

export function Code(props) {
  return (
    <Icon {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Icon>
  )
}

export function ArrowRight(props) {
  return (
    <Icon {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  )
}

export function AlertTriangle(props) {
  return (
    <Icon {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
  )
}

export function CreditCard(props) {
  return (
    <Icon {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </Icon>
  )
}