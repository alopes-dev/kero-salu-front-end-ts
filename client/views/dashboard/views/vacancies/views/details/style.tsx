import styled from 'styled-components'

type StatusPorps = {
  active?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContainerAnality = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  list-style: none;
`

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  list-style: none;
  margin-bottom: 10px;
`

export const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 64px;
  background-color: white;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
  border-radius: 0.5rem;
  margin: 0.5rem;
  color: #333;

  svg {
    font-size: 34px;
  }
  svg.users {
    color: #5aaad8;
  }
  svg.thumbs {
    color: #3cad91;
  }
  svg.number {
    color: #ffc506;
  }
  svg.trash {
    color: #f04c4c;
  }
`
export const Text = styled.div`
  display: flex;
  flex-direction: column;
  > small {
    font-weight: 300;
    text-align: end;
  }
`

export const CandidatesContainer = styled.div`
  height: 274px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const Candidate = styled.div`
  background-color: rgba(54, 59, 76, 0.9) !important;
  margin: 8px 0;
  height: 55px;
  border-radius: 4px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  justify-content: space-between;
  > div.user-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:first-of-type {
    margin: 0px;
  }
`

export const ActionsButton = styled.div`
  background-color: rgba(54, 59, 76, 0.9) !important;
  height: 24px;
  right: 30px;
  width: 270px;
  border-radius: 4px;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
`
export const Button = styled.div`
  color: white;
  font-size: 12px;
  display: flex;
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
  &:nth-child(2) {
    :hover {
      color: #ffae6f;
      transition: 1.3 ease-in-out;
    }
    svg {
      color: #ffae6f;
      margin-right: 5px;
    }
  }

  svg {
    font-size: 15px;
    margin-right: 5px;
  }
  svg.accept {
    color: #20c997;
  }
  svg.reject {
    color: #dc3545;
  }
  &.file {
    :hover {
      color: #ffae6f;
      transition: 1.3 ease-in-out;
    }
    svg {
      color: #ffae6f;
      margin-right: 5px;
    }
  }
`

export const Name = styled.h5`
  font-size: 14px;
  font-weight: 600;
  color: #fff !important;
  margin: 3px 0 0 20px;
`

export const Avatar = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  background-color: #2e9fb3;
  justify-content: center;
  align-items: center;
  border: 2px solid white;

  > span {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }
  > img {
    border-radius: 50%;
  }
`
export const Status = styled.div<StatusPorps>`
  width: 45px;
  height: 45px;
  display: flex;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#20c997' : '#dc3545')};
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  position: absolute;
  right: 50px;
  top: 62px;
  cursor: pointer;
  > span {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  :hover {
    background-color: ${props => (props.active ? '#157256' : '#8f232e')};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`
