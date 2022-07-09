function KeyboardKey({ children, className }: KeyboardKeyProps): JSX.Element {
  return <div className={`keyboard__key ${className}`.trim()}>{children}</div>;
}

export default KeyboardKey;
