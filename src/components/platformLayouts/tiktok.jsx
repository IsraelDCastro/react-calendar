import PropTypes from "prop-types";

export default function TikTok({ post }) {
  return (
    <div className="p-5 bg-white text-slate-600">
      <div className="mb-4 space-y-2 text-sm">
        <p>{post.title}</p>
        <p>{post.caption}</p>
      </div>
      <video controls className="rounded-xl" autoPlay>
        <source src="/reel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

TikTok.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired
};
