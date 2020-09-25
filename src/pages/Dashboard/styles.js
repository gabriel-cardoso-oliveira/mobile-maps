import styled from 'styled-components/native';
import { Platform } from 'react-native';

// export const Container = styled.SafeAreaView`
//   flex: 1;
// `;
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.IOS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  margin-top: 16px;
  align-self: center;
  max-width: 260px;
`;

export const Description = styled.Text`
  color: #fff;
  font-size: 22px;
  margin-top: 16px;
  max-width: 260px;
  line-height: 24px;
  align-self: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
