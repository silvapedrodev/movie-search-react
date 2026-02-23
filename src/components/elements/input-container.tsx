type InputContainerProps = {
  children: React.ReactNode
  className?: string
}

export function InputContainer({ children, className }: InputContainerProps) {
  return (
    <div
      className={`
        flex items-center rounded-lg border px-3 py-2
        focus-within:border-purple-550
        focus-within:ring-2
        focus-within:ring-purple-550/40
        transition-all
        ${className || ''}
      `}
    >
      {children}
    </div>
  )
}