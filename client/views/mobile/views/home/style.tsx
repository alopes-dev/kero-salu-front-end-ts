import styled from 'styled-components'

// import { darken } from 'polished'

interface IItem {
  active?: boolean
  isFavorite?: boolean
}

export const VagasList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 12px;
  list-style: none;
`

export const Items = styled.li<IItem>`
  display: flex;
  background: ${props => (props.active ? ' #0d1146' : ' #fff')};
  border-radius: 15px;
  padding: 15px;
`

export const CompanyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background-color: white;
  img {
    align-self: center;
    width: 33px;
    height: 33px;
    border-radius: 4px;
  }
`
export const CompanyInfoContainer = styled.div`
  width: 80%;
  display: flex;
  padding-left: 12px;
  justify-content: space-between;
`
export const CompanyContent = styled.div<IItem>`
  display: flex;
  flex-direction: column;

  > h4 {
    font-size: 12px;
    line-height: 26px;
    font-weight: bold;
    color: ${props => (props.active ? ' #929191' : ' #a3a3a3')};
  }

  > span {
    font-size: 14px;
    font-weight: bold;
    color: ${props => (props.active ? ' #fff' : 'black')};
    margin: 5px 0 4px;
  }
  > small {
    color: ${props => (props.active ? ' #929191' : 'black')};
    font-weight: bold;
  }
`

export const ContentIcon = styled.div<IItem>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: end;
  > span {
    svg {
      color: ${props =>
        props.active || props.isFavorite ? ' #f59595' : '#a3a3a3'};
    }
  }

  > small {
    color: ${props => (props.active ? ' #ffffff' : '#a3a3a3')};
  }
`
export const HeaderButton = styled.button`
  background: #fac23c;
  color: #fff;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    justify-content: center;
    font-weight: bold;
    padding: 12px;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
  }

  > span {
    text-transform: uppercase;
    flex: 1;
    text-align: center;
    font-weight: bold;
  }

  svg {
    margin-right: 5px;
  }
`

export const IconFilter = styled.div`
  height: 25px;
  width: 25px;
  background-color: #eca92d;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: white;
    font-weight: bold;
  }
`
