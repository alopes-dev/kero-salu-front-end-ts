import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 50px;
  }
  h3 {
    font-size: 30px;
    color: ${props => props.theme.colors.text};
    margin: 20px 0;
  }

  p {
    margin-top: 24px;
    font-size: 23px;
    line-height: 32px;
    width: 65%;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding:0 25px;

    h1 {
      font-size: 30px;
    }
    h3 {
      font-size: 26px;
    }

    p {
      width: 95%;
    }
  }
`
