import styled from '@emotion/styled';
import { colors } from 'constants';
import { transition } from 'helpers';

export const Button = styled.button`
  border: none;
  flex-basis: 50%;
  border-radius: 3px;
  background-color: ${props => colors[props.color || 'color1']};
  padding: 6px 20px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  position: relative;
  z-index: 3;
  ${transition('transform', 'box-shadow', 'border-radius')};

  &.icon {
    display: block;
    flex-basis: 50px;
    width: 50px;
    height: 50px;
    padding: 0px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    font-size: 30px;

    &:hover {
      border-radius: 30px;
    }
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 20px 5px ${props => colors[props.color || 'color1']};
    border-radius: 10px;
  }
`;
