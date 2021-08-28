import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0a0c13;
  align-items: center;
  min-height: 100vh;
`

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100vw;
  > span {
    font-size: 20px;
  }
`
export const ContainerCrono = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0a0c13;
  align-items: center;
  min-height: 100vh;
  margin-top: 60px;
  > div.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 24px;
    width: 100%;
    color: #fff;
    > h4 {
      font-size: 24px;
    }
    > span > svg {
      font-size: 24px;
      color: white;
      :hover {
        color: rgb(58, 32, 131);
      }
    }
  }
`

export const ActionsTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  top: 0;
  background-color: #131520;
  z-index: 999;
  svg {
    height: 22px;
    width: 22px;
    padding: 2px;
    color: #fff;
    :hover {
      background-color: #cccccc;
      border-radius: 50%;
    }
  }
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 45vh;
  width: 100%;
  background-color: #131520;
  color: #fff;
  margin-top: 20px;
  > div.image-container {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    padding: 5px;
    background-color: rgb(58, 32, 131);
    > img {
      border-radius: 50%;
      background-size: cover;
    }
    svg {
      background-color: #333;
      border-radius: 50%;
      position: absolute;
      cursor: pointer;
      left: 93%;
      top: 70%;
      transform: translate(-50%, -50%);
      font-size: 19px;
      z-index: 99;
    }
  }
  > h1 {
    padding: 12px 0 5px 0px;
    font-weight: bold;
    font-size: 23px;
  }
  > small {
    font-weight: bold;
    color: #b6b2b2;
  }
`

export const ActionBottomContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  svg {
    color: #f59595;
  }
`

export const UserInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 20px;
  background-color: #131520;
  color: #fff;
  min-height: 30vh;
  width: 100%;
  position: relative;
`
export const Items = styled.div`
  display: flex;
  color: #362f41;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 5px;
  div.item-iconed {
    display: flex;
    align-items: center;
    > span {
      margin-left: 10px;
      font-size: 18px;
    }

    > div {
      border-radius: 4px;
      padding: 3px;
      background-color: #92b1cc;
      > svg {
        font-size: 24px;
        color: #fff;
      }
    }
  }
  > span {
    font-size: 20px;
  }

  div.experience {
    background-color: #548af0 !important;
  }
  div.skills {
    background-color: #f0923b !important;
  }
  div.competence {
    background-color: #86b8f1 !important;
  }
  div.hobbes {
    background-color: #f54c4c !important;
  }
  div.academic {
    background-color: #ccc341 !important;
  }
  div.curses {
    background-color: #72e990 !important;
  }
  div.documents {
    background-color: #117c77 !important;
  }
  div.languages {
    background-color: #3e194e !important;
  }
  div.contacts {
    background-color: #ff5722 !important;
  }
  div.settings {
    background-color: #607d8b !important;
  }
`

export const LanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0a0c13;
  width: 100%;
  margin-top: 45px;
`

export const LanguageItems = styled.div`
  display: flex;
  color: #362f41;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 10px 10px 5px 10px;
  div.item-iconed {
    display: flex;
    align-items: center;
    > span {
      margin-left: 10px;
      font-size: 18px;
    }

    > div {
      border-radius: 4px;
      padding: 3px;
      background-color: #92b1cc;
      > svg {
        font-size: 24px;
        color: #fff;
      }
    }
  }
  > span {
    font-size: 20px;
  }
`
