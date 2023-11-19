import { ReactNode, ButtonHTMLAttributes } from "react";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button className="btn" disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner className="spin" color="var(--primary-color)" size={16} />
      ) : (
        <a className="btnText">{children}</a>
      )}
    </button>
  );
}
