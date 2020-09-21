import styled from 'styled-components/native';

interface Props {
  button?: string;
  total?: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Display = styled.View`
  height: 30%;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  background: #eee;
`;

export const DisplayTextHistory = styled.Text<Props>`
  font-size: ${(props) => (props.total !== '' ? '16px' : '24px')};
  color: ${(props) => (props.total !== '' ? '#c198ff' : '#9146ff')};
`;

export const DisplayTextResult = styled.Text<Props>`
  font-size: ${(props) => (props.total !== '' ? '24px' : '16px')};
  color: ${(props) => (props.total !== '' ? '#9146ff' : '#c198ff')};
`;

export const Calculator = styled.View`
  height: 70%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const CalculatorButton = styled.TouchableOpacity<Props>`
  height: 20%;
  width: 25%;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  background: ${(props) => (props.button === '=' ? '#9146ff' : '#fff')};
`;

export const ButtonText = styled.Text<Props>`
  font-size: 24px;
  color: ${(props) => (props.button === '=' ? '#fff' : '#9146ff')};
`;
