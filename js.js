function updateLikes() {
  // 현재 좋아요가져오기
  let currentLikes = parseInt(document.getElementById("likeCount").innerText);

  // 좋아요업데이트
  const likeCount = document.getElementById("likeCount")
  likeCount.innerText = currentLikes + 1 + " Likes";
}
