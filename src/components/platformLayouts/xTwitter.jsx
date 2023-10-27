import PropTypes from "prop-types";

export default function XTwitter({ post }) {
  return (
    <div className="p-5 space-y-5 bg-white rounded-2xl text-slate-600">
      <p>{post.title}</p>
      <p>{post.caption}</p>
      <figure className="overflow-hidden rounded">
        <img src={post.image_gallery[0]} alt={post.title} />
      </figure>
    </div>
  );
}

XTwitter.propTypes = {
  post: PropTypes.shape({
    image_gallery: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    caption: PropTypes.string,
    post_platform: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
