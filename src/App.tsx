import React, {useState, useCallback} from 'react';

import {
  Container,
  Display,
  DisplayTextResult,
  DisplayTextHistory,
  Calculator,
  CalculatorButton,
  ButtonText,
} from './styles';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [total, setTotal] = useState('');

  const calculator = useCallback(() => {
    const formatedFirstNumber = parseFloat(lastNumber);
    const formatedSecondNumber = parseFloat(currentNumber);

    switch (operation) {
      case '+':
        setTotal((formatedFirstNumber + formatedSecondNumber).toString());
        return;
      case '-':
        setTotal((formatedFirstNumber - formatedSecondNumber).toString());
        return;
      case '*':
        setTotal((formatedFirstNumber * formatedSecondNumber).toString());
        return;
      case '/':
        setTotal((formatedFirstNumber / formatedSecondNumber).toString());
        return;
    }
  }, [currentNumber, lastNumber, operation]);

  const handleInput = useCallback(
    (button) => {
      switch (button) {
        case 'AC':
          setCurrentNumber('');
          setLastNumber('');
          setOperation('');
          setTotal('');
          return;
        case 'DEL':
          if (operation !== '' && currentNumber === '') {
            setOperation('');
            return;
          }
          setCurrentNumber(
            currentNumber.substring(0, currentNumber.length - 1),
          );
          setLastNumber(lastNumber.substring(0, lastNumber.length - 1));
          return;
        case '%':
          if (currentNumber === '') {
            return;
          }
          if (total !== '') {
            setTotal((parseFloat(total) / 100).toString());
            return;
          }
          const result = parseFloat(currentNumber) / 100;
          setTotal(String(result));
          return;
        case '=':
          calculator();
          return;
      }

      if (
        operation === '' &&
        currentNumber === '' &&
        button === '-' &&
        lastNumber === ''
      ) {
        setCurrentNumber(operation + currentNumber + button);
        return;
      }

      if (
        button === '+' ||
        button === '-' ||
        button === '/' ||
        button === '*'
      ) {
        if (total !== '') {
          setOperation(button);
          setCurrentNumber('');
          setLastNumber(total);
          return;
        }
        if (operation !== '') {
          return;
        }

        if (lastNumber !== '') {
          setOperation(button);
        }

        if (operation === '' && lastNumber !== '') {
          setOperation(button);
          return;
        }

        setLastNumber(currentNumber);
        setCurrentNumber('');
        setOperation(button);
        return;
      }

      setCurrentNumber(currentNumber + button);
    },
    [currentNumber, calculator, operation, total, lastNumber],
  );

  const buttons = [
    'AC',
    'DEL',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    ' ',
    '.',
    '=',
  ];

  return (
    <Container>
      <Display>
        <DisplayTextHistory total={total}>
          {lastNumber} {operation} {currentNumber}
        </DisplayTextHistory>
        <DisplayTextResult total={total}>
          {total !== '' ? `= ${total}` : 0}
        </DisplayTextResult>
      </Display>
      <Calculator>
        {buttons.map((button) => (
          <CalculatorButton
            key={button}
            onPress={() => handleInput(button)}
            button={button}>
            <ButtonText button={button}>{button}</ButtonText>
          </CalculatorButton>
        ))}
      </Calculator>
    </Container>
  );
};

export default App;
