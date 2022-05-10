"use strict";

function LikeButton(props) {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return "You liked comment number " + props.commentID;
  }

  return React.createElement(
    "button",
    { onClick: () => setLiked(true) },
    "Like"
  );
}

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll(".like_button_container").forEach((domContainer) => {
  // Read the comment ID from a data-* attribute.
  const commentID = parseInt(domContainer.dataset.commentid, 10);
  ReactDOM.render(
    React.createElement(LikeButton, { commentID: commentID }),
    domContainer
  );
});
