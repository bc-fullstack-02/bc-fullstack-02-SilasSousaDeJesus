import React from 'react'
import styles from './buttonGeneric.module.scss'

declare interface ButtonGenericProps extends React.HTMLAttributes<HTMLButtonElement>
{
  content?: string
  children?: any;
  onClick?: () => void
  appendIcon?: JSX.Element
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: any
}

const ButtonGeneric: React.FC<ButtonGenericProps> = (props) => {
  return <button
    className={props.className ? props.className : styles.GenericBtn}
    onClick={props.onClick}
    type={props.type}
  >
    { props.children || 'Nameless button' }
    { props.appendIcon }
  </button>
}

export default ButtonGeneric
