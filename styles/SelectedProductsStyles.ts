import styled from 'styled-components';

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
  background: #f8f9fa;
  padding: 6px 10px;
  border-radius: 6px;
`;

export const PriceSymbol = styled.span`
  color: #495057;
  font-size: 14px;
  font-weight: 500;
  margin-right: 2px;
`;

export const PriceInput = styled.input`
  width: 40px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  color: #212529;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CentavosInput = styled(PriceInput)`
  width: 32px;
`;

export const PriceSeparator = styled.span`
  color: #495057;
  font-weight: 500;
  margin: 0 1px;
`; 