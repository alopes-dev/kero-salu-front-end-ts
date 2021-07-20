import styled from 'styled-components'

interface IItem {
  active?: boolean
}

export const App = styled.div`
  display: flex;
  justify-content: space-between;
`
export const Content = styled.div`
  width: 80%;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  flex-direction: column;

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

export const Container = styled.div`
  display: flex;
`
export const Aside = styled.div`
  background-color: ${props => props.theme.colors.default};
  width: 20%;
  height: 100vh;
  border-radius: 3px;
  padding: 8px;
  box-shadow: 0px 0px 5px 0px #555;
  overflow: hidden;
  z-index: 1;
  position: fixed;
`
export const SideItems = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
`
export const Item = styled.h3<IItem>`
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  padding: 10px 15px;
  text-align: start;
  font-size: 17px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  display: flex;
  justify-content: start;
  cursor: pointer;
  margin: 5px 0;
  color: ${props => (props.active ? 'white' : '#333')};
  background-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.default};
  opacity: 1;
  :hover {
    background-color: ${props => props.theme.colors.primary};
    opacity: 0.9;
    color: #fff;
    transition: 0.5s;
    font-weight: 'bold';

    svg {
      color: #fff;
    }
  }

  svg {
    font-size: 24px;
    color: #333;
    display: flex;
    margin-right: 15px;
    color: ${props => (props.active ? '#fff' : props.theme.colors.text)};
    opacity: ${props => (props.active ? 1 : 0.7)};
  }
`
export const UserName = styled.h2`
  color: ${props => props.theme.colors.text};
  margin: auto 0px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
  font-size: 18px;
`

export const UserAvatar = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
  border: 4px solid ${props => props.theme.colors.primary};
  padding: 3px;
  img {
    border-radius: 50%;
  }
`

export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
`

export const AppBar = styled.div`
  background-color: ${props => props.theme.colors.default};
  width: 94rem;
  height: 6vh;
  padding: 8px;
  box-shadow: 0px 0px 2px 0px #555;
  position: fixed;
`
export const Childrens = styled.div`
  margin-top: 14vh;
  width: 93%;
`
