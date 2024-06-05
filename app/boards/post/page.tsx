"use client";
import styles from "./Page.module.css";
import FileInput from "@/components/BoardPost/FileInput";
import { useState } from "react";

type Values = {
  imgFile: File | null;
};

export default function PostPage() {
  const [values, setValues] = useState<Values>({
    imgFile: null,
  });

  const handleChange = (name: keyof Values, value: File | null) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className={styles.postContainer}>
        <div className={styles.postWrapper}>
          <label className={styles.postTitle}>게시글 쓰기</label>
          <button className={styles.postButton}>등록</button>
        </div>
        <div className={styles.postTitleWrapper}>
          <label className={styles.postLabel}>*제목</label>
          <input
            className={styles.postTitleInput}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className={styles.postContentWrapper}>
          <div className={styles.postLabel}>*내용</div>
          <textarea
            className={styles.postContentInput}
            placeholder="내용을 입력해주세요"
          />
        </div>
        <div>
          <label className={styles.postLabel}>이미지</label>
          <FileInput
            name="imgFile"
            value={values.imgFile}
            onChange={(name, value) =>
              handleChange(name as keyof Values, value)
            }
          />
        </div>
      </div>
    </div>
  );
}
