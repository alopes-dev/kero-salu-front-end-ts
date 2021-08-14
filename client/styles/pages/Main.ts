import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  /* display: flex;
  align-items: center;
  flex-direction: column; */

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 50px;
  }
  svg {
    font-size: 140px;
    color: ${props => props.theme.colors.text};
    display: flex;
  }

  a {
    display: flex;
    align-items: baseline;
    justify-content: baseline;
    position: absolute;
    left: 50%;
    color: ${props => props.theme.colors.primary};
    transform: translateX(-50%);
    svg {
      color: ${props => props.theme.colors.primary};
      font-size: 14px;
      margin-right: 20px;
    }
  }

  p {
    margin-top: 24px;
    font-size: 23px;
    line-height: 32px;
    width: 65%;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0 25px;

    h1 {
      font-size: 30px;
      text-align: center;
    }
    h3 {
      font-size: 26px;
    }

    p {
      width: 95%;
    }
    a {
      width: 80%;
      font-size: 15px;
    }
  }
`
