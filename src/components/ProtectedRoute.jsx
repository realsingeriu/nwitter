import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

//현재유저가 인증되지 않을시 로그인 페이지로 이동
export default function ProtectedRoute({ children }) {
  const user = auth.currentUser; //현재 접속유저
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children; //자식 컴포넌트로
}
