import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input className="input" {...rest} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className="input" {...rest}></textarea>;
}
