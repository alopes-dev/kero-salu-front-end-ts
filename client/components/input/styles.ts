import styled from 'styled-components'

interface ILabel {
  icon?: React.ReactNode | React.Component
}

export const Label = styled.label<ILabel>`
  display: flex;
  position: relative;
  margin-bottom: 2rem;
  > input {
    background-color: #19181f;
    border: 2px solid #25242c;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    padding-left: ${props => (props.icon ? '40px' : '16px')};
    color: #fff;
    font-size: 16px;
    transition: 180ms ease-in-out;
    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }
    ~ span {
      position: absolute;
      right: 12px;
      top: 9px;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;
      border-radius: 2px;
      ~ svg {
        fill: rgba(255, 255, 255, 0.2);
        transition: 180ms ease-in-out;
        color: ${props => props.theme.colors.text};
        position: absolute !important;
        cursor: pointer;
      }
    }

    &:focus {
      border: 2px solid ${props => props.color};
      ~ svg {
        fill: ${props => props.color};
      }
    }
  }
`
