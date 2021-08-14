import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  padding: 10px;
  > div.topbar {
    display: flex;
    align-items: center;
    display: row;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 24px;
    width: 100%;
    color: #fff;
    > h3 {
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
export const ContainerSkillItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  list-style: none;
  color: white;
  margin-top: 45px;
  padding: 6px;
`

export const SkillItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  background-color: white;
  border-radius: 4px;
  color: #333;
  font-weight: 400;
  text-align: center;
  min-height: 50px;
  position: relative;
  svg {
    position: absolute;
    right: 0;
    top: 0;
    color: #f53333;
    font-size: 18px;
    margin-top: 2px;
    margin-right: 2px;
  }
`
