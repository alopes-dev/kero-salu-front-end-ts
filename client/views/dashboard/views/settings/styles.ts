import styled from 'styled-components'

type MnuItemType = {
  active: boolean
}

export const Content = styled.div`
  display: flex;
  height: 500px;
  /* align-items: center; */
`

export const MenuContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #dcdcdc;
`

export const Menu = styled.div`
  width: 100%;
  display: flex;
  padding: 5%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const MenuItem = styled.div<MnuItemType>`
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  cursor: pointer;
  /* border-top: 1px solid #dcdcdc; */
  display: flex;
  align-items: center;
  color: ${props => (props.active ? ' white' : ' #333')};
  border-radius: 0.5rem;
  > svg {
    font-size: 20px;
    color: ${props => (props.active ? ' white' : ' #333')} !important;
    margin-right: 10px;
  }
`

export const UserAvatar = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 3px;
  > div.image-container {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 5px;
    > img {
      border-radius: 50%;
      background-size: cover;
    }
    svg {
      background-color: rgb(57 60 72);
      border-radius: 50%;
      color: white;
      position: absolute;
      cursor: pointer;
      left: 90%;
      top: 65%;
      transform: translate(-50%, -50%);
      font-size: 19px;
      z-index: 99;
    }
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
