<script>
  import { onMount } from "svelte";
  import Timebar from "./Timebar.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";

  const calcTime = (timestamp) => {
    //한국시간 UTC+9
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if (hour > 0 && hour < 24) return `${hour}시간 전`;
    else if (hour >= 24)
      return `${time.getFullYear()}년 ${time.getMonth()}월 ${time.getDay()}일`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second > 0) return `${second}초 전`;
    else return "방금 전";
  };

  $: posts = [];

  const db = getDatabase();
  const postRef = ref(db, "posts/");

  onMount(() => {
    onValue(postRef, (snapshot) => {
      const data = snapshot.val();
      posts = Object.values(data);
    });
  });
</script>

<Timebar />
<div class="mypage-header">
  <div class="id-bar">
    <div class="id-bar__idBox">
      <div class="idBox-id">super_coding24</div>
      <div class="idBox-icons">
        <img src="assets/arrow.svg" alt="" />
        <div class="idBox-icons__redCircle"></div>
      </div>
    </div>
    <div class="id-bar__iconBox">
      <a href="#/write" class="write-btn">
        <img src="assets/plus.svg" alt="write" />
      </a>
      <img src="assets/bars.svg" alt="more" />
    </div>
  </div>
  <div class="profile-bar">
    <div class="profile-bar__profile">
      <div class="profile-image"></div>
      <div class="profile-plusbutton">+</div>
    </div>
    <div class="profile-bar__follow">
      <div class="follow-post">
        <div class="follow-post__num">0</div>
        <div class="follow-post__desc">게시물</div>
      </div>
      <div class="follow-follow">
        <div class="follow-follow__num">20</div>
        <div class="follow-follow__desc">팔로워</div>
      </div>
      <div class="follow-follow">
        <div class="follow-follow__num">24</div>
        <div class="follow-follow__desc">팔로잉</div>
      </div>
    </div>
  </div>
  <div class="name-bar">
    <div class="name-bar__name">슈퍼코딩</div>
    <div class="name-bar__desc">🚀슈퍼코딩 대학생 부트캠프 2024 1월</div>
  </div>
  <div class="edit-bar">
    <div class="edit-bar__profile-edit">프로필 편집</div>
    <div class="edit-bar__profile-share">프로필 공유</div>
    <div class="edit-bar__recommend">+</div>
  </div>
</div>
<div class="mypage-main">
  <div class="section">
    <div class="section-gallery">
      <img src="assets/gallery.svg" alt="gallert" />
    </div>
    <div class="section-video">
      <img src="assets/film.svg" alt="film" />
    </div>
    <div class="section-tagme">
      <img src="assets/tagme.svg" alt="tagme" />
    </div>
  </div>
  <div class="gallery">
    {#each posts as post}
      <div class="gallery-post">
        <div class="gallery-post__img">
          <img src={post.imgUrl} alt="이미지" />
        </div>
        <div class="gallery-post__title">{post.title}</div>
        <div class="gallery-post__writer">{post.writer}</div>
        <div class="gallery-post__postAt">{calcTime(post.postAt)}</div>
        <div class="gallery-post__detail">{post.detail}</div>
      </div>
    {/each}
  </div>
</div>
<footer></footer>

<style>
  .gallery {
    transform: translate(0, 40px);
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30vw, 1fr));
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    margin: 0px 10px 0 10px;
  }
  .gallery-post__img {
    width: 30vw;
    height: 30vw;
    border-radius: 3px;
    margin: 0.5px;
    overflow: hidden;
  }
  .gallery-post__img img {
    width: 30vw;
    height: 30vw;
  }
</style>
