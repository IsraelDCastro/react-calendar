import PropTypes from "prop-types";

export default function Instagram({ post, post_type }) {
  return (
    <div className="bg-white text-slate-600">
      {post_type === "image" && (
        <figure className="overflow-hidden rounded">
          <img
            className="w-full h-full"
            src="https://picsum.photos/468/585?random=1"
            alt={post.title}
          />
        </figure>
      )}
      {post_type === "reel" && (
        <video controls autoPlay>
          <source src="/reel-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="p-5 space-y-2 text-sm">
        <p>{post.title}</p>
        <p>{post.caption}</p>
      </div>
    </div>
  );
}

Instagram.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  post_type: PropTypes.string,
};
