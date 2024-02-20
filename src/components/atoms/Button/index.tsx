import cn from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      className={cn(
        "border border-[#bf5baa5c] w-24 px-1.5 py-1 rounded-full disabled:cursor-no-drop flex items-center justify-around",
        className
      )}
    >
      {children}
    </button>
  );
}
