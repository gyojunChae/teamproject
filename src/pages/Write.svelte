<script>
  import { getDatabase, ref, push } from "firebase/database";
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  let title;
  let writer;
  // let postAt = `${today.getFullYear()}년 ${today.getMonth()}월 ${today.getDay()}일`;
  let postAt = new Date().getTime();
  let detail;
  let files;
  const db = getDatabase();
  //**************************************************************
  const storage = getStorage();
  const storageRef = refImage(storage, "/imgs");

  //files가 바뀔때마다 뭔가가 실행됨!!!!
  const uploadFile = async () => {
    const file = files[0];
    const name = file.name;
    const imgRef = refImage(storage, name);
    const res = await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };
  //**************************************************************
  function writeUserData(imgUrl) {
    push(ref(db, "posts/"), {
      title,
      writer,
      postAt,
      detail,
      imgUrl,
    });
    window.location.hash = "#/mypage";
  }

  const handleSubmit = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<div class="write-header" id="write-header">
  <div class="write-header__left">
    <img src="assets/arrow2.svg" alt="" />
  </div>
  <div class="write-header__center">중고거래 글쓰기</div>
  <div class="write-header__right"></div>
</div>
<!--write-header-->
<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <input type="file" id="image" name="image" bind:files />
  </div>
  <div>
    <label for="title">제목</label>
    <input
      type="text"
      id="title"
      name="title"
      placeholder="제목을 입력해주세요"
      bind:value={title}
    />
  </div>
  <div>
    <label for="writer">작성자</label>
    <input
      type="text"
      id="writer"
      name="writer"
      placeholder="작성자 이름을 입력해주세요"
      bind:value={writer}
    />
  </div>
  <div>
    <label for="detail">글 내용</label>
    <input
      type="text"
      id="detail"
      name="detail"
      placeholder="글의 내용을 입력해 주세요"
      bind:value={detail}
    />
  </div>
  <div class="submit-btn"><button type="submit">완료</button></div>
</form>
