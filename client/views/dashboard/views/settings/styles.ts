import styled from 'styled-components'

export const Content = styled.div`
  display: flex;

  /* align-items: center; */
`

export const MenuContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #dcdcdc;
`

export const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const MenuItem = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 20px;
  cursor: pointer;
  border-top: 1px solid #dcdcdc;
  display: flex;
  svg {
    font-size: 20px;
    color: #333;
    margin-right: 10px;
  }
`

export const UserAvatar = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 3px;
  img {
    border-radius: 50%;
  }
`

export const UserName = styled.h5`
  font-weight: 300;
  margin-bottom: 20px;
`
export const InfoText = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  margin-top: 15px;
  margin-left: 25px;
`
export const Hr = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin-top: 20px;
`
