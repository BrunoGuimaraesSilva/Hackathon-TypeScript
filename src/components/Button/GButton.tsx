import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

export const GButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>
}
