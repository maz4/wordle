function KeyboardKey({
  children,
  className,
  onClick,
}: KeyboardKeyProps): JSX.Element {
  return (
    <div onClick={onClick} className={`keyboard__key ${className}`.trim()}>
      {children}
    </div>
  );
}

export default KeyboardKey;
