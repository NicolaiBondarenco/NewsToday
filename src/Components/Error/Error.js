import React from 'react'
import styled from 'styled-components'

export const Error = ({ message }) => {
  return <ErrorContainer>{message}</ErrorContainer>
}
const ErrorContainer = styled.p`
  text-align: center;
`
