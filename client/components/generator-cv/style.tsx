import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  width: 100%;
`

export const Col = styled.div`
  width: 100%;
`

export const ColRight = styled.div`
  width: 70%;
`

export const ColLeft = styled.div`
  width: 30%;
`

export const CVContainer = styled.div`
  width: 75%;
`

export const JobsList = styled.div`
  width: 25%;
`

export const Header = styled.div`
  display: flex;
  margin-left: 20px;
`

export const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
`

export const Title = styled.h4`
  margin: 0;
  color: #575962;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.6;
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
  img {
    border-radius: 50%;
  }
`

export const SubTitle = styled.h5`
  font-size: 11px;
  color: #7d7b7b;
`

export const DetailsContent = styled.div`
  display: flex;
  margin-left: 20px;
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
`

export const ItemSingle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
`
export const Icon = styled.div`
  margin: 10px 0;
  svg {
    font-size: 20px;
    color: #333;
    display: flex;
  }
`
export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`

export const ItemTitle = styled.div`
  margin: 8px 10px 0 10px;
  color: #575962;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
`

export const ItemTitleSmall = styled.div`
  margin: 0px 10px 0 10px;
  color: #575962;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  small {
    font-size: 11px;
    font-weight: 400;
    color: #6c757d !important;
  }
`

export const ItemDescription = styled.div`
  font-size: 12px;
  color: #7d7b7b;
  margin: 6px 10px;
`
export const ItemValue = styled.div`
  font-size: 11px;
  color: #7d7b7b;
  margin: 5px 10px;
  display: flex;
  position: relative;
  width: 200px;
`
export const ItemValueAsEmail = styled.div`
  font-size: 12px;
  color: #6861ce;
  margin: 0px 10px;
`

export const Small = styled.div`
  font-size: 11px;
  color: #6861ce;
  position: absolute;
  right: -20px;
`

export const ActionsButton = styled.div`
  background-color: rgba(54, 59, 76, 0.9) !important;
  height: 24px;
  right: 30px;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  > span.Aprovado {
    color: #20c997;
  }

  > span.Rejeitado {
    color: #dc3545;
  }
`

export const Button = styled.div`
  color: white;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  svg {
    font-size: 15px;
    margin-right: 5px;
  }
  svg.accept,
  svg.file {
    color: #20c997;
  }
  svg.reject {
    color: #dc3545;
  }
  &:last-child {
    :hover {
      color: #dc3545;
      transition: 1.3 ease-in-out;
    }
  }
  &:first-child {
    :hover {
      color: #20c997;
      transition: 1.3 ease-in-out;
    }
  }
`

export const Scroller = styled.div`
  height: 600px;
  overflow-y: scroll;
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(128, 124, 124, 0.3);
    border-radius: 4px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(128, 124, 124, 0.3);
    background-color: #555;
  }
`

export const VacanciesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 80px; */
`

export const VacancieTitle = styled.h4`
  margin: 0;
  color: #575962;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
`
export const VacanciePrice = styled.h4`
  margin: 0;
  color: #575962;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.6;
  margin-top: 15px;
  > small {
    color: #a0a0a0;
  }
`
export const ListOfDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`
export const ListItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
`

export const ListItem = styled.h5`
  font-size: 13px;
  font-weight: 200;
  color: #525252;
`
