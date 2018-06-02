import styled from 'styled-components'

export default styled.li`
  padding: 20px 5px;
  margin: 0px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  list-style: none;
  background-color: ${props => props.playing ? '#7FbFb8' : '#fafafa'};
  cursor: pointer;
`
