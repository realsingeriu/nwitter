import { useState } from 'react';
import { styled } from 'styled-components';
import { auth, db, storage } from '../firebase';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState(null);
  const onChange = (e) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const changeImage = files[0];
      if (changeImage.size > 1000 * 1000) {
        alert('이미지 사이즈는 1MB 이하로 해주세요!');
        setFile(null);
        return; //종료
      }
      setFile(changeImage);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    // 유저정보가 없거나 로딩상태거나 트윗내용이 없거나 180이상이면 종료!
    if (!user || isLoading || tweet === '' || tweet.length > 180) return;
    try {
      setLoading(true);
      //파이어 스토어에 tweet 저장하기
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || '익명의 유저',
        userId: user.uid,
      });
      if (file) {
        //먼저 이미지를 저장할 참조주소를 만들기(tweets/유저아이디/문서아이디/이미지명.jpg)
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file); //파일을 서버로 업로드저장
        const url = await getDownloadURL(result.ref); //실제 저장파일을 가져오기 위한 주소
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet(''); // 저장이 끝난 후에 트윗내용을 삭제함
      setFile(null); // 파일도 삭제함
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="무슨 일이 일어났나요?!"
      />
      <AttachFileButton htmlFor="file">{file ? 'Photo added ✅' : 'Add photo'}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <SubmitBtn type="submit" value={isLoading ? 'Posting...' : 'Post Tweet'} />
    </Form>
  );
}
