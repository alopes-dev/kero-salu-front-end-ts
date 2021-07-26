import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`
export const ActionsTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  top: 0;
  svg {
    background-color: #cccccc;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    padding: 2px;
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div.image-container {
    height: 100px;
    width: 100px;
    border-radius: 38%;
    margin-top: 30px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }
  }
  > h1 {
    padding: 12px 0 5px 0px;
    font-weight: bold;
    font-size: 23px;
  }
  > p {
    display: flex;
    flex-direction: row;
    font-weight: bold;
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

export const Card = styled.div`
  width: 90%;
  margin-top: 10px;
  background-color: white;
  padding: 15px;
  > h4 {
    font-size: 18px;
  }
  > ul {
    margin-left: 12px;
    li {
      margin-bottom: 4px;
      font-weight: 300;
    }
  }
  > p {
    margin: 8px 0;
    > small {
      margin-left: 6px;
      font-weight: 600;
    }
  }
`
